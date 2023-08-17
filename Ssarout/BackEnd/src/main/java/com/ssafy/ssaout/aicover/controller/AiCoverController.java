package com.ssafy.ssaout.aicover.controller;

import com.ssafy.ssaout.aicover.dto.request.AiCoverUpdateRequestDto;
import com.ssafy.ssaout.aicover.dto.response.AiCoversResponseDto;
import com.ssafy.ssaout.aicover.service.AiCoverService;
import com.ssafy.ssaout.common.response.ApiResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "AI 커버곡 APIs")
@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AiCoverController {

    private final AiCoverService aiCoverService;

    @ApiOperation(value = "AI 커버곡 목록 조회", notes = "사용자가 요청하여 만들어진 AI 커버곡 목록을 조회합니다.")
    @GetMapping("/covers")
    public ResponseEntity<ApiResponse<AiCoversResponseDto>> getAiCovers() {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

        AiCoversResponseDto aiCoversResponseDto = aiCoverService.getAiCovers(
            principal.getUsername());

        return ResponseEntity.ok(
            ApiResponse.<AiCoversResponseDto>builder().message("AI 커버곡 조회 완료")
                .status(HttpStatus.OK.value())
                .data(aiCoversResponseDto).build());
    }

    @ApiOperation(value = "AI 커버곡 제작 요청", notes = "AI 커버곡 제작을 요청합니다.")
    @PostMapping("/covers")
    public ResponseEntity createAiCover() {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

        aiCoverService.createAiCover(principal.getUsername());

        return ResponseEntity.ok().body("요청이 정상적으로 처리되었습니다.");
    }

    @ApiOperation(value = "AI 커버곡 수정", notes = "완성된 AI 커버곡 파일 URL을 통해 사용자가 요청한 AI 커버곡을 수정합니다")
    @PutMapping("/covers")
    public ResponseEntity updateAiCover(
        @ApiParam(value = "수정할 사용자 AI 커버곡 ID와 AI 커버곡 파일 URL의 리스트") @RequestBody List<AiCoverUpdateRequestDto> aiCoverUpdateRequestDtoList) {
        aiCoverService.updateAiCover(aiCoverUpdateRequestDtoList);

        return ResponseEntity.ok("요청이 정상적으로 처리되었습니다.");
    }
}
