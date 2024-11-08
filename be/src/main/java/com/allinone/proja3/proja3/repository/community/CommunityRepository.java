package com.allinone.proja3.proja3.repository.community;

import com.allinone.proja3.proja3.model.community.Community;
import com.allinone.proja3.proja3.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface CommunityRepository extends JpaRepository <Community,Long> {
        List<Community> findByUser(User user);//uno로 전체 조회
        Page<Community> findAll(Pageable pageable);


}
