package com.allinone.proja3.proja3.service.facilities;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.dto.facilities.StudyDTO;
import com.allinone.proja3.proja3.model.facilities.Golf;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;

@Transactional
public interface GolfService {
    Long register(GolfDTO golfDTO);
    PageResponseDTO<GolfDTO> getList(PageRequestDTO pageRequestDTO);
    boolean isTimeAvailable(LocalDate date, LocalTime startTime, LocalTime endTime, int teeBox);
    PageResponseDTO<GolfDTO> getUserReservations(Long uno, PageRequestDTO pageRequestDTO);
    void modify(GolfDTO golfDTO);
    void remove(Long uno);
}
