package com.ssafy.ssaout.song.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Time;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class SongLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long SongLineId;

    @ManyToOne
    @JoinColumn(name = "SONG_ID")
    private Song song;

    @Column(name = "LYRIC")
    @NotNull
    private String lyric;

    @Column(name = "START_TIME")
    @NotNull
    private Time startTime;

    @Override
    public String toString() {
        return "SongLine{" +
                "SongLineId=" + SongLineId +
                ", song=" + song +
                ", lyric='" + lyric + '\'' +
                ", startTime=" + startTime +
                '}';
    }
}
