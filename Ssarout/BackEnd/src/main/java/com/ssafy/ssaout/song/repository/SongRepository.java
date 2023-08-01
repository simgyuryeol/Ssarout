package com.ssafy.ssaout.song.repository;

import com.ssafy.ssaout.song.domain.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface SongRepository extends JpaRepository<Song, Long> {

    @Modifying
    @Query("select s from Song s where s.singer = :keyword or s.title = :keyword")
    List<Song> findAllBySingerOrTitle(@Param("keyword") String keyword);

    @Modifying
    @Query("update Song s set s.view = s.view + 1 where s.songId = :songId")
    void updateViews(@Param("songId") Long songId);
}
