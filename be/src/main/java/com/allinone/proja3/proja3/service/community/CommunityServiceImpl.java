package com.allinone.proja3.proja3.service.community;

import com.allinone.proja3.proja3.dto.community.CommunityDTO;
import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.model.community.Community;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.repository.community.CommunityRepository;
import com.allinone.proja3.proja3.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService {
    private final CommunityRepository communityRepository;
    private final UserRepository userRepository; // UserRepository 주입

    @Override
    public Community createPost(Community community, User user) {
        community.setUser(user); // 게시물에 사용자 정보 추가
        return communityRepository.save(community);
    }

    @Override
    public List<CommunityDTO> findDataByUno(Long uno) {
        User user = userRepository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<Community> communities = communityRepository.findByUser(user); // User 객체로 검색
        return communities.stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }


    @Autowired
    private CommunityRepository repository;

    public PageResponseDTO<CommunityDTO> getPosts(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize());
        Page<Community> result = repository.findAll(pageable); // 페이지 가져오기
        List<CommunityDTO> dtoList = result.getContent().stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());

        return PageResponseDTO.<CommunityDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();
    }


    public CommunityDTO entityToDto(Community community) {
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

    public PageResponseDTO<CommunityDTO> findAllPosts(PageRequestDTO pageRequestDTO) {
        System.out.println("getList.....");

        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("pno").descending());

        Page<Community> result = communityRepository.findAll(pageable);  // CommunityRepository 사용

        List<CommunityDTO> dtoList = result.get()
                .map(this::entityToDto)  // entityToDto 메서드 사용
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<CommunityDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
    }


    @Override
    public boolean deletePost(Long pno, Long uno) {
        // 게시글을 찾고, 해당 게시글이 로그인한 사용자(uno)의 것인지 확인
        Optional<Community> communityOpt = communityRepository.findById(pno);

        if (communityOpt.isPresent()) {
            Community community = communityOpt.get();
            // 삭제 권한 체크: 게시글 작성자와 현재 로그인한 사용자의 uno가 일치하는지 확인
            if (community.getUser().getUno().equals(uno)) {
                communityRepository.delete(community);
                return true; // 삭제 성공
            } else {
                return false; // 삭제 권한 없음
            }
        }
        throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
    }

    @Override
    public boolean modify(CommunityDTO communityDTO) {
        Optional<Community> optionalPost = communityRepository.findById(communityDTO.getPno());

        if (optionalPost.isPresent()) {
            Community post = optionalPost.get();
            post.setTitle(communityDTO.getTitle());
            post.setContent(communityDTO.getContent());

            communityRepository.save(post); // 수정된 게시글 저장
            return true; // 성공 시 true 반환
        } else {
            return false; // 게시글이 없을 경우 false 반환
        }
    }

    @Override
    public CommunityDTO getCommunityByPno(Long pno, User user){
        Community community = communityRepository.findById(pno)
                .orElseThrow(()->new IllegalArgumentException("읽었다"+pno));
        return new CommunityDTO(community.getPno(),community.getTitle(),community.getContent());
    }
}