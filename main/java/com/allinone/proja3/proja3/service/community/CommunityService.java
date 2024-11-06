package com.allinone.proja3.proja3.service.community;

import com.allinone.proja3.proja3.dto.community.CommunityDTO;
import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.model.community.Community;
import com.allinone.proja3.proja3.model.User;

import java.util.List;

public interface CommunityService {
    public List<CommunityDTO> findDataByUno(Long uno);
    boolean deletePost(Long pno, Long uno);
    Community createPost(Community community, User user);
    PageResponseDTO<CommunityDTO> findAllPosts(PageRequestDTO pageRequestDTO);
    boolean modify(CommunityDTO communityDTO);
    CommunityDTO getCommunityByPno(Long pno ,User user);

    default CommunityDTO entityToDto(Community community) {
        return CommunityDTO.builder()
                .pno(community.getPno())
                .title(community.getTitle())
                .content(community.getContent())
                .createdAt(community.getCreatedAt())
                .updatedAt(community.getUpdatedAt())
                .userId(community.getUser().getUno())
                .userName(community.getUser().getUserName())
                .build();
    }
}
