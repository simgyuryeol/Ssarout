package com.ssafy.ssaout.fav.controller;

import static org.springframework.http.HttpStatus.OK;

import com.ssafy.ssaout.common.response.ApiResponse;
import com.ssafy.ssaout.fav.dto.FavDto;
import com.ssafy.ssaout.fav.dto.FavSongDto;
import com.ssafy.ssaout.fav.service.FavoriteService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/fav")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    /**
     * 즐겨찾기 등록, 삭제 등록 되어 있는 경우 삭제 신규일 경우 등록
     */
    @PostMapping
    public ResponseEntity fav_save(@RequestBody FavDto favDto) {

        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        String userId = principal.getUsername();
        Long contentId = favDto.getContentId();
        boolean check = favoriteService.favorite_save(contentId, userId);

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
    @GetMapping
    public ResponseEntity<ApiResponse> fav_list() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        String UserId = principal.getUsername();
        List<FavSongDto> favSongDtoList = favoriteService.favorite_list(UserId);

        ApiResponse apiResponse = ApiResponse.builder()
            .message("즐겨 찾기 목록")
            .status(OK.value())
            .data(favSongDtoList)
            .build();
        return ResponseEntity.ok(apiResponse);
    }


}
