package com.ssafy.ssaout.song.domain;

import com.ssafy.ssaout.fav.domain.entity.Favorite;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Time;
import java.util.List;

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

    @OneToMany(mappedBy = "contentId", cascade = CascadeType.ALL)
    private List<Favorite> favorite;

    @Override
    public String toString() {
        return "Song{" +
                "songId=" + songId +
                ", title='" + title + '\'' +
                ", singer='" + singer + '\'' +
                ", view=" + view +
                ", voiceFile='" + voiceFile + '\'' +
                ", mrFile='" + mrFile + '\'' +
                ", albumCoverImage='" + albumCoverImage + '\'' +
                ", runningTime=" + runningTime +
                ", favorite=" + favorite +
                '}';
    }
}
