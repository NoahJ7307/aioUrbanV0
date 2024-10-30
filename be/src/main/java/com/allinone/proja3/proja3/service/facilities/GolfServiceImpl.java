package com.allinone.proja3.proja3.service.facilities;

import com.allinone.proja3.proja3.dto.CommunityDTO;
import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.dto.facilities.StudyDTO;
import com.allinone.proja3.proja3.model.Community;
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
import org.springframework.web.client.ResourceAccessException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GolfServiceImpl implements GolfService {

    private final GolfRepository golfRepository;
    private final UserRepository userRepository;

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

        // 엔티티를 조회
        List<Golf> reservations = golfRepository.findByUserUno(uno, pageable);

        // 엔티티를 DTO로 변환
        List<GolfDTO> dtoList = reservations.stream()
                .map(this::entityToDto)  // 엔티티 -> DTO 변환
                .collect(Collectors.toList());

        // 총 예약 수
        long totalCount = golfRepository.countByUserUno(uno);

        // DTO 리스트와 PageRequestDTO를 사용해 PageResponseDTO를 생성하여 반환
        return new PageResponseDTO<>(dtoList,  pageRequestDTO ,totalCount);
    }


    //===========삭제메서드==========
    @Override
    public void remove(Long reservationId) {
        System.out.println("remove service: " + reservationId);
        golfRepository.updateToDelete(reservationId, true);
    }

//    @Override
//    public void findGolfBydelFlag(Long reservationId) {
//        System.out.println("check findGolfBydelFlag");
//        Golf reservation = golfRepository.findById(reservationId).orElseThrow(() -> new ResourceAccessException("예약된 내용이 없어요"));
//        reservation.setDelFlag(true);
//        golfRepository.save(reservation);
//    }
    @Override
    public PageResponseDTO<GolfDTO> getNonDeletedReservations(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize());
        Page<Golf> result = golfRepository.findNonDeletedReservations(pageable);

        List<GolfDTO> dtoList = result.getContent().stream()
                .map(e->entityToDto(e))
                .collect(Collectors.toList());

        return PageResponseDTO.<GolfDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();
    }

    //=========수정메서드==========
    @Override
    public void modify(GolfDTO golfDTO) {
        System.out.println("golf modify !!!!");
        Optional<Golf> result = golfRepository.findById(golfDTO.getReservationId());
        Golf golf = result.orElseThrow();
        golf.changeDate(golfDTO.getDate());
        golf.changeStartTime(golfDTO.getStartTime());
        golf.changeEndTime(golfDTO.getEndTime());
        golf.changeTeeBox(golfDTO.getTeeBox());
        golf.changeState(golfDTO.isDelFlag());
        golfRepository.save(golf);
    }


    //==========사용자의 uno, 이름, phone 불러오기================


    @Override
    public Golf findDataByUno(Long uno) {
        System.out.println("golf service : " + uno );
        Golf golf = golfRepository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return golf;
    }
//    @Override
//    public Golf findDataByUno(Long uno) {
//        User user = userRepository.findById(uno)
//                .orElseThrow(() -> new IllegalArgumentException("User not found"));
//        List<Golf> golf = golfRepository.findByUser(user); // User 객체로 검색
//        return golf.stream()
//                .map(this::entityToDto)
//                .collect(Collectors.toList());
//    }


    @Override
    public List<GolfDTO> findDataByUserName(String userName) {
        User user = userRepository.findByUserName(userName)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<Golf> golf = golfRepository.findByUser(user); // User 객체로 검색
        return golf.stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }
    @Override
    public List<GolfDTO> findDataByPhone(String phone) {
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<Golf> golf = golfRepository.findByUser(user); // User 객체로 검색
        return golf.stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    //레시피 → 요리 (dtoToEntity)
    // 클라이언트로부터 받은 정보를 바탕으로 실제 데이터베이스에 저장할 수 있는 형식으로 변환합니다.
    private Golf dtoToEntity(GolfDTO golfDTO) {
        //dtoList에 user 데이터 연동
        User user = userRepository.findById(golfDTO.getUno())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return Golf.builder()
                .reservationId(golfDTO.getReservationId())
                .date(golfDTO.getDate())
                .startTime(golfDTO.getStartTime())
                .endTime(golfDTO.getEndTime())
                .teeBox(golfDTO.getTeeBox())
                //dtoList에 user 데이터 연동
                .user(user)
                .build();
    }

    //요리 → 레시피 (entityToDto)
    // 데이터베이스에서 가져온 정보를 클라이언트에게 전달하기 위해 필요한 형태로 정리합니다.
    private GolfDTO entityToDto(Golf golf) {
        return GolfDTO.builder()
                .reservationId(golf.getReservationId())
                .date(golf.getDate())
                .teeBox(golf.getTeeBox())
                .startTime(golf.getStartTime())
                .endTime(golf.getEndTime())
                //dtoList에 user 데이터 연동
                .uno(golf.getUser() != null ? golf.getUser().getUno() : null) // 사용자 ID
                .userName(golf.getUser() != null ? golf.getUser().getUserName() : null) // 사용자 이름
                .phone(golf.getUser() != null ? golf.getUser().getPhone() : null) // 사용자 전화번호
                .build();
    }

}
