package com.allinone.proja3.proja3.service.facilities;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.dto.facilities.StudyDTO;
import com.allinone.proja3.proja3.model.facilities.Golf;
import com.allinone.proja3.proja3.model.facilities.Study;
import com.allinone.proja3.proja3.repository.facilities.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudyServiceImpl implements StudyService {

    private final StudyRepository studyRepository;

    @Override
    public Long registerStudy(StudyDTO studyDTO) {
        Study study = dtoToEntity(studyDTO);
        Study result = studyRepository.save(study);

        return result.getReservationId();


    }

    @Override
    public PageResponseDTO<StudyDTO> getList(PageRequestDTO pageRequestDTO) {
        System.out.println("getList....");
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() -1,
                pageRequestDTO.getSize(),
                Sort.by("reservationId").descending()
        );

        Page<Study> result = studyRepository.findAll(pageable);

        List<StudyDTO> dtoList = result.getContent()
                .stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
        long totalCount = result.getTotalElements();

        return PageResponseDTO.<StudyDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
    }

    @Override
    public boolean isTimeAvailable(LocalDate date, LocalTime startTime, LocalTime endTime, int seatNum) {
        List<Study> existingReservations = studyRepository.findByDateAndTime(date, startTime, endTime, seatNum);
        return existingReservations.isEmpty(); //예약이 없다면 true 반환
    }

    private Study dtoToEntity(StudyDTO studyDTO) {
        return Study.builder()
                .reservationId(studyDTO.getReservationId())
                .userName(studyDTO.getUserName())
                .date(studyDTO.getDate())
                .startTime(studyDTO.getStartTime())
                .endTime(studyDTO.getEndTime())
                .seatNum(studyDTO.getSeatNum())
                .build();
    }

    private StudyDTO entityToDto(Study study) {
        return StudyDTO.builder()
                .reservationId(study.getReservationId())
                .date(study.getDate())
                .userName(study.getUserName())
                .seatNum(study.getSeatNum())
                .startTime(study.getStartTime())
                .endTime(study.getEndTime())
                .build();
    }

}
