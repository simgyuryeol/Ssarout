package com.ssafy.ssaout.song.service;

import com.ssafy.ssaout.common.error.ErrorCode;
import com.ssafy.ssaout.common.error.exception.NotFoundException;
import com.ssafy.ssaout.fav.domain.entity.Favorite;
import com.ssafy.ssaout.fav.repository.FavoriteRepository;
import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.song.dto.response.SongDto;
import com.ssafy.ssaout.song.repository.SongRepository;
import com.ssafy.ssaout.user.domain.entity.User;
import com.ssafy.ssaout.user.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongRepository songRepository;
    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;

    public List<SongDto> findAllBySingerOrTitle(String keyword) {
        List<Song> allBySingerOrTitle = songRepository.findAllBySingerOrTitleAndOnlyTrainingIsFalse(
            keyword);

        List<SongDto> songLineDtos = new ArrayList<>();
        for (Song song : allBySingerOrTitle) {
            boolean isFav = false;
            Object principal = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
            if (principal.equals("anonymousUser")) { //유저 정보 없을 시
                isFav = false;
            } else {
                org.springframework.security.core.userdetails.User principal_user = (org.springframework.security.core.userdetails.User) principal;
                User user = userRepository.findByUserId(principal_user.getUsername());
                Optional<Favorite> favorite = favoriteRepository.findByUserIdAndContentId(user,
                    song);
                if (favorite.isPresent()) {
                    isFav = true;
                }
            }

            SongDto songDto = new SongDto(
                song.getSongId(),
                song.getTitle(),
                isFav,
                song.getSinger(),
                song.getStartTiming(),
                song.getAlbumCoverImage()
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
