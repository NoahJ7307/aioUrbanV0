package com.allinone.proja3.proja3.service.community;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.community.MarketDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.community.Market;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.repository.community.CommunityChatRepository;
import com.allinone.proja3.proja3.repository.community.CommunityMarketRepository;
import com.allinone.proja3.proja3.util.CustomFileUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MarketServiceImpl implements MarketService {
    @PersistenceContext
    private EntityManager entityManager;
    private final CommunityMarketRepository repository;
    private final UserRepository userRepository;
    private final CustomFileUtil fileUtil;


    // ================= 조회 관련 메서드 =================//

    @Override
    public PageResponseDTO<MarketDTO> findAllmarket(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("mno").descending());

        Page<Market> result = repository.findAll(pageable);
        List<MarketDTO> dtoList = result.getContent().stream()
                .map(this::entityDto)
                .collect(Collectors.toList());

        return PageResponseDTO.<MarketDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();
    }

    @Override
    public MarketDTO findByMno(Long mno) {
        Market market = repository.findById(mno)
                .orElseThrow(() -> new IllegalArgumentException("Invalid market ID: " + mno));
        return entityDto(market);
    }

    @Override
    public List<MarketDTO> findDataByUno(Long uno) {
        User user = userRepository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<Market> marketList = repository.findByUser(user);
        return marketList.stream()
                .map(this::entityDto)
                .collect(Collectors.toList());
    }

    @Override
    public Market findMarketById(Long mno) {
        return repository.findById(mno)
                .orElseThrow(() -> new IllegalArgumentException("Market not found for mno: " + mno));
    }

    @Override
    public User findByUno(Long uno) {
        return userRepository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + uno));
    }

    // ================= 등록 관련 메서드 =================//

    @Override
    public Market createPost(User user, Market market, MultipartFile thumbnail, List<MultipartFile> images)
            throws IOException {
        // 썸네일 처리
        if (thumbnail != null && !thumbnail.isEmpty()) {
            String thumbnailUrl = fileUtil.saveThumbnail(thumbnail);
            market.setThumbnailUrl(thumbnailUrl);
        }

        // 이미지 리스트 처리
        if (images != null && !images.isEmpty()) {
            List<String> imageUrls = fileUtil.saveImages(images);
            market.setImageUrls(imageUrls);
        }

        market.setUser(user);
        return repository.save(market);
    }

    // ================= 수정 관련 메서드 =================//

    @Override
    public boolean modify(MarketDTO marketDTO, MultipartFile thumbnail, List<MultipartFile> images) {
        try {
            Market market = findMarketById(marketDTO.getMno());

            // 썸네일 수정
            if (thumbnail != null && !thumbnail.isEmpty()) {
                fileUtil.removeFile(market.getThumbnailUrl());
                String thumbnailUrl = fileUtil.saveThumbnail(thumbnail);
                market.setThumbnailUrl(thumbnailUrl);
            }

            // 이미지 수정
            if (images != null && !images.isEmpty()) {
                market.getImageUrls().forEach(fileUtil::removeFile);
                List<String> imageUrls = fileUtil.saveImages(images);
                market.setImageUrls(imageUrls);
            }

            market.setTitle(marketDTO.getTitle());
            market.setContent(marketDTO.getContent());
            market.setPrice(marketDTO.getPrice());
            repository.save(market);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // ================= 삭제 관련 메서드 =================//

    @Override
    public void deletePost(Long mno, Long uno) {
        Market market = repository.findById(mno)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다: " + mno));

        if (!market.getUser().getUno().equals(uno)) {
            throw new SecurityException("본인만 게시글을 삭제할 수 있습니다.");
        }

        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 0").executeUpdate();

        // 모든 관련 파일 삭제
        fileUtil.removeAllFiles(market.getThumbnailUrl(), market.getImageUrls());

        repository.delete(market);
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 1").executeUpdate();
    }

    @Override
    public void deletePostByAdmin(Long mno) {
        Market market = repository.findById(mno)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다: " + mno));

        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 0").executeUpdate();

        // 파일 삭제
        fileUtil.removeAllFiles(market.getThumbnailUrl(), market.getImageUrls());
        market.getImageUrls().forEach(fileUtil::removeFile);

        repository.delete(market);
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 1").executeUpdate();
    }

    // ================= 유틸리티 메서드 =================//

    @Override
    public MarketDTO entityDto(Market market) {
        return MarketDTO.builder()
                .mno(market.getMno())
                .title(market.getTitle())
                .content(market.getContent())
                .price(market.getPrice())
                .imageUrls(market.getImageUrls())
                .thumbnailUrl(market.getThumbnailUrl())
                .createdAt(market.getCreatedAt())
                .updatedAt(market.getUpdatedAt())
                .userId(market.getUser().getUno())
                .userName(market.getUser().getUserName())
                .build();
    }
}