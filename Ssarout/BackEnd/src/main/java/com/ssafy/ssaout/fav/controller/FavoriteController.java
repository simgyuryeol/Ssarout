package com.ssafy.ssaout.fav.controller;

import com.ssafy.ssaout.common.response.ApiResponse;
import com.ssafy.ssaout.fav.dto.FavDto;
import com.ssafy.ssaout.fav.dto.FavSongDto;
import com.ssafy.ssaout.fav.service.FavoriteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@Api(tags = "즐겨찾기 APIs")
@RestController
@RequestMapping("/api/v1/fav")
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;

    /**
     * 즐겨찾기 등록, 삭제
     * 등록 되어 있는 경우 삭제
     * 신규일 경우 등록
     */
    @ApiOperation(value = "즐겨찾기 등록, 삭제", notes = "즐겨찾기가 등록되어 있는 경우 삭제, 그렇지 않을 경우 등록합니다.")
    @PostMapping
    public ResponseEntity fav_save(@ApiParam(value = "즐겨찾기할 곡 ID") @RequestBody FavDto favDto){

        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = principal.getUsername();
        Long contentId = favDto.getContentId();
        boolean check = favoriteService.favorite_save(contentId,userId );

        ApiResponse apiResponse = ApiResponse.builder()
                .message(check ? "즐겨 찾기 등록" : "즐겨 찾기 삭제")
                .status(OK.value())
                .data(check)
                .build();
        return ResponseEntity.ok(apiResponse);
    }


    /**
     * 즐겨 찾기 목록
     */
    @ApiOperation(value = "즐겨찾기 목록 조회", notes = "사용자가 등록한 즐겨찾기 목록을 조회합니다.")
    @GetMapping
    public ResponseEntity<ApiResponse> fav_list(){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String UserId = principal.getUsername();
        List<FavSongDto> favSongDtoList = favoriteService.favorite_list(UserId);
//        return ApiResponse.success("fav", favSongDtoList);
        ApiResponse apiResponse = ApiResponse.builder()
                .message("즐겨 찾기 목록")
                .status(OK.value())
                .data(favSongDtoList)
                .build();
        return ResponseEntity.ok(apiResponse);
    }


}
