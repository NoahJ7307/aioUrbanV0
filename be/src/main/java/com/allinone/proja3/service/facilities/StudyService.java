package com.allinone.proja3.proja3.service.facilities;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.facilities.StudyDTO;

import java.time.LocalDate;
import java.time.LocalTime;

public interface StudyService {
    Long registerStudy (StudyDTO studyDTO);
    PageResponseDTO<StudyDTO> getList(PageRequestDTO pageRequestDTO);
    boolean isTimeAvailable(LocalDate date, LocalTime startTime,LocalTime endTime, int seatNum);
}
