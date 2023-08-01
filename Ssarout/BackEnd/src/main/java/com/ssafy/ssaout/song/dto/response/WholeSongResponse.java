package com.ssafy.ssaout.song.dto.response;

import com.ssafy.ssaout.song.domain.Song;
import lombok.Builder;
import lombok.Getter;

import java.sql.Time;
import java.util.List;

@Getter
public class WholeSongResponse {

    private Long songId;
    private String title;
    private String singer;
    private Long view;
    private String voiceFile;
    private String mrFile;
    private List<SongLineDto> lyrics;
    private String albumCoverImage;
    private Time runningTime;

    @Builder
    public WholeSongResponse(Song song, List<SongLineDto> songLines) {
        this.songId = song.getSongId();
        this.title = song.getTitle();
        this.singer = song.getSinger();
        this.view = song.getView();
        this.voiceFile = song.getVoiceFile();
        this.mrFile = song.getMrFile();
        this.lyrics = songLines;
        this.albumCoverImage = song.getAlbumCoverImage();
        this.runningTime = song.getRunningTime();
    }

    @Override
    public String toString() {
        return "WholeSongResponse{" +
                "songId=" + songId +
                ", title='" + title + '\'' +
                ", singer='" + singer + '\'' +
                ", view=" + view +
                ", voiceFile='" + voiceFile + '\'' +
                ", mrFile='" + mrFile + '\'' +
                ", lyrics=" + lyrics +
                ", albumCoverImage='" + albumCoverImage + '\'' +
                ", runningTime=" + runningTime +
                '}';
    }
}
