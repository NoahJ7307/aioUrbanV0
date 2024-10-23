package com.allinone.proja3.proja3.controller;

import com.allinone.proja3.proja3.dto.CommunityDTO;
import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.UserDTO;
import com.allinone.proja3.proja3.model.Community;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community")
public class CommunityController {

    @Autowired
    private CommunityService service;

    @Autowired
    private UserRepository userRepository;

    // 특정 사용자의 게시물 조회
    @GetMapping("/{uno}")
    public List<CommunityDTO> read(@PathVariable(name = "uno") Long uno) {
        User user = userRepository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        System.out.println("Retrieved communities for uno: " + uno);
        return service.findDataByUno(uno);
    }
    @GetMapping("/{uno}")
    public List<CommunityDTO> readModify(@PathVariable(name = "pno") Long pno) {
        User user = userRepository.findById(pno)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        System.out.println("읽었다" + pno);
        return service.findDataByUno(pno);
    }



    // 게시물 생성
    @PostMapping("/add")
    public ResponseEntity<CommunityDTO> createPost(@RequestBody Community community, @RequestParam Long uno) {
        User user = userRepository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        community.setUser(user); // 게시물에 사용자 정보를 설정
        Community newPost = service.createPost(community, user);
        CommunityDTO response = service.entityToDto(newPost);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/list")
    public ResponseEntity<PageResponseDTO<CommunityDTO>> getPosts(PageRequestDTO pageRequestDTO) {
        PageResponseDTO<CommunityDTO> response = service.findAllPosts(pageRequestDTO);
        System.out.println("Received pn1111o: " + response);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{pno}")
    public ResponseEntity<String> deletePost(@PathVariable("pno") Long pno, @RequestParam("uno") Long uno) {
         service.deletePost(pno, uno);


            return new ResponseEntity<>("게시글이 삭제되었습니다.", HttpStatus.OK);

    }
    @PutMapping("/{pno}")
    public ResponseEntity<String> modify(
            @PathVariable(name = "pno") Long pno,
            @RequestParam(name = "uno") Long uno,
            @RequestBody CommunityDTO communityDTO) {

        // 입력된 값 출력 (디버깅용)
        System.out.println("Received pno: " + pno);
        System.out.println("Received uno: " + uno);
        System.out.println("CommunityDTO: " + communityDTO);

        // CommunityDTO에 pno와 uno 값 설정
        communityDTO.setUserId(uno);
        communityDTO.setPno(pno);

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

}
