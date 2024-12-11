package com.allinone.proja3.proja3.service.community;

import com.allinone.proja3.proja3.dto.community.CommunityDTO;
import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.model.community.Community;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.repository.community.CommunityRepository;
import com.allinone.proja3.proja3.repository.UserRepository;

import lombok.RequiredArgsConstructor;
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



    //유저테이블의 데이터로 게시물 생성
    @Override
    public Community createPost(Community community, User user) {
        community.setUser(user); // 게시물에 사용자 정보 추가
        return communityRepository.save(community);
        //커뮤니티에 유저 정보를 담아네고 레파지토리 세이브로 게시물생성 .
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


// 컨트롤러의 겟맵핑(/list)와 연결 리스트 리드 코드
    public PageResponseDTO<CommunityDTO> findAllPosts(PageRequestDTO pageRequestDTO) {

        //페이지정의
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("pno").descending());
// 페이지에 담을거 요청
        Page<Community> result = communityRepository.findAll(pageable);  // CommunityRepository 사용
// 요청 데이터 가공
        List<CommunityDTO> dtoList = result.get()
                .map(this::entityToDto)  // entityToDto 메서드 사용
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();
//  전달
        return PageResponseDTO.<CommunityDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
    }


    @Override
    public void deletePost(Long pno, Long uno) {
        // 게시글 찾기
        Community community = communityRepository.findById(pno)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다: " + pno));

        // 작성자 검증
        if (!community.getUser().getUno().equals(uno)) {
            throw new SecurityException("본인만 게시글을 삭제할 수 있습니다.");
        }

        // 삭제 실행
        communityRepository.deleteById(pno);
    }

    @Override
    public void deletePostByAdmin(Long pno) {
        // 관리자 권한으로 삭제
        communityRepository.deleteById(pno);
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