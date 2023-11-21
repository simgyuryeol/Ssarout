package com.ssafy.ssaout.result.dto.response;

import com.ssafy.ssaout.result.domain.Result;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ResultHistoryResponseDto {

    private final String title;
    private final String singer;
    private final String albumCoverImage;
    private final String mrFile;
    private final String recordFile;
    private final LocalDateTime createdDateTime;

    public ResultHistoryResponseDto(Result result) {
        this.title = result.getSong().getTitle();
        this.singer = result.getSong().getSinger();
        this.albumCoverImage = result.getSong().getAlbumCoverImage();
        this.mrFile = result.getSong().getMrFile();
        this.recordFile = result.getRecordFile();
        this.createdDateTime = result.getCreatedDateTime();
    }
}
