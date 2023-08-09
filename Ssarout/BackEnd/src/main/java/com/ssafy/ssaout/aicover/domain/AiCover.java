package com.ssafy.ssaout.aicover.domain;

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
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Entity
public class AiCover {

    @Id
    @Column(name = "AI_COVER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long aiCoverId;

    @ManyToOne
    @JoinColumn(name = "SONG_ID")
    private Song song;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @Setter
    @Column(name = "AI_COVER_FILE", columnDefinition = "TEXT", nullable = true)
    private String aiCoverFile;

    @Column(name = "CREATED_DATE_TIME", updatable = false)
    @CreatedDate
    private LocalDateTime createdDateTime;

    @Builder
    public AiCover(Song song, User user, String aiCoverFile) {
        this.song = song;
        this.user = user;
        this.aiCoverFile = aiCoverFile;
    }
}

