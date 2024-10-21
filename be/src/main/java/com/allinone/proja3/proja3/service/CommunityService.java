package com.allinone.proja3.proja3.service;

import com.allinone.proja3.proja3.dto.CommunityDTO;
import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.model.Community;
import com.allinone.proja3.proja3.model.User;

import java.util.List;

public interface CommunityService {
    public List<CommunityDTO> findDataByUno(Long uno);


    default CommunityDTO entityToDto(Community community) {
        CommunityDTO dto = CommunityDTO.builder()
                .pno(community.getPno())
                .title(community.getTitle())
                .content(community.getContent())
                .createdAt(community.getCreatedAt())
                .updatedAt(community.getUpdatedAt())
                .userId(community.getUser().getUno()) // User 객체에서 userId 가져오기
                .userName(community.getUser().getUserName()) // User 객체에서 userName 가져오기
                .build();
        return dto;
    }
    boolean deletePost(Long pno, Long uno);
    Community createPost(Community community, User user);
    PageResponseDTO<CommunityDTO> findAllPosts(PageRequestDTO pageRequestDTO);

}
