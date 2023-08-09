package com.ssafy.ssaout.result.dto.response;

import lombok.Getter;

@Getter
public class ResultPerSongResponseDto {

    private final Long songId;
    private final String title;
    private final String albumCoverImage;
    private final Integer averageAccuracy;

    public ResultPerSongResponseDto(Long songId, String title, String albumCoverImage,
        Integer averageAccuracy) {
        this.songId = songId;
        this.title = title;
        this.albumCoverImage = albumCoverImage;
        this.averageAccuracy = averageAccuracy;
    }
}
