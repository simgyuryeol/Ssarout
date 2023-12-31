package com.ssafy.ssaout.song.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SongDto {

    private Long songId;
    private String title;
    private Boolean isFav; //즐겨찾기 유무
    private String singer;
    private Long startTiming;
    private String albumCoverImage;

    public SongDto(Long songId, String title, Boolean isFav, String singer, Long startTiming,
        String albumCoverImage) {
        this.songId = songId;
        this.title = title;
        this.isFav = isFav;
        this.singer = singer;
        this.startTiming = startTiming;
        this.albumCoverImage = albumCoverImage;
    }

}
