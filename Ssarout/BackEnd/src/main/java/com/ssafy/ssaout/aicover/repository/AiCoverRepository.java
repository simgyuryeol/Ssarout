package com.ssafy.ssaout.aicover.repository;

import com.ssafy.ssaout.aicover.domain.AiCover;
import com.ssafy.ssaout.user.domain.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AiCoverRepository extends JpaRepository<AiCover, Long> {

    List<AiCover> findAllByUser(User user);
}
