package com.ssafy.ssaout.song.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @Column(name = "START_NODE")
    @NotNull
    private Long startNode;

    @Column(name = "END_NODE")
    @NotNull
    private Long endNode;

    @Column(name = "START_TIME")
    @NotNull
    private Long startTime;

    @Column(name = "end_TIME")
    @NotNull
    private Long endTime;

}
