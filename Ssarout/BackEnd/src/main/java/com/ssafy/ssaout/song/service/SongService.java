package com.ssafy.ssaout.song.service;

import com.ssafy.ssaout.common.error.ErrorCode;
import com.ssafy.ssaout.common.error.exception.NotFoundException;
import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.song.domain.SongLine;
import com.ssafy.ssaout.song.dto.response.SongDto;
import com.ssafy.ssaout.song.dto.response.SongLineDto;
import com.ssafy.ssaout.song.repository.SongRepository;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongRepository songRepository;

    public List<SongDto> findAllBySingerOrTitle(String keyword) {
        List<Song> allBySingerOrTitle = songRepository.findAllBySingerOrTitle(keyword);

        List<SongDto> songLineDtos = new ArrayList<>();
        for (Song song : allBySingerOrTitle) {
            SongDto songDto = new SongDto(
                    song.getSongId(),
                    song.getTitle(),
                    song.getSinger(),
                    song.getView(),
                    song.getVoiceFile(),
                    song.getMrFile(),
                    song.getAlbumCoverImage(),
                    song.getRunningTime()
            );
            songLineDtos.add(songDto);
        }

        return songLineDtos;
    }

    @Transactional
    public Song getSongById(Long songId) {
        return songRepository.findById(songId).orElseThrow(() -> new NotFoundException(
            ErrorCode.SONG_NOT_FOUND));
    }

    @Transactional
    public void updateViews(Long songId) {
        songRepository.updateViews(songId);
    }
}
