package com.ssafy.ssaout.user.service;

import com.ssafy.ssaout.aicover.repository.AiCoverRepository;
import com.ssafy.ssaout.common.error.ErrorCode;
import com.ssafy.ssaout.common.error.exception.OAuthException;
import com.ssafy.ssaout.common.oauth.entity.ProviderType;
import com.ssafy.ssaout.result.repository.ResultRepository;
import com.ssafy.ssaout.user.domain.entity.User;
import com.ssafy.ssaout.user.dto.UserInfoDto;
import com.ssafy.ssaout.user.repository.UserRefreshTokenRepository;
import com.ssafy.ssaout.user.repository.UserRepository;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserRefreshTokenRepository userRefreshTokenRepository;
    private final ResultRepository resultRepository;
    private final AiCoverRepository aiCoverRepository;

    @Value("${kakao.admin}")
    private String kakaoAdminKey;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }

    /**
     * 유저 정보(닉네임) 수정 닉네임 최초 등록
     *
     * @param userId
     * @return
     */
    public User updateUser(String userId, UserInfoDto userInfoDto) {
        User user = userRepository.findByUserId(userId);

        user.setNickname(userInfoDto.getNickname());
//        user.setProfileImageUrl(userInfoDto.getProfileImageUrl());
        userRepository.save(user);

        return user;

    }

    /**
     * 회원 탈퇴
     */
    @Transactional
    public void deleteUser(String userId) {
        User user = userRepository.findByUserId(userId);

        if (ProviderType.KAKAO.equals(user.getProviderType())) {
            unlinkKakaoUser(user);
        }

        resultRepository.deleteAllByUser(user);
        aiCoverRepository.deleteAllByUser(user);
        userRepository.delete(user);
        userRefreshTokenRepository.deleteByUserId(userId);
    }

//    public User createNickname(String userId, UserInfoDto userInfoDto) {
//        User user = userRepository.findByUserId(userId);
//
//        user.setNickname(userInfoDto.getNickname());
//        user.setProfileImageUrl(userInfoDto.getProfileImageUrl());
//        userRepository.save(user);
//
//        return user;
//    }

    private void unlinkKakaoUser(User user) {
        ClientHttpRequestFactory httpRequestFactory = new HttpComponentsClientHttpRequestFactory();
        RestTemplate restTemplate = new RestTemplate(httpRequestFactory);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        httpHeaders.set("Authorization", "KakaoAK " + kakaoAdminKey);

        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("target_id_type", "user_id");
        parameters.add("target_id", user.getUserId());

        HttpEntity formEntity = new HttpEntity<>(parameters, httpHeaders);

        ResponseEntity<String> responseEntity = restTemplate.postForEntity(
            "https://kapi.kakao.com/v1/user/unlink", formEntity, String.class);

        if (responseEntity.getStatusCode().value() != 200) {
            throw new OAuthException(ErrorCode.FAIL_UNLINKING_KAKAO_ACCOUNT);
        }
    }

}
