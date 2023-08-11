package com.ssafy.ssaout.aicover.controller;

import com.ssafy.ssaout.aicover.dto.request.AiCoverUpdateRequestDto;
import com.ssafy.ssaout.aicover.dto.response.AiCoversResponseDto;
import com.ssafy.ssaout.aicover.service.AiCoverService;
import com.ssafy.ssaout.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AiCoverController {

    private final AiCoverService aiCoverService;

    @GetMapping("/covers")
    public ResponseEntity<ApiResponse<AiCoversResponseDto>> getAiCovers() {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

        AiCoversResponseDto aiCoversResponseDto = aiCoverService.getAiCovers(
            principal.getPassword());

        return ResponseEntity.ok(
            ApiResponse.<AiCoversResponseDto>builder().message("AI 커버곡 조회 완료")
                .status(HttpStatus.OK.value())
                .data(aiCoversResponseDto).build());
    }

    @PostMapping("/covers/{songId}")
    public ResponseEntity createAiCover(@PathVariable("songId") Long songId) {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

        aiCoverService.createAiCover(principal.getUsername(), songId);

        return ResponseEntity.ok().body("요청이 정상적으로 처리되었습니다.");
    }

    @PutMapping("/covers")
    public ResponseEntity updateAiCover(
        @RequestBody AiCoverUpdateRequestDto aiCoverUpdateRequestDto) {
        aiCoverService.updateAiCover(aiCoverUpdateRequestDto);

        return ResponseEntity.ok("요청이 정상적으로 처리되었습니다.");
    }
}
