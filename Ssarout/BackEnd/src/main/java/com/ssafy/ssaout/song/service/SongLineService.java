package com.ssafy.ssaout.song.service;

import com.ssafy.ssaout.song.domain.SongLine;
import com.ssafy.ssaout.song.repository.SongLineRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SongLineService {

    private final SongLineRepository songLineRepository;

    public List<SongLine> getAllSongLineById(Long songId) {
        return songLineRepository.findAllBySongOrderByStartTimeAsc(songId);
    }
}
