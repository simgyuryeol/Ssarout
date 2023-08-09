package com.ssafy.ssaout.aicover.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AiCoverUpdateRequestDto {

    private final Long userSeq;
    private final Long aiCoverId;
    private final String modelFile;
    private final String aiCoverFile;

    @Builder
    public AiCoverUpdateRequestDto(Long userSeq, Long aiCoverId, String modelFile,
        String aiCoverFile) {
        this.userSeq = userSeq;
        this.aiCoverId = aiCoverId;
        this.modelFile = modelFile;
        this.aiCoverFile = aiCoverFile;
    }

}
