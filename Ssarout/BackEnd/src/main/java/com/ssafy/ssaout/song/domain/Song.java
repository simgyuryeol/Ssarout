package com.ssafy.ssaout.song.domain;

import com.ssafy.ssaout.fav.domain.entity.Favorite;
import java.sql.Time;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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

    @Column(name = "VOICE_FILE", columnDefinition = "TEXT")
    private String voiceFile;

    @Column(name = "AI_MR_FILE", columnDefinition = "TEXT")
    private String aiMrFile;

    @Column(name = "MR_FILE", columnDefinition = "TEXT")
    private String mrFile;

    @Column(name = "ALBUM_COVER_IMAGE", columnDefinition = "TEXT")
    private String albumCoverImage;

    @Column(name = "LYRIC", columnDefinition = "TEXT")
    private String lyric;

    @Column(name = "START_TIMING")
    private Long startTiming;

    @Column(name = "RUNNING_TIME")
    @NotNull
    private Time runningTime;

    @OneToMany(mappedBy = "contentId", cascade = CascadeType.ALL)
    private List<Favorite> favorite;

    @Column(name = "ONLY_TRAINING")
    @NotNull
    private Boolean onlyTraining;

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
