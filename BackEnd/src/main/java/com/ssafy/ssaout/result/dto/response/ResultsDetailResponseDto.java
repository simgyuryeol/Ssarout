package com.ssafy.ssaout.result.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ResultsDetailResponseDto {

    private final List<ResultDetailResponseDto> results;
    private final Integer resultCount;

    @Builder
    public ResultsDetailResponseDto(List<ResultDetailResponseDto> results, Integer resultCount) {
        this.results = results;
        this.resultCount = resultCount;
    }
}
