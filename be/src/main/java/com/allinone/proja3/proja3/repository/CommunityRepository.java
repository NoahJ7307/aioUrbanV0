package com.allinone.proja3.proja3.repository;

import com.allinone.proja3.proja3.dto.CommunityDTO;
import com.allinone.proja3.proja3.model.Community;
import com.allinone.proja3.proja3.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface CommunityRepository extends JpaRepository <Community,Long> {
        List<Community> findByUser(User user);//uno로 전체 조회
        Page<Community> findAll(Pageable pageable);


}
