package com.ssafy.ssaout.song.dto.response;

import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.song.domain.SongLine;
import java.sql.Time;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class WholeSongResponse {

    private Long songId;
    private String title;
    private String singer;
    private Long view;
    private String voiceFile;
    private String mrFile;
    private List<SongLine> lyrics;
    private String albumCoverImage;
    private Time runningTime;

    @Builder
    public WholeSongResponse(Song song, List<SongLine> songLines) {
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
}
