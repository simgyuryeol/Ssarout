package com.ssafy.ssaout.result.controller;

import com.ssafy.ssaout.common.response.ApiResponse;
import com.ssafy.ssaout.result.dto.request.ResultCreateRequestDto;
import com.ssafy.ssaout.result.dto.response.ResultsDetailResponseDto;
import com.ssafy.ssaout.result.dto.response.ResultsHistoryResponseDto;
import com.ssafy.ssaout.result.dto.response.ResultsPerSongResponseDto;
import com.ssafy.ssaout.result.service.ResultService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/result")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @PostMapping
    public ResponseEntity<Void> createResult(
        @Valid @ModelAttribute ResultCreateRequestDto resultCreateRequestDto,
        @RequestPart MultipartFile recordFile) {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

        resultService.createResult(resultCreateRequestDto, principal.getUsername(),
            recordFile);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/recorded-songs")
    public ResponseEntity<ApiResponse<ResultsPerSongResponseDto>> getResultsPerSong() {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

        ResultsPerSongResponseDto resultsPerSongResponseDto = resultService.getResultsPerSong(
            principal.getUsername());

        return ResponseEntity.ok(ApiResponse
            .<ResultsPerSongResponseDto>builder()
            .message("녹음 내역 조회 완료")
            .status(HttpStatus.OK.value())
            .data(resultsPerSongResponseDto)
            .build());
    }

    @GetMapping("/recorded-songs/{songId}")
    public ResponseEntity<ApiResponse<ResultsDetailResponseDto>> getResult(
        @PathVariable("songId") Long songId) {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

        ResultsDetailResponseDto resultsDetailResponseDto = resultService.getResultsDetail(
            principal.getUsername(), songId);

        return ResponseEntity.ok(
            ApiResponse.<ResultsDetailResponseDto>builder().message("해당 곡에 대한 녹음 결과 조회 완료")
                .status(HttpStatus.OK.value()).data(resultsDetailResponseDto).build());
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<ResultsHistoryResponseDto>> getHistory() {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

        ResultsHistoryResponseDto resultsHistoryResponseDto = resultService.getResultsHistory(
            principal.getUsername());

        return ResponseEntity.ok(
            ApiResponse.<ResultsHistoryResponseDto>builder().message("녹음 파일 내역 조회 완료").status(
                HttpStatus.OK.value()).data(resultsHistoryResponseDto).build());
    }
}
