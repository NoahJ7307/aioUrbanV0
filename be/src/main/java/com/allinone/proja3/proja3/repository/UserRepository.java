package com.allinone.proja3.proja3.repository;

import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select u from User u where u.delFlag = false")
    Page<User> selectList(Pageable pageable);

    // role(전달값) 이 아닌 유저만 필터링
    @Query("select u from User u where :role not member of u.userRoleList and u.delFlag = false")
    Page<User> notPendingList(@Param("role") UserRole role, Pageable pageable);

    // role(전달값) 유저만 필터링
    @Query("select u from User u where :role member of u.userRoleList and u.delFlag = false")
    Page<User> pendingList(@Param("role") UserRole role, Pageable pageable);

    @Modifying
    @Query("update User u set u.delFlag = :flag where u.uno = :uno")
    void updateToDelete(@Param("uno") Long uno, @Param("flag") boolean flag);

    @EntityGraph(attributePaths = {"userRoleList"})
    @Query("select u from User u where u.phone = :phone")
    User getWithRoles(@Param("phone") String phone);


    //==========사용자의 uno, 이름, phone 불러오기================
    Optional<User> findByUserName(String userName);
    Optional<User> findByPhone(String phone);
}
