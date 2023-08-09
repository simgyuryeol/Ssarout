package com.ssafy.ssaout.aicover.service;

import static com.ssafy.ssaout.common.error.ErrorCode.AI_COVER_NOT_FOUND;
import static com.ssafy.ssaout.common.error.ErrorCode.FAIL_CONNECTING_AI_SERVER;
import static com.ssafy.ssaout.common.error.ErrorCode.FAIL_CONVERT_TO_JSON;
import static com.ssafy.ssaout.common.error.ErrorCode.INVALID_AI_COVER_REQUEST_CONDITION;
import static com.ssafy.ssaout.common.error.ErrorCode.SONG_NOT_FOUND;
import static com.ssafy.ssaout.common.error.ErrorCode.USER_NOT_FOUND;

import com.ssafy.ssaout.aicover.domain.AiCover;
import com.ssafy.ssaout.aicover.dto.request.AiCoverUpdateRequestDto;
import com.ssafy.ssaout.aicover.dto.response.AiCoverResponseDto;
import com.ssafy.ssaout.aicover.dto.response.AiCoversResponseDto;
import com.ssafy.ssaout.aicover.repository.AiCoverRepository;
import com.ssafy.ssaout.common.error.exception.ConnectionException;
import com.ssafy.ssaout.common.error.exception.InvalidRequestException;
import com.ssafy.ssaout.common.error.exception.JsonException;
import com.ssafy.ssaout.common.error.exception.NotFoundException;
import com.ssafy.ssaout.result.domain.Result;
import com.ssafy.ssaout.result.repository.ResultRepository;
import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.song.repository.SongRepository;
import com.ssafy.ssaout.user.domain.entity.User;
import com.ssafy.ssaout.user.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
@Transactional
@RequiredArgsConstructor
public class AiCoverService {

    private final AiCoverRepository aiCoverRepository;
    private final UserRepository userRepository;
    private final SongRepository songRepository;
    private final ResultRepository resultRepository;

    private static final Long MINIMUM_RECORD_SONGS = 10L;

    public AiCoversResponseDto getAiCovers(String userId) {
        User user = userRepository.findByUserId(userId);

        List<AiCoverResponseDto> aiCoverResponseDtoList = aiCoverRepository.findAllByUser(user)
            .stream().map(AiCoverResponseDto::new).collect(
                Collectors.toList());

        return AiCoversResponseDto.builder().results(aiCoverResponseDtoList)
            .resultCount(aiCoverResponseDtoList.size()).build();
    }

    public void createAiCover(String userId, Long songId) {
        // 개별 10곡 불렀는지 확인
        User user = userRepository.findByUserId(userId);
        Song song = songRepository.findById(songId)
            .orElseThrow(() -> new NotFoundException(
                SONG_NOT_FOUND));

        Long recordedSongs = resultRepository.countDistinctSongIdByUser(user);
        checkRecordedSongs(recordedSongs);

        Long userSeq = user.getUserSeq();
        Long aiCoverId = aiCoverRepository.save(AiCover.builder().user(user).song(song).build())
            .getAiCoverId();
        List<String> voiceFileUrlList = resultRepository.findAllByUserAndSong(user, song).stream()
            .map(Result::getRecordFile).collect(Collectors.toList());
        String singerVoiceFileUrl = song.getVoiceFile();

        // Flask 서버로 요청 보내는 로직 추가 후 호출 (userSeq, aiCoverId, voiceFileUrlList, singerVoiceFileUrl)
        try {
            aiCoverRequestToFlaskServer(userSeq, aiCoverId, voiceFileUrlList, singerVoiceFileUrl);
        } catch (JSONException e) {
            throw new JsonException(FAIL_CONVERT_TO_JSON);
        }
    }

    public void updateAiCover(AiCoverUpdateRequestDto aiCoverUpdateRequestDto) {
        // AI 커버곡 파일 링크 update
        AiCover aiCover = aiCoverRepository.findById(aiCoverUpdateRequestDto.getAiCoverId())
            .orElseThrow(() -> new NotFoundException(AI_COVER_NOT_FOUND));
        aiCover.setAiCoverFile(aiCoverUpdateRequestDto.getAiCoverFile());

        // 사용자의 목소리로 만들어진 모델 파일 링크 update
        User user = userRepository.findById(aiCoverUpdateRequestDto.getUserSeq())
            .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.setAiModelFile(aiCoverUpdateRequestDto.getModelFile());
    }

    private void checkRecordedSongs(Long recordedSongs) {
        if (recordedSongs < MINIMUM_RECORD_SONGS) {
            throw new InvalidRequestException(INVALID_AI_COVER_REQUEST_CONDITION);
        }
    }

    private void aiCoverRequestToFlaskServer(Long userSeq, Long aiCoverId,
        List<String> voiceFileUrlList, String singerVoiceFileUrl) throws JSONException {

        ClientHttpRequestFactory httpRequestFactory = new HttpComponentsClientHttpRequestFactory();
        RestTemplate restTemplate = new RestTemplate(httpRequestFactory);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("userSeq", userSeq);
        jsonObject.put("aiCoverId", aiCoverId);
        JSONArray jsonArray = new JSONArray();
        for (String url : voiceFileUrlList) {
            jsonArray.put(url);
        }
        jsonObject.put("voiceFileUrlList", jsonArray);
        jsonObject.put("singerVoiceFileUrl", singerVoiceFileUrl);

        HttpEntity<String> request = new HttpEntity<>(jsonObject.toString(), httpHeaders);
        ResponseEntity<String> response = restTemplate.exchange(
            "http://34.87.63.236:5000/process_audio",
            HttpMethod.POST, request, String.class);

        if (!HttpStatus.OK.equals(response.getStatusCode())) {
            throw new ConnectionException(FAIL_CONNECTING_AI_SERVER);
        }
    }
}
