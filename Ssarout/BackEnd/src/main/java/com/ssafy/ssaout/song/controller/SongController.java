package com.ssafy.ssaout.song.controller;

import com.ssafy.ssaout.common.response.ApiResponse;
import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.song.dto.response.SongDto;
import com.ssafy.ssaout.song.dto.response.SongLineDto;
import com.ssafy.ssaout.song.dto.response.WholeSongResponse;
import com.ssafy.ssaout.song.service.SongLineService;
import com.ssafy.ssaout.song.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/song")
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;
    private final SongLineService songLineService;

    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchSong(@RequestParam(value = "text") String keyword) {

        List<SongDto> songList = songService.findAllBySingerOrTitle(keyword);

        ApiResponse apiResponse = ApiResponse.builder()
            .message("검색 결과")
            .status(OK.value())
            .data(songList)
            .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/info")
    public ResponseEntity<ApiResponse> getSongInfo(@RequestParam(value = "songId") Long songId) {
        Song song = songService.getSongById(songId);
//        List<SongLine> songLineList = songLineService.getAllSongLineById(songId);
        List<SongLineDto> songLineList = songLineService.getAllSongLineById(songId);

        songService.updateViews(songId);

        WholeSongResponse wholeSongResponse = WholeSongResponse.builder()
            .song(song)
            .songLines(songLineList)
            .build();



        ApiResponse apiResponse = ApiResponse.builder()
            .message("곡 정보")
            .status(OK.value())
            .data(wholeSongResponse)
            .build();
        return ResponseEntity.ok(apiResponse);
    }

}
