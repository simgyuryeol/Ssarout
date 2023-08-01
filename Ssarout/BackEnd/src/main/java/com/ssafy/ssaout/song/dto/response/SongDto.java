package com.ssafy.ssaout.song.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

@Getter
@Setter
public class SongDto {
    private Long songId;
    private String title;
    private String singer;
    private Long view;
    private String voiceFile;
    private String mrFile;
    private String albumCoverImage;
    private Time runningTime;

    public SongDto(Long songId, String title, String singer, Long view, String voiceFile, String mrFile, String albumCoverImage, Time runningTime) {
        this.songId = songId;
        this.title = title;
        this.singer = singer;
        this.view = view;
        this.voiceFile = voiceFile;
        this.mrFile = mrFile;
        this.albumCoverImage = albumCoverImage;
        this.runningTime = runningTime;
    }
}
