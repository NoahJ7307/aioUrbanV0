package com.allinone.proja3.proja3.service.facilities;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.dto.facilities.GymDTO;
import com.allinone.proja3.proja3.dto.user.UserDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.facilities.*;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.repository.facilities.GymParticipantRepository;
import com.allinone.proja3.proja3.repository.facilities.GymRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GymServiceImpl implements GymService {

    private final GymRepository gymRepository;
    private final UserRepository userRepository;
    private final GymParticipantRepository gymParticipantRepository;
    //게시글 등록 메서드
    @Override
    public Gym newProgramPost(Gym gym) {
        gym.setCurrentParticipants(0);  //프로그램 등록 시 기본 참가 인원수를 0으로 설정
        System.out.println("service gym: " +gym);
        return gymRepository.save(gym);
    }
    //선택한 게시글 상세조회 메서드
    @Override
    public GymDTO getProgramPost(Long programId) {
        Gym gym = gymRepository.findByProgramId(programId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + programId));
        return entityToDto(gym);
    }

    //삭제된거 빼고 리스트에 불러오는 메서드(조회와같음)
    @Override
    public PageResponseDTO<GymDTO> getNonDeletedPrograms(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize());
        Page<Gym> result = gymRepository.findNonDeletedPrograms(pageable);

        List<GymDTO> dtoList = result.getContent().stream()
                .map(e->entityToDto(e))
                .collect(Collectors.toList());
        return PageResponseDTO.<GymDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();

    }
    //게시글 삭제
    @Transactional  //프로그램 조회와 프로그램상세내용이 묶여있으므로 transactional을 넣어야만 두개가 세트로 묶여 삭제가 정상처리됨
    @Override
    public void remove(Long programId) {
        System.out.println("remove service: " + programId);
        gymRepository.updateToDelete(programId, true);
    }
    //게시글 수정
    @Override
    public void modify(GymDTO gymDTO) {
        System.out.println("gym modify !!!!");
        Optional<Gym> result = gymRepository.findById(gymDTO.getProgramId());
        Gym gym = result.orElseThrow();
        gym.changeTitle(gymDTO.getTitle());
        gym.changeContent(gymDTO.getContent());
        gym.changeTarget(gymDTO.getTarget());
        gym.changeProgramStartDate(gymDTO.getProgramStartDate());
        gym.changeProgramEndDate(gymDTO.getProgramEndDate());
        gym.changeApplicationStartDate(gymDTO.getApplicationStartDate());
        gym.changeApplicationEndDate(gymDTO.getApplicationEndDate());
        gym.changeProgramStartTime(gymDTO.getProgramStartTime());
        gym.changeProgramEndTime(gymDTO.getProgramEndTime());
        gym.changeParticipantLimit(gymDTO.getParticipantLimit());
        gym.changeProgramState(gymDTO.getProgramState());
        gymRepository.save(gym);

    }
    //프로그램 내용 불러오는건가? 확인필요함
    @Override
    public Gym findDataByProgramId(Long programId) {
        System.out.println("gym service" + programId);
        Gym gym = gymRepository.findById(programId)
                .orElseThrow(()-> new IllegalArgumentException("User not found"));
        return gym;
    }
    //참가자 등록 메서드
    @Override
    public String registerParticipant(Long programId, User user) {
        Gym gym = gymRepository.findById(programId)
                .orElseThrow(() -> new EntityNotFoundException("post not found with Id: " + programId));
        boolean isAlreadyRegistered = gymParticipantRepository.existsByGymAndUser(gym, user);
        if(isAlreadyRegistered) {
            return "Already";
        }

        //모집인원 확인 및 참가자 등록처리
        if (gym.getCurrentParticipants() < gym.getParticipantLimit()) {
            gym.setCurrentParticipants(gym.getCurrentParticipants() + 1);

            GymParticipant participant = new GymParticipant();
            participant.setGym(gym);
            participant.setUser(user);
            participant.setWaitlisted(false); //정식참가자로 등록

            gymParticipantRepository.save(participant);  // 중간 엔티티 저장
            gym.updateProgramState();  // 상태 업데이트
            gymRepository.save(gym);

            return "Done";
        } else {
            return "Over";
            // 대기자 등록 로직을 별도의 메서드로 호출
//            return registerWaitlist(programId, user);
        }
    }
    //대기자 등록 로직
    @Override
    public String registerWaitlist(Long programId, User user) {
        Gym gym = gymRepository.findById(programId)
                .orElseThrow(() -> new EntityNotFoundException("Program not found with Id: " + programId));

        // 이미 정식 참가자로 등록된 경우 확인
        boolean isAlreadyRegistered = gymParticipantRepository.existsByGymAndUserAndWaitlisted(gym, user, false);
        if (isAlreadyRegistered) {
            return "Already registered"; // 이미 정식 참가자로 등록된 경우
        }

        // 이미 대기자로 등록된 경우 확인
        boolean isAlreadyWaitlisted = gymParticipantRepository.existsByGymAndUserAndWaitlisted(gym, user, true);
        if (isAlreadyWaitlisted) {
            return "Already on waitlist"; // 이미 대기자에 등록되어 있는 경우
        }

        // 정식 참가자가 인원이 다 찼을 때 대기자 등록 로직 수행
        GymParticipant waitlistParticipant = new GymParticipant();
        waitlistParticipant.setGym(gym);
        waitlistParticipant.setUser(user);
        waitlistParticipant.setWaitlisted(true);

        gymParticipantRepository.save(waitlistParticipant);
        return "Added to waitlist"; // 대기자 등록 성공
    }
