package com.ssafy.ssaout.user.controller.user;

import static org.springframework.http.HttpStatus.OK;

import com.ssafy.ssaout.common.oauth.entity.UserPrincipal;
import com.ssafy.ssaout.user.domain.entity.User;
import com.ssafy.ssaout.user.dto.UserInfoDto;
import com.ssafy.ssaout.user.service.UserService;
import com.ssafy.ssaout.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse> getUser() {
//    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());

        UserInfoDto userInfoDto = new UserInfoDto(user.getNickname(),user.getProfileImageUrl());
//        return ApiResponse.success("user", userInfoDto);
        ApiResponse apiResponse = ApiResponse.builder()
            .message("회원정보")
            .status(OK.value())
            .data(userInfoDto)
            .build();
        return ResponseEntity.ok(apiResponse);
    }

    /**
     * 회원 정보(닉네임) 수정
     */
    @PutMapping
//    public ApiResponse updateUser( @RequestBody UserInfoDto userInfoDto){
    public ResponseEntity<ApiResponse> updateUser( @RequestBody UserInfoDto userInfoDto){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userService.updateUser(principal.getUsername(),userInfoDto);

        ApiResponse apiResponse = ApiResponse.builder()
            .message("회원 정보 수정")
            .status(OK.value())
            .data(null)
            .build();
//        return ApiResponse.success("user", userInfoDto);
        return ResponseEntity.ok(apiResponse);
    }

    /**
     * 회원 탈퇴
     */
    @DeleteMapping
//    public ApiResponse deleteUser(){
    public ResponseEntity<ApiResponse> deleteUser(){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        userService.deleteUser(principal.getUsername());

        ApiResponse apiResponse = ApiResponse.builder()
            .message("회원 탈퇴 성공")
            .status(OK.value())
            .data(null)
            .build();
//        return ApiResponse.success();
        return ResponseEntity.ok(apiResponse);
    }

    /**
     * 닉네임 최초 등록
     */
    @PostMapping("/register")
//    public ApiResponse createNickname(@RequestBody UserInfoDto userInfoDto){
    public ResponseEntity<ApiResponse> createNickname(@RequestBody UserInfoDto userInfoDto){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        userService.updateUser(principal.getUsername(),userInfoDto);

        ApiResponse apiResponse = ApiResponse.builder()
            .message("닉네임 등록 성공")
            .status(OK.value())
            .data(userInfoDto)
            .build();
//        return ApiResponse.success("user", userInfoDto);
        return ResponseEntity.ok(apiResponse);
    }

}
