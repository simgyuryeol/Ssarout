package com.ssafy.ssaout.song.service;

import com.ssafy.ssaout.common.error.ErrorCode;
import com.ssafy.ssaout.common.error.exception.NotFoundException;
import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.song.repository.SongRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongRepository songRepository;

    public List<Song> findAllBySingerOrTitle(String keyword) {
        return songRepository.findAllBySingerOrTitle(keyword);
    }

    @Transactional
    public Song getSongById(Long songId) {
        return songRepository.findById(songId).orElseThrow(() -> new NotFoundException(
            ErrorCode.SONG_NOT_FOUND));
    }

    public void updateViews(Long songId) {
        songRepository.updateViews(songId);
    }
}
