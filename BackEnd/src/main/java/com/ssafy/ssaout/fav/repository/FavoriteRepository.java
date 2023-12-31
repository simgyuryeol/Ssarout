package com.ssafy.ssaout.fav.repository;

import com.ssafy.ssaout.fav.domain.entity.Favorite;
import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.user.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findAllByUserId(User userId);
    Optional<Favorite> findByUserIdAndContentId(User userId, Song contentId);
}
