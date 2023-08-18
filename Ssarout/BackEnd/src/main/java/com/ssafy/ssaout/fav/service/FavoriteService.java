package com.ssafy.ssaout.fav.service;

import com.ssafy.ssaout.common.error.ErrorCode;
import com.ssafy.ssaout.common.error.exception.NotFoundException;
import com.ssafy.ssaout.fav.domain.entity.Favorite;
import com.ssafy.ssaout.fav.dto.FavDto;
import com.ssafy.ssaout.fav.dto.FavSongDto;
import com.ssafy.ssaout.fav.repository.FavoriteRepository;
import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.song.repository.SongRepository;
import com.ssafy.ssaout.user.domain.entity.User;
import com.ssafy.ssaout.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final SongRepository songRepository;
    private final UserRepository userRepository;

    /**
     * 즐겨찾기 등록, 삭제
     * 등록 되어 있는 경우 삭제
     * 신규일 경우 등록
     */
    public boolean favorite_save(Long contentId, String userId) {
        User user = userRepository.findByUserId(userId);
        if(user==null){
            new NotFoundException(ErrorCode.USER_NOT_FOUND);
        }

        Song song = songRepository.findById(contentId).orElseThrow(() -> new NotFoundException(
                ErrorCode.SONG_NOT_FOUND));
        Optional<Favorite> findfavorite = favoriteRepository.findByUserIdAndContentId(user, song);

        if(findfavorite.isPresent()){ //기존 즐찾 삭제
            favoriteRepository.delete(findfavorite.get());
            return false;
        }

        Favorite favorite = new Favorite();
        favorite.setUserId(user);
        favorite.setContentId(song);

        favoriteRepository.save(favorite);
        return true;

    }


    /**
     * 즐겨 찾기 목록
     */
    public List<FavSongDto> favorite_list(String UserId){
        User user = userRepository.findByUserId(UserId);
        List<Favorite> favoriteList = favoriteRepository.findAllByUserId(user);
        List<FavSongDto> favSongDtoList = new ArrayList<>();

        for (Favorite favorite : favoriteList) {
            FavSongDto favSongDto = new FavSongDto();
            Long songId = favorite.getContentId().getSongId();
            String title = favorite.getContentId().getTitle();
            String singer = favorite.getContentId().getSinger();
            String albumCoverImage = favorite.getContentId().getAlbumCoverImage();

            favSongDto.FavSongDto_create(songId,title,singer,albumCoverImage,true);

            favSongDtoList.add(favSongDto);
        }

        return favSongDtoList;
    }
}
