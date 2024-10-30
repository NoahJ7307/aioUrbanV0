package com.allinone.proja3.proja3.service.facilities;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.dto.facilities.GymDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.facilities.Gym;

import java.util.List;

public interface GymService {
    Gym newProgramPost(Gym gym);
//    boolean deletePost(Long programId,Long uno);
    GymDTO getProgramPost(Long programId);
    public PageResponseDTO<GymDTO> getNonDeletedPrograms(PageRequestDTO pageRequestDTO);
//    public PageResponseDTO<GymDTO> getProgramPost(Long programId, PageRequestDTO pageRequestDTO);
    void remove(Long programId);
    void modify(GymDTO gymDTO);
//    void findGymBydelFlag(Long programId);
    public Gym findDataByProgramId(Long programId);
//    boolean modifyProgramPost(GymDTO gymDTO);
//    PageResponseDTO<GymDTO> findAllProgramPosts(PageRequestDTO pageRequestDTO);
    GymDTO entityToDto(Gym gym);
    Gym dtoToEntity(GymDTO gymDTO);
//    void modify(GymDTO gymDTO);
}
