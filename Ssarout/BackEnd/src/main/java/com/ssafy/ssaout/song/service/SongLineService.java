package com.ssafy.ssaout.song.service;

import com.ssafy.ssaout.common.error.ErrorCode;
import com.ssafy.ssaout.common.error.exception.NotFoundException;
import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.song.domain.SongLine;
import com.ssafy.ssaout.song.dto.response.SongLineDto;
import com.ssafy.ssaout.song.repository.SongLineRepository;
import com.ssafy.ssaout.song.repository.SongRepository;
import java.util.List;
import java.util.stream.Collectors;
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
        List<SongLine> allBySongOrderByStartTimeAsc = songLineRepository.findAllBySongOrderByStartTimeAsc(
            song);

        List<SongLineDto> songLineDtoList = allBySongOrderByStartTimeAsc.stream()
            .map(songLine -> SongLineDto.builder().startNode(
                    songLine.getStartNode()).endNode(songLine.getEndNode())
                .startTime(songLine.getStartTime()).endTime(songLine.getEndTime()).build()).collect(
                Collectors.toList());

        return songLineDtoList;
    }
}
