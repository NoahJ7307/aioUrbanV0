package com.allinone.proja3.proja3.service.facilities;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.dto.facilities.StudyDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.facilities.Golf;
import com.allinone.proja3.proja3.model.facilities.Study;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.repository.facilities.GolfRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GolfServiceImpl implements GolfService {

    private final GolfRepository golfRepository;


    @Override
    public Long register(GolfDTO golfDTO) {
        Golf golf = dtoToEntity(golfDTO);
        Golf result = golfRepository.save(golf);
        return result.getReservationId();
    }

    @Override
    public PageResponseDTO<GolfDTO> getList(PageRequestDTO pageRequestDTO) {
        System.out.println("getList....");
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("reservationId").descending());

        Page<Golf> result = golfRepository.findAll(pageable);

        List<GolfDTO> dtoList = result.getContent() // getContent()로 실제 내용 가져오기
                .stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        return PageResponseDTO.<GolfDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();

    }
    //중복 예약 확인 메서드 구현
    @Override
    public boolean isTimeAvailable(LocalDate date, LocalTime startTime, LocalTime endTime, int teeBox) {
        List<Golf> existingReservations = golfRepository.findByDateAndTime(date, startTime,endTime,teeBox);

        return existingReservations.isEmpty(); //예약이 없다면 true 반환
    }



    @Override
    public PageResponseDTO<GolfDTO> getUserReservations(Long uno, PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage(), pageRequestDTO.getSize());
        List<GolfDTO> reservations = golfRepository.findByUserUno(uno, pageable);
        long totalCount = golfRepository.countByUserUno(uno);
        return new PageResponseDTO<>(reservations,  pageRequestDTO ,totalCount);
    }

    @Override
    public void modify(GolfDTO golfDTO) {
        Golf golf = dtoToEntity(golfDTO);
        golfRepository.save(golf);
    }

    @Override
    public void remove(Long reservationId) {
        golfRepository.updateToDelete(reservationId, true);
    }


    //레시피 → 요리 (dtoToEntity)
    // 클라이언트로부터 받은 정보를 바탕으로 실제 데이터베이스에 저장할 수 있는 형식으로 변환합니다.
    private Golf dtoToEntity(GolfDTO golfDTO) {
        return Golf.builder()
                .reservationId(golfDTO.getReservationId())
                .userName(golfDTO.getUserName())
                .date(golfDTO.getDate())
                .startTime(golfDTO.getStartTime())
                .endTime(golfDTO.getEndTime())
                .teeBox(golfDTO.getTeeBox())
                .build();
    }

    //요리 → 레시피 (entityToDto)
    // 데이터베이스에서 가져온 정보를 클라이언트에게 전달하기 위해 필요한 형태로 정리합니다.
    private GolfDTO entityToDto(Golf golf) {
        return GolfDTO.builder()
                .reservationId(golf.getReservationId())
                .date(golf.getDate())
                .userName(golf.getUserName())
                .teeBox(golf.getTeeBox())
                .startTime(golf.getStartTime())
                .endTime(golf.getEndTime())
                .build();
    }

}
