package com.ssafy.ssaout.song.repository;

import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.song.domain.SongLine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongLineRepository extends JpaRepository<SongLine, Long> {

    public List<SongLine> findAllBySongOrderByStartTimeAsc(Song song);
}
