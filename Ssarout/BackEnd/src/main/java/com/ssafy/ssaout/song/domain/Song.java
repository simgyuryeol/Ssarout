package com.ssafy.ssaout.song.domain;

import java.sql.Time;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SONG")
public class Song {

    @Id
    @Column(name = "SONG_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long songId;

    @Column(name = "SONG_TITLE", nullable = false)
    @NotNull
    private String title;

    @Column(name = "SINGER", nullable = false)
    @NotNull
    private String singer;

    private Long view;

    @Column(name = "VOICE_FILE")
    private String voiceFile;

    @Column(name = "MR_FILE")
    private String mrFile;

    @Column(name = "ALBUM_COVER_IMAGE")
    private String albumCoverImage;

    @Column(name = "RUNNING_TIME")
    @NotNull
    private Time runningTime;
}
