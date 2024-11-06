package com.allinone.proja3.proja3.repository.parking;

import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.parking.Household;
import com.allinone.proja3.proja3.model.parking.HouseholdPK;
import com.allinone.proja3.proja3.model.parking.RegularParking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

public interface RegularParkingRepository extends JpaRepository<RegularParking, Long> {
    Page<RegularParking> findAllByHousehold(Household household, Pageable pageable);

    @Query("select p from RegularParking p where p.household.householdPK.dong like %:dong% and p.household.householdPK.ho like %:ho%")
    Page<RegularParking> findByDongHo(@Param("dong") String dong, @Param("ho") String ho, Pageable pageable);

    @Query("select p from RegularParking p where p.household.householdPK.dong like %:value%")
    Page<RegularParking> findByDong(@Param("value") String value, Pageable pageable);

    @Query("select p from RegularParking p where p.household.householdPK.ho like %:value%")
    Page<RegularParking> findByHo(@Param("value") String value, Pageable pageable);

    @Query("select p from RegularParking p where p.name like %:value%")
    Page<RegularParking> findByName(@Param("value") String value, Pageable pageable);

    @Query("select p from RegularParking p where p.phone like %:value%")
    Page<RegularParking> findByPhone(@Param("value") String value, Pageable pageable);

    @Query("select p from RegularParking p where p.regDate between :start and :end")
    Page<RegularParking> findByRegDate(@Param("start") LocalDate start, @Param("end") LocalDate end, Pageable pageable);

//     Query Method 사용
//    // Like 연산을 위해 이름에 Containing 을 사용하여 대체
//    Page<RegularParking> findByHousehold_HouseholdPK_DongContainingAndHousehold_HouseholdPK_HoContaining(String dong, String ho, Pageable pageable);
//
//    Page<RegularParking> findByHousehold_HouseholdPK_DongContaining(String value, Pageable pageable);
//
//    Page<RegularParking> findByHousehold_HouseholdPK_HoContaining(String value, Pageable pageable);
//
//    Page<RegularParking> findByNameContaining(String value, Pageable pageable);
//
//    Page<RegularParking> findByPhoneContaining(String value, Pageable pageable);
//
//    // Between 연산자를 위한 메서드 명 구성
//    Page<RegularParking> findByRegDateBetween(LocalDate start, LocalDate end, Pageable pageable);
}
