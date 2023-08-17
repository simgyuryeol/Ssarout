package com.ssafy.ssaout.result.domain;

import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.user.domain.entity.User;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Entity
public class Result {

    @Id
    @Column(name = "RESULT_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    @ManyToOne
    @JoinColumn(name = "SONG_ID")
    private Song song;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "ACCURACY")
    @Min(0)
    @Max(100)
    @NotNull
    private Integer accuracy;

    @Column(name = "RECORD_FILE", columnDefinition = "TEXT")
    @NotNull
    private String recordFile;

    @Column(name = "CREATED_DATE_TIME", updatable = false)
    @CreatedDate
    private LocalDateTime createdDateTime;

    @Builder
    public Result(Song song, User user, Integer accuracy, String recordFile) {
        this.song = song;
        this.user = user;
        this.accuracy = accuracy;
        this.recordFile = recordFile;
    }

}
