package com.ssafy.ssaout.aicover.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AiCoverUpdateRequestDto {

    private final Long aiCoverId;
    private final String aiCoverFile;

    @Builder
    public AiCoverUpdateRequestDto(Long aiCoverId,
        String aiCoverFile) {
        this.aiCoverId = aiCoverId;
        this.aiCoverFile = aiCoverFile;
    }

}
