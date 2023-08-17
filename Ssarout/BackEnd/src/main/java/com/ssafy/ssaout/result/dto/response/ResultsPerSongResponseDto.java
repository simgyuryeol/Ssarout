package com.ssafy.ssaout.result.dto.response;


import java.util.List;
import lombok.Getter;

@Getter
public class ResultsPerSongResponseDto {

    private final List<ResultPerSongResponseDto> results;
    private final Integer resultCount;

    public ResultsPerSongResponseDto(List<ResultPerSongResponseDto> results, Integer resultCount) {
        this.results = results;
        this.resultCount = resultCount;
    }
}
