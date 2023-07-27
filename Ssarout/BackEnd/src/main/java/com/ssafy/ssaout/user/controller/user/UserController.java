package com.ssafy.ssaout.user.controller.user;

import com.ssafy.ssaout.common.oauth.entity.UserPrincipal;
import com.ssafy.ssaout.user.domain.entity.User;
import com.ssafy.ssaout.user.dto.UserInfoDto;
import com.ssafy.ssaout.user.service.UserService;
import com.ssafy.ssaout.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());

        UserInfoDto userInfoDto = new UserInfoDto(user.getNickname(),user.getProfileImageUrl());
        return ApiResponse.success("user", userInfoDto);
    }

    /**
     * 회원 정보(닉네임) 수정
     */
    @PutMapping
    public ApiResponse updateUser( @RequestBody UserInfoDto userInfoDto){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userService.updateUser(principal.getUsername(),userInfoDto);

        return ApiResponse.success("user", userInfoDto);
    }

    /**
     * 회원 탈퇴
     */
    @DeleteMapping
    public ApiResponse deleteUser(){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        userService.deleteUser(principal.getUsername());
        return ApiResponse.success();
    }

    /**
     * 닉네임 최초 등록
     */
    @PostMapping("/register")
    public ApiResponse createNickname(@RequestBody UserInfoDto userInfoDto){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        userService.updateUser(principal.getUsername(),userInfoDto);

        return ApiResponse.success("user", userInfoDto);
    }

}
