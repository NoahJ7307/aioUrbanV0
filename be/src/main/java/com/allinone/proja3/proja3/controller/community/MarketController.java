package com.allinone.proja3.proja3.controller.community;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.community.AnnounceDTO;
import com.allinone.proja3.proja3.dto.community.MarketDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.community.Announce;
import com.allinone.proja3.proja3.model.community.Market;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.service.community.AnnounceService;
import com.allinone.proja3.proja3.service.community.MarketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/communities/market")
public class MarketController {
    @Autowired
    private MarketService service;
    @Autowired
    private UserRepository repository;

    @GetMapping("/list")
    public ResponseEntity<PageResponseDTO<MarketDTO>> getMarket(PageRequestDTO pageRequestDTO) {
        PageResponseDTO<MarketDTO> response = service.findAllmarket(pageRequestDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<MarketDTO> createPost(@RequestBody Market market, @RequestParam Long uno) {
        User user = repository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        market.setUser(user); // 게시물에 사용자 정보를 설정
        Market newPost = service.createPost(user, market);

        // entitytoDto 메서드를 호출하여 AnnounceDTO를 생성
        MarketDTO response = service.entityDto(newPost); // newPost를 사용하여 DTO 생성
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @GetMapping("/modify/{pno}")
    public ResponseEntity<MarketDTO> modifyMarket(@PathVariable Long mno) {
        System.out.println("Request received for post ID: " + mno);

        MarketDTO marketDTO = service.getMno(mno, new User());
        if (marketDTO != null) {
            System.out.println("Post found: " + marketDTO);
            return ResponseEntity.ok(marketDTO);
        } else {
            System.out.println("No post found for ID: " + mno);
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{uno}")
    public List<MarketDTO> read(@PathVariable(name = "uno") Long uno) {
        User user = repository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        System.out.println("Retrieved communities for uno: " + uno);
        return service.findDataByUno(uno);
    }


    @DeleteMapping("/{mno}")
    public ResponseEntity<String> deletePost(@PathVariable("pno") Long mno, @RequestParam("uno") Long uno) {
        service.deletePost(mno, uno);


        return new ResponseEntity<>("게시글이 삭제되었습니다.", HttpStatus.OK);

    }

    @PutMapping("/modify/{pno}")
    public ResponseEntity<String> modify(
            @PathVariable(name = "mno") Long mno,
            @RequestParam(name = "uno") Long uno,
            @RequestBody MarketDTO marketDTO) {

        // 입력된 값 출력 (디버깅용)
        System.out.println("Received mno123: " + mno);
        System.out.println("Received uno123: " + uno);
        System.out.println("CommunityDTO123: " + marketDTO);

        // CommunityDTO에 pno와 uno 값 설정
        marketDTO.setUserId(uno);
        marketDTO.setMno(mno);

        try {
            // 서비스 레이어 호출 (수정 로직 처리)
            boolean isModified = service.modify(marketDTO);

            if (isModified) {
                // 성공적으로 수정되었을 경우 200 OK 응답
                return ResponseEntity.ok("업데이트 성공123!");
            } else {
                // 수정 실패 시 400 Bad Request 응답
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("업데이트 실패123");
            }
        } catch (Exception e) {
            // 예외 발생 시 500 Internal Server Error 응답
            System.err.println("수정 중 오류 발생123: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생123");
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image) {
        if (image.isEmpty()) {
            return ResponseEntity.badRequest().body("파일이 비어 있습니다.");
        }

        try {
            // 파일이 저장될 경로 설정
            String uploadDir = "upload/"; // 예: 프로젝트 루트 디렉토리 내의 'upload' 폴더
            File uploadDirectory = new File(uploadDir);
            if (!uploadDirectory.exists()) {
                uploadDirectory.mkdir(); // 디렉토리가 없으면 생성
            }

            // 파일 저장
            File file = new File(uploadDir + image.getOriginalFilename());
            image.transferTo(file);

            return ResponseEntity.ok("파일 업로드 성공: " + file.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 중 오류 발생");
        }
    }



}
