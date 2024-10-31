package com.allinone.proja3.proja3.repository.community;

import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.community.Announce;
import com.allinone.proja3.proja3.model.community.Market;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityMarketRepository extends JpaRepository<Market,Long> {
        List<Market> findByUser(User user);//uno로 전체 조회
        Page<Market> findAll(Pageable pageable);


}
