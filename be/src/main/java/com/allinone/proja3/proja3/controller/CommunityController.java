package com.allinone.proja3.proja3.controller;

import com.allinone.proja3.proja3.dto.CommunityDTO;
import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
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
        return ResponseEntity.ok(response);
    }

}
