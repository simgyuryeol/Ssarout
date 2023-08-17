package com.ssafy.ssaout.result.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ResultsHistoryResponseDto {

    private final List<ResultHistoryResponseDto> results;
    private final Integer resultCount;

    @Builder
    public ResultsHistoryResponseDto(List<ResultHistoryResponseDto> results, Integer resultCount) {
        this.results = results;
        this.resultCount = resultCount;
    }
}
