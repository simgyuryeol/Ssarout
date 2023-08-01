package com.ssafy.ssaout.user.service;

import com.ssafy.ssaout.user.domain.entity.User;
import com.ssafy.ssaout.user.dto.UserInfoDto;
import com.ssafy.ssaout.user.repository.UserRefreshTokenRepository;
import com.ssafy.ssaout.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserRefreshTokenRepository userRefreshTokenRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }

    /**
     * 유저 정보(닉네임) 수정
     * 닉네임 최초 등록
     * @param userId
     * @return
     */
    public User updateUser(String userId, UserInfoDto userInfoDto){
        User user = userRepository.findByUserId(userId);

        user.setNickname(userInfoDto.getNickname());
        user.setProfileImageUrl(userInfoDto.getProfileImageUrl());
        userRepository.save(user);

        return user;

    }

    /**
     * 회원 탈퇴
     */
    @Transactional
    public User deleteUser(String userId) {
        User user = userRepository.findByUserId(userId);
        userRepository.delete(user);
        userRefreshTokenRepository.deleteByUserId(userId);

        return user;
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


}
