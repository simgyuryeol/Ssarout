package com.ssafy.ssaout.aicover.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class AiCoversResponseDto {

    private final List<AiCoverResponseDto> results;
    private final Integer resultCount;

    @Builder
    public AiCoversResponseDto(List<AiCoverResponseDto> results, Integer resultCount) {
        this.results = results;
        this.resultCount = resultCount;
    }
}
