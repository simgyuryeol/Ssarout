package com.ssafy.ssaout.song.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

@Getter
@Setter
public class SongLineDto {
    private Long SongLineId;
    private Long songId;
    private String lyric;
    private Time startTime;

    public SongLineDto(Long songLineId, Long songId, String lyric, Time startTime) {
        SongLineId = songLineId;
        this.songId = songId;
        this.lyric = lyric;
        this.startTime = startTime;
    }

    @Override
    public String toString() {
        return "SongLineDto{" +
                "SongLineId=" + SongLineId +
                ", songId=" + songId +
                ", lyric='" + lyric + '\'' +
                ", startTime=" + startTime +
                '}';
    }
}