//    @Override
//    public String registerWaitlist(Long programId, User user) {
//        Gym gym = gymRepository.findById(programId)
//                .orElseThrow(()-> new EntityNotFoundException("post not found with Id: " + programId));
//        //이미 참가완료한 참가자인지 확인
//        boolean isAlreadyRegistered = gymParticipantRepository.existsByGymAndUserAndWaitlisted(gym, user, false);
//        if (isAlreadyRegistered) {
//            return "Already registered"; // 이미 정식 참가자로 등록된 경우
//        }
//        // 이미 대기자인지 확인
//        boolean isAlreadyWaitlisted = gymParticipantRepository.existsByGymAndUserAndWaitlisted(gym, user, true);
//        if (isAlreadyWaitlisted) {
//            return "Already on waitlist"; // 이미 대기자에 등록되어 있는 경우
//        }
//        //정식참가자 인원이 다 찼을시, 대기자 등록 로직
//        GymParticipant waitlistParticipant = new GymParticipant();
//        waitlistParticipant.setGym(gym);
//        waitlistParticipant.setUser(user);
//        waitlistParticipant.setWaitlisted(true);
//
//        gymParticipantRepository.save(waitlistParticipant);
//        return "Added to waitlist"; //대기자 등록 성공
//    }


//    @Override
//    public String cancelParticipant(Long programId, User user) {
//        Gym gym = gymRepository.findById(programId)
//                .orElseThrow(()-> new EntityNotFoundException("Program not found with Id: " + programId));
//        //참가자 조회 후 삭제
//        GymParticipant participant = gymParticipantRepository.findByGymAndUser(gym, user)
//                .orElseThrow(() -> new EntityNotFoundException("Participant not found for the user"));
//
//        if(!participant.isWaitlisted()) {
//            //정식 참가자가 취소할 경우 참가 인원 감소
//            gym.setCurrentParticipants(gym.getCurrentParticipants() -1);
//            gymRepository.save(gym);
//            //가장 오래 대기한 사람을 정식 참가자로 전환
////            GymParticipant waitlistParticipant = gymParticipantRepository
////                    .findFirstByGymAndIsWaitlistedOrderByCreatedAtAsc(gym, true)
////                    .orElseThrow(() -> new NoSuchElementException("No waitlisted participant found"));
//            GymParticipant waitlistParticipant = gymParticipantRepository
//                    .findFirstByGymAndWaitlistedOrderByCreatedAtAsc(gym, true)
//                    .orElse(null);
//            if(waitlistParticipant != null) {
//                waitlistParticipant.setWaitlisted(false);
//                gym.setCurrentParticipants(gym.getCurrentParticipants()+1);
//                gymParticipantRepository.save(waitlistParticipant);
////                gymRepository.save(gym);
//            }
//        }
//        gymParticipantRepository.delete(participant);
//        return "Cancelled";
//    }
    //프로그램 ID별로 등록된 User 조회 메서드
    @Override
    public List<UserDTO> getRegisterdUsers(Long programId) {
        Gym gym = gymRepository.findById(programId)
                .orElseThrow(() -> new EntityNotFoundException("Gym program not found with id: " + programId));
        List<GymParticipant> participants = gymParticipantRepository.findByGym(gym);
        return participants.stream()
                .map(participant -> {
                    User user = participant.getUser();
                    return UserDTO.builder()
                            .uno(user.getUno())
                            .userName(user.getUserName())
                            .phone(user.getPhone())
                            .build();
                })
                .collect(Collectors.toList());
    }




    public  Gym dtoToEntity (GymDTO gymDTO) {
        return Gym.builder()
                .programId(gymDTO.getProgramId())
                .content(gymDTO.getContent())
                .title(gymDTO.getTitle())
                .target(gymDTO.getTarget())
                .participantLimit(gymDTO.getParticipantLimit())
                .programStartDate(gymDTO.getProgramStartDate())
                .programEndDate(gymDTO.getProgramEndDate())
                .programStartTime(gymDTO.getProgramStartTime())
                .programEndTime(gymDTO.getProgramEndTime())
                .applicationStartDate(gymDTO.getApplicationStartDate())
                .applicationEndDate(gymDTO.getApplicationEndDate())
                .currentParticipants(gymDTO.getCurrentParticipants())
               // .membershipType(gymDTO.getMembershipType())
                .build();
    }




    public GymDTO entityToDto(Gym gym) {
        return GymDTO.builder()
                .content(gym.getContent())
                .programId(gym.getProgramId())
                .title(gym.getTitle())
                .target(gym.getTarget())
                .programStartDate(gym.getProgramStartDate())
                .programEndDate(gym.getProgramEndDate())
                .programStartTime(gym.getProgramStartTime())
                .programEndTime(gym.getProgramEndTime())
                .applicationStartDate(gym.getApplicationStartDate())
                .applicationEndDate(gym.getApplicationEndDate())
                .participantLimit(gym.getParticipantLimit())
                .currentParticipants((gym.getCurrentParticipants()))
                .programState(gym.getProgramState())//null 값 처리 해주기위해서는 entityToDto로 해줘야함
                //.membershipType(gym.getMembershipType())
//                .uno(gym.getUser().getUno())
//                .uno(gym.getUser() !=null? gym.getUser().getUno():null)
//                .phone(gym.getUser() !=null? gym.getUser().getPhone() : null)
//                .userName(gym.getUser() !=null? gym.getUser().getUserName() : null)
                .build();
    }
}
