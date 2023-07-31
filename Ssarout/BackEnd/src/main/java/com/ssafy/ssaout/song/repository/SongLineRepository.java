package com.ssafy.ssaout.song.repository;

import com.ssafy.ssaout.song.domain.SongLine;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongLineRepository extends JpaRepository<SongLine, Long> {

    public List<SongLine> findAllBySongOrderByStartTimeAsc(Long songId);
}
