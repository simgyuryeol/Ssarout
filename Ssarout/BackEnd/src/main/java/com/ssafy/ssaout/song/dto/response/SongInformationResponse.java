package com.ssafy.ssaout.song.dto.response;

import com.ssafy.ssaout.song.domain.Song;
import java.sql.Time;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class SongInformationResponse {

    private Long songId;
    private String title;
    private String singer;
    private Long view;
    private String voiceFile;
    private String mrFile;
    private String lyric;
    private String albumCoverImage;
    private Time runningTime;
    private List<SongLineDto> songLineList;

    @Builder
    public SongInformationResponse(Song song, List<SongLineDto> songLines) {
        this.songId = song.getSongId();
        this.title = song.getTitle();
        this.singer = song.getSinger();
        this.view = song.getView();
        this.voiceFile = song.getVoiceFile();
        this.mrFile = song.getMrFile();
        this.lyric = song.getLyric();
        this.albumCoverImage = song.getAlbumCoverImage();
        this.runningTime = song.getRunningTime();
        this.songLineList = songLines;
    }

}
