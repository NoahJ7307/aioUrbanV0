package com.allinone.proja3.proja3.controller.community;
import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.community.MarketDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.community.Market;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.service.UserService;
import com.allinone.proja3.proja3.service.community.MarketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/communities/market")
public class MarketController {
    @Autowired
    private MarketService service;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository repository;

    // ================= 조회 관련 API =================//

    @GetMapping("/list")
    public ResponseEntity<PageResponseDTO<MarketDTO>> getMarket(PageRequestDTO pageRequestDTO) {
        PageResponseDTO<MarketDTO> response = service.findAllmarket(pageRequestDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/modify/{mno}")
    public ResponseEntity<MarketDTO> getModify(@PathVariable Long mno) {
        MarketDTO marketDTO = service.findByMno(mno); // 서비스에서 Mno로 데이터 조회
        return ResponseEntity.ok(marketDTO);
    }

    @GetMapping("/{uno}")
    public List<MarketDTO> read(@PathVariable(name = "uno") Long uno) {
        User user = repository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        System.out.println("Retrieved communities for uno: " + uno);
        return service.findDataByUno(uno);
    }

    // ================= 등록 관련 API =================//

    @PostMapping("/add")
    public ResponseEntity<MarketDTO> addMarket(
            @RequestParam("uno") Long userId,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("price") int price,
            @RequestParam("thumbnail") MultipartFile thumbnail,
            @RequestParam("images") List<MultipartFile> images) throws IOException {
        User user = service.findByUno(userId);
        Market market = Market.builder()
                .title(title)
                .content(content)
                .price(price)
                .build();
        Market savedMarket = service.createPost(user, market, thumbnail, images);
        MarketDTO savedMarketDTO = service.entityDto(savedMarket);
        return ResponseEntity.ok(savedMarketDTO);
    }

    // ================= 수정 관련 API =================//

    @PutMapping("/modify/{mno}")
    public ResponseEntity<String> modify(
            @PathVariable(name = "mno") Long mno,
            @RequestParam(name = "uno") Long uno,
            @RequestParam(name = "title") String title,
            @RequestParam(name = "content") String content,
            @RequestParam(name = "price") int price,
            @RequestParam(name = "thumbnail", required = false) MultipartFile thumbnail,
            @RequestParam(name = "images", required = false) List<MultipartFile> images) {

        MarketDTO marketDTO = new MarketDTO();
        marketDTO.setMno(mno);
        marketDTO.setUserId(uno);
        marketDTO.setTitle(title);
        marketDTO.setContent(content);
        marketDTO.setPrice(price);

        try {
            boolean isModified = service.modify(marketDTO, thumbnail, images);

            if (isModified) {
                return ResponseEntity.ok("업데이트 성공!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("업데이트 실패");
            }
        } catch (Exception e) {
            System.err.println("수정 중 오류 발생: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }

    // ================= 삭제 관련 API =================//

    @DeleteMapping("/{pno}")
    public ResponseEntity<String> deletePost(
            @PathVariable("pno") Long pno,
            @RequestParam(value = "uno", required = false) Long uno,
            @RequestParam("role") String role) {

        if ("root".equalsIgnoreCase(role) || "admin".equalsIgnoreCase(role)) {
            service.deletePostByAdmin(pno);
            return new ResponseEntity<>("관리자 권한으로 게시글이 삭제되었습니다.1111", HttpStatus.OK);
        }

        if (uno == null) {
            throw new IllegalArgumentException("일반 사용자의 경우 uno 값이 필요합니다.11111");
        }
        service.deletePost(pno, uno);
        System.out.println("pno와uno의1234" + pno + uno);
        return new ResponseEntity<>("게시글이 삭제되었습니다.11111", HttpStatus.OK);
    }
}