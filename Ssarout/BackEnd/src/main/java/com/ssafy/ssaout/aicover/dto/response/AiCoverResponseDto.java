package com.ssafy.ssaout.aicover.dto.response;

import com.ssafy.ssaout.aicover.domain.AiCover;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
public class AiCoverResponseDto {

    private final String title;
    private final String singer;
    private final String albumCoverImage;
    private final String aiCoverFile;
    private final String aiMrFile;
    private final LocalDateTime createdDateTime;

    @Builder
    public AiCoverResponseDto(AiCover aiCover) {
        this.title = aiCover.getSong().getTitle();
        this.singer = aiCover.getSong().getSinger();
        this.albumCoverImage = aiCover.getSong().getAlbumCoverImage();
        this.aiCoverFile = aiCover.getAiCoverFile();
        this.aiMrFile = aiCover.getSong().getAiMrFile();
        this.createdDateTime = aiCover.getCreatedDateTime();
    }
}
