package com.ssafy.ssaout.fav.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavSongDto {
    private Long songId;
    private String title;
    private String singer;
    private String albumCoverImage;
    private boolean isFav;

    public void FavSongDto_create(Long songId, String title, String singer, String albumCoverImage, boolean isFav){
        this.songId = songId;
        this.title = title;
        this.singer = singer;
        this.albumCoverImage = albumCoverImage;
        this.isFav = isFav;
    }
}
