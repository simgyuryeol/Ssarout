package com.ssafy.ssaout.fav.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.user.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Favorite", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"USER_SEQ", "SONG_ID"})
})
public class Favorite {
    @JsonIgnore
    @Id
    @Column(name = "FAVORITE_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long favoriteSeq;

    /**
     * 유저 아이디
     */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="USER_SEQ")
    private User userId;

    /**
     * 노래 아이디
     */
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="SONG_ID")
    private Song contentId;


    @Override
    public String toString() {
        return "Favorite{" +
                "favoriteSeq=" + favoriteSeq +
                ", userId=" + userId +
                ", contentId=" + contentId +
                '}';
    }
}
