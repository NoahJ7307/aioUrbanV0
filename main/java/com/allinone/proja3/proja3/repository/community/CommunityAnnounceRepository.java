package com.allinone.proja3.proja3.repository.community;

import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.community.Announce;
import com.allinone.proja3.proja3.model.community.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityAnnounceRepository extends JpaRepository<Announce,Long> {
        List<Announce> findByUser(User user);//uno로 전체 조회
        Page<Announce> findAll(Pageable pageable);


}
