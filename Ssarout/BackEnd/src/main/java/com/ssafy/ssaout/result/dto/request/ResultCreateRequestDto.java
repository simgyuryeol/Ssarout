package com.ssafy.ssaout.result.dto.request;

import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ResultCreateRequestDto {

    @NotNull
    private Long songId;

    @NotNull
    private Integer accuracy;

    @Builder
    public ResultCreateRequestDto(Long songId, Integer accuracy) {
        this.songId = songId;
        this.accuracy = accuracy;
    }
}
