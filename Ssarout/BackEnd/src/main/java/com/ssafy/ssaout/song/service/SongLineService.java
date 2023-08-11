package com.ssafy.ssaout.song.service;

import com.ssafy.ssaout.common.error.ErrorCode;
import com.ssafy.ssaout.common.error.exception.NotFoundException;
import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.song.domain.SongLine;
import com.ssafy.ssaout.song.dto.response.SongLineDto;
import com.ssafy.ssaout.song.repository.SongLineRepository;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.ssaout.song.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SongLineService {

    private final SongLineRepository songLineRepository;
    private final SongRepository songRepository;

    public List<SongLineDto> getAllSongLineById(Long songId) {
        Song song = songRepository.findById(songId).orElseThrow(() -> new NotFoundException(
                ErrorCode.SONG_NOT_FOUND));
        List<SongLine> allBySongOrderByStartTimeAsc = songLineRepository.findAllBySongOrderByStartTimeAsc(song);

        List<SongLineDto> songLineDtos = new ArrayList<>();
        for (SongLine songLine : allBySongOrderByStartTimeAsc) {
            SongLineDto songLineDto = new SongLineDto(
                    songLine.getSongLineId(),
                    songLine.getSong().getSongId(),
                    songLine.getLyric(),
                    songLine.getStartTime()
            );
            songLineDtos.add(songLineDto);
        }

        return songLineDtos;
    }
}
