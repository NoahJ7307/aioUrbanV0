package com.allinone.proja3.proja3.repository.facilities;

import com.allinone.proja3.proja3.model.facilities.Gym;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface GymRepository extends JpaRepository<Gym, Long> {

    //특정 날짜에 대한 예약 조회
    @Query("select g from Gym g where g.date =:date")
    List<Gym> findByDate(@Param("date")LocalDate date);

    //특정 사용자에 대한 예약 조회
    @Query("select g from Gym g where g.userName = :userName")
    List<Gym> findByUserName(@Param("userName") String userName);

    //예약 삭제
    @Modifying
    @Query("update Gym g set g.delFlag = :flag where g.reservationId = :reservationId")
    void cancelReservation(@Param("reservationId") Long reservationId);

}
