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
    Gym findDataByProgramId(Long programId);
    GymDTO entityToDto(Gym gym);
    Gym dtoToEntity(GymDTO gymDTO);

    //프로그램 접수관련
     String registerParticipant(Long programId, User user);
     // 대기자 접수
     String registerWaitlist(Long programId, User user);
//    public List<Long> getRegisteredUserIds(Long programId);
//    public GymParticipant findDataByUno (Long uno);
    public List<UserDTO> getRegisterdUsers(Long programId);
//    public String cancelParticipant(Long programId, User user);
}
