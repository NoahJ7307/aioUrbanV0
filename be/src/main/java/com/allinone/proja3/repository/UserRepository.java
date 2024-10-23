package com.allinone.proja3.proja3.repository;

import com.allinone.proja3.proja3.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select u from User u where u.delFlag = false")
    Page<User> selectList(Pageable pageable);

    @Modifying
    @Query("update User u set u.delFlag = :flag where u.uno = :uno")
    void updateToDelete(@Param("uno") Long uno, @Param("flag") boolean flag);

    @EntityGraph(attributePaths = {"userRoleList"})
    @Query("select u from User u where u.phone = :phone")
    User getWithRoles(@Param("phone") String phone);
}
