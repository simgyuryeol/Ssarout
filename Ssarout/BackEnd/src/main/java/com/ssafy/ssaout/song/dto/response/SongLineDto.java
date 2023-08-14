package com.ssafy.ssaout.song.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SongLineDto {

    private Long startNode;
    private Long endNode;
    private Long startTime;
    private Long endTime;

    @Builder
    public SongLineDto(Long startNode, Long endNode, Long startTime, Long endTime) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.startTime = startTime;
        this.endTime = endTime;
    }

}
