package com.allinone.proja3.proja3.service.community;

import com.allinone.proja3.proja3.repository.community.CommunityAnnounceRepository;
import com.allinone.proja3.proja3.repository.community.CommunityMarketRepository;
import com.allinone.proja3.proja3.repository.community.CommunityRepository;
import com.allinone.proja3.proja3.repository.community.CommunitySpecifications;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;




@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final CommunityRepository communityRepository;
    private final CommunityAnnounceRepository announceRepository;
    private final CommunityMarketRepository marketRepository;

    @Override
    @Transactional  // 추가
    public Map<String, Object> search(String type, String keyword, int page, int size, String category) {
        if (keyword == null || keyword.isEmpty()) {
            throw new IllegalArgumentException("Keyword must not be null or empty");
        }

        String searchKeyword = "%" + keyword.toLowerCase() + "%";
        Pageable pageable = PageRequest.of(page - 1, size);

        Page<?> results;

        switch (category) {
            case "board":
                results = communityRepository.findAll(
                        CommunitySpecifications.searchByType(type, searchKeyword, category),
                        pageable
                ).map(community -> Map.of(
                        "pno", community.getPno(),
                        "title", community.getTitle(),
                        "content", community.getContent(),
                        "createdAt", community.getCreatedAt(),
                        "updatedAt", community.getUpdatedAt(),
                        "userName", community.getUser().getUserName()
                ));
                break;

            case "announce":
                results = announceRepository.findAll(
                        CommunitySpecifications.searchByType(type, searchKeyword, category),
                        pageable
                ).map(announce -> Map.of(
                        "pno", announce.getPno(),
                        "title", announce.getTitle(),
                        "content", announce.getContent(),
                        "createdAt", announce.getCreatedAt(),
                        "updatedAt", announce.getUpdatedAt()
                ));
                break;

            case "market":
                results = marketRepository.findAll(
                        CommunitySpecifications.searchByType(type, searchKeyword, category),
                        pageable
                ).map(market -> Map.of(
                        "mno", market.getMno(),  // 상품게시번호
                        "title", market.getTitle(),  // 제목
                        "content", market.getContent(),  // 내용
                        "createdAt", market.getCreatedAt(),  // 작성일
                        "updatedAt", market.getUpdatedAt(),  // 수정일
                        "price", market.getPrice(),  // 가격
                        "thumbnailUrl", market.getThumbnailUrl(),  // 썸네일 이미지 URL
                        "imageUrls", market.getImageUrls(),  // 이미지 URL 리스트
                        "userName", market.getUser().getUserName()  // 작성자 이름
                ));
                break;

            default:
                throw new IllegalArgumentException("Invalid category: " + category);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("dtoList", results.getContent());
        response.put("totalCount", results.getTotalElements());
        response.put("totalPage", results.getTotalPages());
        response.put("pageNumList", IntStream.rangeClosed(1, results.getTotalPages())
                .boxed().collect(Collectors.toList()));
        response.put("prev", results.hasPrevious());
        response.put("next", results.hasNext());
        response.put("current", results.getNumber() + 1);

        return response;
    }
}