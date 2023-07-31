package com.ssafy.ssaout.fav.service;

import com.ssafy.ssaout.fav.domain.entity.Favorite;
import com.ssafy.ssaout.fav.dto.FavDto;
import com.ssafy.ssaout.fav.dto.FavSongDto;
import com.ssafy.ssaout.fav.repository.FavoriteRepository;
import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.song.repository.SongRepository;
import com.ssafy.ssaout.user.domain.entity.User;
import com.ssafy.ssaout.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final SongRepository songRepository;
    private final UserRepository userRepository;

    /**
     * 즐겨찾기 등록
     */
    public Favorite favorite_save(FavDto favDto) throws DataIntegrityViolationException {
            Favorite favorite = new Favorite();
            User user = userRepository.findByUserId(favDto.getUserId());
            Song song = songRepository.findById(favDto.getContentId()).get();
            if (user == null || song == null) {
                // 사용자나 노래를 찾을 수 없는 경우에 대한 예외 처리
                return favorite;
            }
        Favorite findfavorite = favoriteRepository.findByUserIdAndContentId(user, song);
            if(findfavorite!=null){
                    return favorite;
            }

            favorite.setUserId(user);
            favorite.setContentId(song);
            favoriteRepository.saveAndFlush(favorite);

            return favorite;
    }

    /**
     * 즐겨 찾기 삭제
     */
    public void favorite_delete(FavDto favDto){
        User user = userRepository.findByUserId(favDto.getUserId());
        Song song = songRepository.findById(favDto.getContentId()).get();

        if (user == null || song == null) {
            // 사용자나 노래를 찾을 수 없는 경우에 대한 예외 처리
            return;
        }
        favoriteRepository.deleteByUserIdAndContentId(user, song);
    }

    /**
     * 즐겨 찾기 목록
     */
    public List<FavSongDto> favorite_list(FavDto favDto){
        User user = userRepository.findByUserId(favDto.getUserId());
        List<Favorite> favoriteList = favoriteRepository.findAllByUserId(user);
        List<FavSongDto> favSongDtoList = new ArrayList<>();

        for (Favorite favorite : favoriteList) {
            FavSongDto favSongDto = new FavSongDto();
            Long songId = favorite.getContentId().getSongId();
            String title = favorite.getContentId().getTitle();
            String singer = favorite.getContentId().getSinger();
            String albumCoverImage = favorite.getContentId().getAlbumCoverImage();

            favSongDto.FavSongDto_create(songId,title,singer,albumCoverImage);

            favSongDtoList.add(favSongDto);
        }

        return favSongDtoList;

    }
}
