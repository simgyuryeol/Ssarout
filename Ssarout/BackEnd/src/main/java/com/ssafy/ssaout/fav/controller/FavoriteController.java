package com.ssafy.ssaout.fav.controller;

import com.ssafy.ssaout.common.response.ApiResponse;
import com.ssafy.ssaout.common.response.ErrorResponse;
import com.ssafy.ssaout.fav.domain.entity.Favorite;
import com.ssafy.ssaout.fav.dto.FavDto;
import com.ssafy.ssaout.fav.dto.FavSongDto;
import com.ssafy.ssaout.fav.service.FavoriteService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.ssaout.common.error.ErrorCode.CONFLICT_RESOURCE;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/fav")
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;

    /**
     * 즐겨 찾기 등록
     */
    @PostMapping
    public ResponseEntity fav_save(@RequestBody FavDto favDto){
        try {
            Favorite favorite = favoriteService.favorite_save(favDto);
            if(favorite.getFavoriteSeq()==null){
                ErrorResponse errorResponse = ErrorResponse.of(CONFLICT_RESOURCE);
                return ResponseEntity.ok(errorResponse);
            }
            //        return ApiResponse.success("fav", favDto);
             ApiResponse apiResponse = ApiResponse.builder()
                    .message("즐겨 찾기 등록 성공")
                    .status(OK.value())
                    .data(null)
                    .build();

            return ResponseEntity.ok(apiResponse);
        }
        catch (DataIntegrityViolationException e) {
            ErrorResponse errorResponse = ErrorResponse.of(CONFLICT_RESOURCE);
            return ResponseEntity.ok(errorResponse);
        }
    }

    /**
     * 즐겨 찾기 삭제
     */
    @DeleteMapping
    public ResponseEntity<ApiResponse> fav_delete(@RequestBody FavDto favDto){
        favoriteService.favorite_delete(favDto);
//        return ApiResponse.success("fav", favorite);
        ApiResponse apiResponse = ApiResponse.builder()
                .message("즐겨 찾기 삭제 성공")
                .status(OK.value())
                .data(null)
                .build();
        return ResponseEntity.ok(apiResponse);
    }


    /**
     * 즐겨 찾기 목록
     */
    @GetMapping
    public ResponseEntity<ApiResponse> fav_list(@RequestBody FavDto favDto){
        List<FavSongDto> favSongDtoList = favoriteService.favorite_list(favDto);
//        return ApiResponse.success("fav", favSongDtoList);
        ApiResponse apiResponse = ApiResponse.builder()
                .message("즐겨 찾기 목록")
                .status(OK.value())
                .data(favSongDtoList)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

}
