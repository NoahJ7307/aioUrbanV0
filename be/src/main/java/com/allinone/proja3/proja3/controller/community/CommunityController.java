package com.allinone.proja3.proja3.controller.community;

import com.allinone.proja3.proja3.dto.community.CommunityDTO;
import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.model.community.Community;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.service.community.CommunityService;
import com.allinone.proja3.proja3.service.community.CommunityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/communities/board")
public class CommunityController {

    @Autowired
    private CommunityService service;

    @Autowired
    private UserRepository userRepository;

    // ================= 조회 관련 API =================//

    @GetMapping("/list")
    public ResponseEntity<PageResponseDTO<CommunityDTO>> getPosts(PageRequestDTO pageRequestDTO) {
        PageResponseDTO<CommunityDTO> response = service.findAllPosts(pageRequestDTO);
        System.out.println("페이지 정보와 데이터를 담아서 리스폰스반환" + response);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{uno}")
    public List<CommunityDTO> read(@PathVariable(name = "uno") Long uno) {
        System.out.println("내가 쓴 작성자 게시물 조회1111");
        User user = userRepository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        System.out.println("Retrieved communities for uno: " + uno);
        return service.findDataByUno(uno);
    }

    @GetMapping("/modify/{pno}")
    public ResponseEntity<CommunityDTO> modifyCommunity(@PathVariable Long pno) {
        System.out.println("게실글을 조회하여 pno에 맞는 게시글 데이터 주입 : 3333" + pno);
        CommunityDTO communityDTO = service.getCommunityByPno(pno, new User()); // 데이터 조회
        if (communityDTO != null) {
            System.out.println("Post found: " + communityDTO);
            return ResponseEntity.ok(communityDTO);
        } else {
            System.out.println("No post found for ID: " + pno);
            return ResponseEntity.notFound().build();
        }
    }

    // ================= 등록 관련 API =================//

    @PostMapping("/add")
    public ResponseEntity<CommunityDTO> createPost(@RequestBody Community community, Long uno) {
        System.out.println("로그인된 uno로 게시글 생성5555 " + uno);
        User user = userRepository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        community.setUser(user); // 게시물에 사용자 정보를 설정
        Community newPost = service.createPost(community, user);
        CommunityDTO response = service.entityToDto(newPost);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ================= 수정 관련 API =================//

    @PutMapping("/{pno}")
    public ResponseEntity<String> modify(
            @PathVariable(name = "pno") Long pno, Long uno,
            @RequestBody CommunityDTO communityDTO) {
        // CommunityDTO에 pno와 uno 값 설정

        communityDTO.setUserId(uno);
        communityDTO.setPno(pno);
        System.out.println("위에 get맵핑으로 주입된 데이터로 수정 4444" + pno + "uno" + uno + "com" + communityDTO);
        try {
            // 서비스 레이어 호출 (수정 로직 처리)
            boolean isModified = service.modify(communityDTO);
            if (isModified) {
                // 성공적으로 수정되었을 경우 200 OK 응답
                return ResponseEntity.ok("업데이트 성공!");
            } else {
                // 수정 실패 시 400 Bad Request 응답
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("업데이트 실패");
            }
        } catch (Exception e) {
            // 예외 발생 시 500 Internal Server Error 응답
            System.err.println("수정 중 오류 발생: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }

    // ================= 삭제 관련 API =================//

    @DeleteMapping("/{pno}")
    public ResponseEntity<String> deletePost(
            @PathVariable("pno") Long pno, Long uno, String role) {
        if ("root".equalsIgnoreCase(role) || "admin".equalsIgnoreCase(role)) {
            // 관리자 권한으로 바로 삭제
            service.deletePostByAdmin(pno);
            return new ResponseEntity<>("관리자 권한으로 게시글이 삭제되었습니다.", HttpStatus.OK);
        }
        if (uno == null) {
            throw new IllegalArgumentException("일반 사용자의 경우 uno 값이 필요합니다.");
        }
        service.deletePost(pno, uno);
        return new ResponseEntity<>("게시글이 삭제되었습니다.", HttpStatus.OK);
    }
}