package com.ssafy.ssaout.fav.controller;

import com.ssafy.ssaout.common.response.ApiResponse;
import com.ssafy.ssaout.fav.dto.FavDto;
import com.ssafy.ssaout.fav.dto.FavSongDto;
import com.ssafy.ssaout.fav.service.FavoriteService;
import com.ssafy.ssaout.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/fav")
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;
    private final UserRepository userRepository;

    /**
     * 즐겨찾기 등록, 삭제
     * 등록 되어 있는 경우 삭제
     * 신규일 경우 등록
     */
    @PostMapping
    public ResponseEntity fav_save(@RequestBody FavDto favDto){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        favDto.setUserId(principal.getUsername());

        boolean check = favoriteService.favorite_save(favDto);

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
    public ResponseEntity<ApiResponse> fav_list(@RequestBody FavDto favDto){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        favDto.setUserId(principal.getUsername());
        List<FavSongDto> favSongDtoList = favoriteService.favorite_list(favDto);
//        return ApiResponse.success("fav", favSongDtoList);
        ApiResponse apiResponse = ApiResponse.builder()
                .message("즐겨 찾기 목록")
                .status(OK.value())
                .data(favSongDtoList)
                .build();
        return ResponseEntity.ok(apiResponse);
    }


    /**
     * 즐겨 찾기 등록
     */
//    @PostMapping
//    public ResponseEntity fav_save(@RequestBody FavDto favDto){
//
////            Favorite favorite =
//        favoriteService.favorite_save(favDto);
////            if(favorite.getFavoriteSeq()==null){
////                ErrorResponse errorResponse = ErrorResponse.of(CONFLICT_RESOURCE);
////                return ResponseEntity.ok(errorResponse);
////            }
//            //        return ApiResponse.success("fav", favDto);
//             ApiResponse apiResponse = ApiResponse.builder()
//                    .message("즐겨 찾기 등록 성공")
//                    .status(OK.value())
//                    .data(null)
//                    .build();
//
//            return ResponseEntity.ok(apiResponse);
//    }

    /**
     * 즐겨 찾기 삭제
     */
//    @DeleteMapping
//    public ResponseEntity<ApiResponse> fav_delete(@RequestBody FavDto favDto){
//        favoriteService.favorite_delete(favDto);
////        return ApiResponse.success("fav", favorite);
//        ApiResponse apiResponse = ApiResponse.builder()
//                .message("즐겨 찾기 삭제 성공")
//                .status(OK.value())
//                .data(null)
//                .build();
//        return ResponseEntity.ok(apiResponse);
//    }




}
