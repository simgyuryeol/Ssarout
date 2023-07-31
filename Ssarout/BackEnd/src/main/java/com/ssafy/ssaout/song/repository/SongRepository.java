package com.ssafy.ssaout.song.repository;

import com.ssafy.ssaout.song.domain.Song;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SongRepository extends JpaRepository<Song, Long> {

}
