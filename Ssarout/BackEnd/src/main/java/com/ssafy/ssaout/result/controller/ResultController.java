package com.ssafy.ssaout.result.controller;

import com.ssafy.ssaout.common.response.ApiResponse;
import com.ssafy.ssaout.result.dto.request.ResultCreateRequestDto;
import com.ssafy.ssaout.result.dto.response.ResultsDetailResponseDto;
import com.ssafy.ssaout.result.dto.response.ResultsHistoryResponseDto;
import com.ssafy.ssaout.result.dto.response.ResultsPerSongResponseDto;
import com.ssafy.ssaout.result.service.ResultService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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

@Api(tags = "녹음 결과 APIs")
@RestController
@RequestMapping("/api/v1/result")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @ApiOperation(value = "녹음 결과 등록", notes = "사용자가 곡 전체를 불러 녹음한 결과를 등록합니다.")
    @PostMapping
    public ResponseEntity<Void> createResult(
        @ApiParam(value = "사용자 ID와 정확도") @Valid @ModelAttribute ResultCreateRequestDto resultCreateRequestDto,
        @ApiParam(value = "녹음 파일") @RequestPart MultipartFile recordFile) {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

        resultService.createResult(resultCreateRequestDto, principal.getUsername(),
            recordFile);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @ApiOperation(value = "녹음한 노래에 대한 평균 정확도 조회", notes = "사용자가 녹음한 노래의 평균 정확도를 조회합니다.")
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

    @ApiOperation(value = "개별 노래에 대한 결과 조회", notes = "사용자가 해당 노래를 녹음한 결과 내역을 조회합니다.")
    @GetMapping("/recorded-songs/{songId}")
    public ResponseEntity<ApiResponse<ResultsDetailResponseDto>> getResult(
        @ApiParam(value = "조회할 노래 ID") @PathVariable("songId") Long songId) {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

        ResultsDetailResponseDto resultsDetailResponseDto = resultService.getResultsDetail(
            principal.getUsername(), songId);

        return ResponseEntity.ok(
            ApiResponse.<ResultsDetailResponseDto>builder().message("해당 곡에 대한 녹음 결과 조회 완료")
                .status(HttpStatus.OK.value()).data(resultsDetailResponseDto).build());
    }

    @ApiOperation(value = "녹음 파일 조회", notes = "노래별로 사용자가 녹음한 파일을 조회합니다.")
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
