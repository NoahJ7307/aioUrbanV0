package com.allinone.proja3.proja3.service.facilities;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.dto.facilities.GymDTO;
import com.allinone.proja3.proja3.dto.user.UserDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.facilities.Gym;
import com.allinone.proja3.proja3.model.facilities.GymParticipant;

import java.util.List;
import java.util.stream.Collectors;

public interface GymService {
    Gym newProgramPost(Gym gym);
    GymDTO getProgramPost(Long programId);
    public PageResponseDTO<GymDTO> getNonDeletedPrograms(PageRequestDTO pageRequestDTO);
    void remove(Long programId);
    void modify(GymDTO gymDTO);
    public GymDTO findDataByProgramId(Long programId);


    //프로그램 접수관련
     String registerParticipant(Long programId, User user);
     // 대기자 접수
     String registerWaitlist(Long programId, User user);
//    public List<Long> getRegisteredUserIds(Long programId);
//    public GymParticipant findDataByUno (Long uno);
    public List<UserDTO> getRegisterdUsers(Long programId);
//    public String cancelParticipant(Long programId, User user);
    public List<UserDTO> getWaitlistUsers(Long programId);

    default  Gym dtoToEntity (GymDTO gymDTO) {
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




    default GymDTO entityToDto(Gym gym) {
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
