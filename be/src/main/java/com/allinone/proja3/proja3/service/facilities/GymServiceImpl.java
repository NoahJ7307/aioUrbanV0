package com.allinone.proja3.proja3.service.facilities;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.dto.facilities.GymDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.facilities.Golf;
import com.allinone.proja3.proja3.model.facilities.Gym;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.repository.facilities.GymRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GymServiceImpl implements GymService {


    private final GymRepository gymRepository;
    private final UserRepository userRepository;

    @Override
    public Gym newProgramPost(Gym gym) {
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

    //삭제된거 빼고 리스트에 불러오는 메서드
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
    @Transactional  //프로그램 조회와 프로그램상세내용이 묶여있으므로 transactional을 넣어야만 두개가 세트로 묶여 삭제가 정상처리됨
    @Override
    public void remove(Long programId) {
        System.out.println("remove service: " + programId);
        gymRepository.updateToDelete(programId, true);
    }

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

    @Override
    public Gym findDataByProgramId(Long programId) {
        System.out.println("gym service" + programId);
        Gym gym = gymRepository.findById(programId)
                .orElseThrow(()-> new IllegalArgumentException("User not found"));
        return gym;
    }
//    @Transactional
//    @Override
//    public void findGymBydelFlag(Long programId) {
//        System.out.println("flag" + programId);
//        Gym programPost = gymRepository.findById(programId).orElseThrow(() -> new ResourceAccessException("프로그램이 없어요"));
//        programPost.setDelFlag(true);
//        gymRepository.save(programPost);
//    }
//    // 특정 사용자의 게시물을 페이징 처리하여 조회하는 메서드
//    @Override
//    public PageResponseDTO<GymDTO> getProgramPost(Long programId, PageRequestDTO pageRequestDTO) {
//        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() -1, pageRequestDTO.getSize());
//        List<Gym> posts = gymRepository.findByUserProgramId(programId, pageable);
//        List<GymDTO> dtoList = posts.stream()
//                .map(this::entityToDto)
//                .collect(Collectors.toList());
//        long totalCount = gymRepository.countByUserProgramId(programId);
//
//         return new PageResponseDTO<>(dtoList, pageRequestDTO, totalCount);
//    }


    //
////    @Override
////    public boolean deletePost(Long programId, Long uno) {
////        // 게시글을 찾고, 해당 게시글이 로그인한 사용자(uno)의 것인지 확인
////        Optional<Gym> gymOptional = gymRepository.findById(programId);
////        if(gymOptional.isPresent()) {
////            Gym gym = gymOptional.get();
////            // 삭제 권한 체크: 게시글 작성자와 현재 로그인한 사용자의 uno가 일치하는지 확인
////            if(gym.getUser().getUno().equals(uno)) {
////                gymRepository.delete(gym);
////                return true; //삭제 성공
////            }else{
////                return false;  //삭제 권한 없음
////            }
////        }
////
////        throw new IllegalArgumentException("게시글을 찾을 수 없습니다/");
////    }
//
//    @Override
//    @Transactional
//    public void remove(Long programId) {
//        System.out.println("remove service: " + programId);
//        gymRepository.updateToDelete(programId, true);
//    }
//
////    @Override
////    public void findGymBydelFlag(Long programId) {
////        Gym program = gymRepository.findById(programId).orElseThrow(() -> new ResourceAccessException("해당하는 게시글이 없어요"));
////        program.setDelFlag(true);
////        gymRepository.save(programId);
////    }
//
////    @Override
////    public PageResponseDTO<GymDTO> getNonDeletedPrograms(PageRequestDTO pageRequestDTO) {
////        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize());
////        Page<Gym> result = gymRepository.findNonDeletedReservations(pageable);
////
////        List<GymDTO> dtoList = result.getContent().stream()
////                .map(e->entityToDto(e))
////                .collect(Collectors.toList());
////
////        return PageResponseDTO.<GymDTO>withAll()
////                .dtoList(dtoList)
////                .pageRequestDTO(pageRequestDTO)
////                .totalCount(result.getTotalElements())
////                .build();
////    }
//
//
//
//    @Override
//    public List<GymDTO> findDataByUno(Long uno) {
//        User user = userRepository.findById(uno)
//                .orElseThrow(() -> new IllegalArgumentException("User not found"));
//        List<Gym> gyms = gymRepository.findByUser(user);
//
//        return gyms.stream()
//                .map(this::entityToDto)
//                .collect(Collectors.toList());
//    }
//    // set 에서 change로변경 해보기
////    @Override
////    public void modify(GymDTO gymDTO) {
////        Gym gym = gymRepository.findById(gymDTO.getProgramId())
////                .orElseThrow(()-> new EntityNotFoundException("Gym not found with ID: " + gymDTO.getProgramId()));
//////        Optional<Gym> result = gymRepository.findById(gymDTO.getProgramId());
//////            Gym gym = result.orElseThrow();
////            gym.changeTitle(gymDTO.getTitle());
////            gym.changeContent(gymDTO.getContent());
////            gym.changeTarget(gymDTO.getTarget());
////            gym.changeProgramStartDate(gymDTO.getProgramStartDate());
////            gym.changeProgramEndDate(gymDTO.getProgramEndDate());
////            gym.changeApplicationStartDate(gymDTO.getApplicationStartDate());
////            gym.changeApplicationEndDate(gymDTO.getApplicationEndDate());
////            gym.changeProgramStartTime(gymDTO.getProgramStartTime());
////            gym.changeProgramEndTime(gymDTO.getProgramEndTime());
////            gym.changeState(gymDTO.isDelFlag());
////            gymRepository.save(gym);
////    }
////    @Override
////    public boolean modifyProgramPost(GymDTO gymDTO) {
////        Optional<Gym> optionalPost = gymRepository.findById(gymDTO.getProgramId());
////        if(optionalPost.isPresent()) {
////            Gym gym = optionalPost.get();
////            gym.changeTitle(gymDTO.getTitle());
////            gym.changeContent(gymDTO.getContent());
////            gym.changeTarget(gymDTO.getTarget());
////            gym.changeProgramStartDate(gymDTO.getProgramStartDate());
////            gym.changeProgramEndDate(gymDTO.getProgramEndDate());
////            gym.changeApplicationStartDate(gymDTO.getApplicationStartDate());
////            gym.changeApplicationEndDate(gymDTO.getApplicationEndDate());
////            gym.changeProgramStartTime(gymDTO.getProgramStartTime());
////            gym.changeProgramEndTime(gymDTO.getProgramEndTime());
////            gym.changeState(gymDTO.isDelFlag());
////            gymRepository.save(gym);
////            return  true;
////        }else {
////            return false;
////
////        }
////    }
//
//    @Override
//    @Transactional
//    public boolean modifyProgramPost(GymDTO gymDTO) {
//        Optional<Gym> optionalPost = gymRepository.findById(gymDTO.getProgramId());
//        if(optionalPost.isPresent()) {
//            Gym gym = optionalPost.get();
//
//            if(gym.getUser()!=null && gym.getUser().getUno().equals(gymDTO.getUno())) {
//                gym.changeTitle(gymDTO.getTitle());
//                gym.changeContent(gymDTO.getContent());
//                gym.changeTarget(gymDTO.getTarget());
//                gym.changeProgramStartDate(gymDTO.getProgramStartDate());
//                gym.changeProgramEndDate(gymDTO.getProgramEndDate());
//                gym.changeApplicationStartDate(gymDTO.getApplicationStartDate());
//                gym.changeApplicationEndDate(gymDTO.getApplicationEndDate());
//                gym.changeProgramStartTime(gymDTO.getProgramStartTime());
//                gym.changeProgramEndTime(gymDTO.getProgramEndTime());
//                gym.changeState(gymDTO.isDelFlag());
//                gymRepository.save(gym);
//                return true;
//            }else {
//                return false;
//                }
//            }else {
//                throw new IllegalArgumentException("프로그램 못찾음");
//            }
//        }
//
//
//
//    @Override
//    public PageResponseDTO<GymDTO> findAllProgramPosts(PageRequestDTO pageRequestDTO) {
//        System.out.println("get List......");
//
//        Pageable pageable = PageRequest.of(
//                pageRequestDTO.getPage() - 1,
//                pageRequestDTO.getSize(),
//                Sort.by("programId").descending());
//
//        Page<Gym> result = gymRepository.findAll(pageable);
//        List<GymDTO> dtoList = result.getContent().stream()
//                .map(this::entityToDto)
//                .collect(Collectors.toList());
//
//        long totalCount = result.getTotalElements();
//
//        return PageResponseDTO.<GymDTO> withAll()
//                .dtoList(dtoList)
//                .pageRequestDTO(pageRequestDTO)
//                .totalCount(totalCount)
//                .build();
//    }
    public  Gym dtoToEntity (GymDTO gymDTO) {
//        User user = userRepository.findById(gymDTO.getUno())
//                .orElseThrow(()-> new IllegalArgumentException("User not found"));
        return Gym.builder()
                .programId(gymDTO.getProgramId())
                .content(gymDTO.getContent())
                .title(gymDTO.getTitle())
                .target(gymDTO.getTarget())
                .programStartDate(gymDTO.getProgramStartDate())
                .programEndDate(gymDTO.getProgramEndDate())
                .programStartTime(gymDTO.getProgramStartTime())
                .programEndTime(gymDTO.getProgramEndTime())
                .applicationStartDate(gymDTO.getApplicationStartDate())
                .applicationEndDate(gymDTO.getApplicationEndDate())
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
                //.membershipType(gym.getMembershipType())
//                .uno(gym.getUser() !=null? gym.getUser().getUno():null)
//                .phone(gym.getUser() !=null? gym.getUser().getPhone() : null)
//                .userName(gym.getUser() !=null? gym.getUser().getUserName() : null)
                .build();
    }
}
