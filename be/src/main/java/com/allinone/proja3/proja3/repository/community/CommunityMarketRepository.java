package com.allinone.proja3.proja3.repository.community;

import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.community.Market;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommunityMarketRepository extends JpaRepository<Market, Long>, JpaSpecificationExecutor<Market> {
        List<Market> findByUser(User user);//uno로 전체 조회
        Page<Market> findAll(Pageable pageable);

        @Query("SELECT c FROM Market c WHERE " +
                "(:type = 'title' AND c.title LIKE %:keyword%) OR " +
                "(:type = 'content' AND c.content LIKE %:keyword%) OR " +
                "(:type = 'titleAndContent' AND (c.title LIKE %:keyword% OR c.content LIKE %:keyword%))")
        Page<Market> searchByType(@Param("type") String type, @Param("keyword") String keyword, Pageable pageable);

}

