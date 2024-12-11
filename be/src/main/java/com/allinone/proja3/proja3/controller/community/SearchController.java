package com.allinone.proja3.proja3.controller.community;

import com.allinone.proja3.proja3.service.community.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/communities")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/board/search")
    public ResponseEntity<?> searchBoard(
            @RequestParam String type,
            @RequestParam String keyword,
            @RequestParam int page,
            @RequestParam int size
    ) {
        System.out.println("=== 검색 요청 받음 ===");
        System.out.println("type: " + type);
        System.out.println("keyword: " + keyword);
        System.out.println("page: " + page);
        System.out.println("size: " + size);

        try {
            Map<String, Object> response = searchService.search(type, keyword, page, size, "board");
            System.out.println("검색 결과: " + response);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("검색 처리 중 에러: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("검색 처리 중 오류가 발생했습니다.");
        }
    }

    @GetMapping("/announce/search")
    public ResponseEntity<?> searchAnnounce(
            @RequestParam String type,
            @RequestParam String keyword,
            @RequestParam int page,
            @RequestParam int size
    ) {
        System.out.println("[SearchController] Announce 검색 호출됨");
        Map<String, Object> response = searchService.search(type, keyword, page, size, "announce");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/market/search")
    public ResponseEntity<?> searchMarket(
            @RequestParam String type,
            @RequestParam String keyword,
            @RequestParam int page,
            @RequestParam int size
    ) {
        System.out.println("[SearchController] Market 검색 호출됨");
        Map<String, Object> response = searchService.search(type, keyword, page, size, "market");
        return ResponseEntity.ok(response);
    }
}
