package com.ssafy.ssaout.result.repository;

import com.ssafy.ssaout.result.domain.Result;
import com.ssafy.ssaout.result.dto.response.ResultPerSongResponseDto;
import com.ssafy.ssaout.song.domain.Song;
import com.ssafy.ssaout.user.domain.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ResultRepository extends JpaRepository<Result, Long> {

    List<Result> findAllByUser(User user);

    @Query(
        value = "SELECT "
            + "new com.ssafy.ssaout.result.dto.response.ResultPerSongResponseDto(s.songId, s.singer, s.title, s.albumCoverImage, FLOOR(AVG(r.accuracy))) "
            + "FROM Result r "
            + "INNER JOIN Song s "
            + "ON r.song = s AND r.user = :user "
            + "GROUP BY s.songId"
    )
    List<ResultPerSongResponseDto> findResultByUserGroupBySong(@Param("user") User user);

    List<Result> findAllByUserAndSong(User user, Song song);

    @Query(
        "SELECT COUNT(DISTINCT r.song) "
            + "FROM Result r "
            + "WHERE r.user = :user"
    )
    Long countDistinctSongIdByUser(User user);
}
