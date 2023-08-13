package com.ssafy.ssaout.aicover.service;

import static com.ssafy.ssaout.common.error.ErrorCode.AI_COVER_NOT_FOUND;
import static com.ssafy.ssaout.common.error.ErrorCode.FAIL_CONNECTING_AI_SERVER;
import static com.ssafy.ssaout.common.error.ErrorCode.FAIL_CONVERT_TO_JSON;
import static com.ssafy.ssaout.common.error.ErrorCode.INVALID_AI_COVER_REQUEST_CONDITION;

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
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
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

    public void createAiCover(String userId) {
        // 개별 10곡 불렀는지 확인
        User user = userRepository.findByUserId(userId);
        List<Song> trainableSongs = songRepository.findAll();

        Long recordedSongs = resultRepository.countDistinctSongIdByUser(user);
        checkRecordedSongs(recordedSongs);

        Long userSeq = user.getUserSeq();

        List<Long> aiCoverIdList = new ArrayList<>();
        for (Song song : trainableSongs) {
            Long aiCoverId = aiCoverRepository.save(AiCover.builder().user(user).song(song).build())
                .getAiCoverId();
            aiCoverIdList.add(aiCoverId);
        }

        List<String> voiceFileUrlList = resultRepository.findAllByUser(user).stream()
            .map(Result::getRecordFile).collect(Collectors.toList());
        List<String> singerVoiceFileUrlList = trainableSongs.stream()
            .map((song) -> song.getVoiceFile()).collect(
                Collectors.toList());

        // Flask 서버로 요청 보내는 로직 추가 후 호출 (userSeq, aiCoverId, voiceFileUrlList, singerVoiceFileUrl)
        try {
            aiCoverRequestToFlaskServer(userSeq, aiCoverIdList, voiceFileUrlList,
                singerVoiceFileUrlList);
        } catch (JSONException e) {
            throw new JsonException(FAIL_CONVERT_TO_JSON);
        }
    }

    public void updateAiCover(List<AiCoverUpdateRequestDto> aiCoverUpdateRequestDtoList) {
        // AI 커버곡 파일 링크 update
        for (AiCoverUpdateRequestDto aiCoverUpdateRequestDto : aiCoverUpdateRequestDtoList) {
            AiCover aiCover = aiCoverRepository.findById(aiCoverUpdateRequestDto.getAiCoverId())
                .orElseThrow(() -> new NotFoundException(AI_COVER_NOT_FOUND));
            aiCover.setAiCoverFile(aiCoverUpdateRequestDto.getAiCoverFile());
        }
    }

    private void checkRecordedSongs(Long recordedSongs) {
        if (recordedSongs < MINIMUM_RECORD_SONGS) {
            throw new InvalidRequestException(INVALID_AI_COVER_REQUEST_CONDITION);
        }
    }

    private void aiCoverRequestToFlaskServer(Long userSeq, List<Long> aiCoverIdList,
        List<String> voiceFileUrlList, List<String> singerVoiceFileUrlList)
        throws JSONException {

        ClientHttpRequestFactory httpRequestFactory = new HttpComponentsClientHttpRequestFactory();
        RestTemplate restTemplate = new RestTemplate(httpRequestFactory);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("userSeq", userSeq);

        JSONArray aiCoverIdJsonArray = new JSONArray();
        for (Long aiCoverId : aiCoverIdList) {
            aiCoverIdJsonArray.put(aiCoverId);
        }
        jsonObject.put("aiCoverId", aiCoverIdJsonArray);

        JSONArray voiceFileJsonArray = new JSONArray();
        for (String url : voiceFileUrlList) {
            voiceFileJsonArray.put(url);
        }
        jsonObject.put("voiceFileUrlList", voiceFileJsonArray);

        JSONArray singerVoiceFileJsonArray = new JSONArray();
        for (String url : singerVoiceFileUrlList) {
            singerVoiceFileJsonArray.put(url);
        }
        jsonObject.put("singerVoiceFileUrl", singerVoiceFileJsonArray);
        System.out.println("request: " + jsonObject);
        HttpEntity<String> request = new HttpEntity<>(jsonObject.toString(), httpHeaders);
        ResponseEntity<String> response = restTemplate.exchange(
            "http://34.87.63.236:5000/process_audio",
            HttpMethod.POST, request, String.class);

        if (!HttpStatus.OK.equals(response.getStatusCode())) {
            throw new ConnectionException(FAIL_CONNECTING_AI_SERVER);
        }
    }
}
