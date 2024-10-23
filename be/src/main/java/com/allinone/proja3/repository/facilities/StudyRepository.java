package com.allinone.proja3.proja3.repository.facilities;

import com.allinone.proja3.proja3.model.facilities.Golf;
import com.allinone.proja3.proja3.model.facilities.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Long> {
    //날짜 ,시간,좌석번호로 예약 목록 중복 조회 메서드
    @Query("select s from Study s where s.date = :date AND s.startTime < :endTime AND s.endTime > :startTime AND s.seatNum = :seatNum")
    List<Study> findByDateAndTime(@Param("date") LocalDate date,
                                 @Param("startTime") LocalTime startTime,
                                 @Param("endTime") LocalTime endTime,
                                 @Param("seatNum") int seatNum);
}
