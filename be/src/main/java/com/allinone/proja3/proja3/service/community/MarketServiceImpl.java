package com.allinone.proja3.proja3.service.community;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.community.MarketDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.community.Market;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.repository.community.CommunityMarketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MarketServiceImpl implements MarketService {
    private final CommunityMarketRepository repository;
    private final UserRepository userRepository; // UserRepository 주입
    private final String uploadDir = "C:/last/be/upload"; // 이미지가 저장될 디렉토리 경로 설정

    @Override
    public PageResponseDTO<MarketDTO> findAllmarket(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), Sort.by("mno").descending());
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

    // createPost 메서드 수정: 여러 개의 이미지 파일을 처리
    @Override
    public Market createPost(User user, Market market, MultipartFile thumbnail, List<MultipartFile> images) throws IOException {
        if (thumbnail != null && !thumbnail.isEmpty()) {
            String savedThumbnailName = saveFile(thumbnail); // 파일 이름만 반환
            String thumbnailUrl = "/uploads/" + savedThumbnailName; // HTTP URL 생성
            market.setThumbnailUrl(thumbnailUrl);
        }

        // 이미지 리스트 처리
        if (images != null && !images.isEmpty()) {
            List<String> imageUrls = images.stream()
                    .map(image -> {
                        try {
                            String savedImageName = saveFile(image); // 파일 이름만 반환
                            return "/uploads/" + savedImageName; // HTTP URL 생성
                        } catch (IOException e) {
                            e.printStackTrace(); // 예외 처리
                            return null; // 예외 발생 시 null 반환
                        }
                    })
                    .filter(url -> url != null) // null 값 필터링
                    .collect(Collectors.toList());

            market.setImageUrls(imageUrls); // 이미지 URL 리스트 설정
        }

        market.setUser(user);
        return repository.save(market); // DB에 Market 엔티티 저장
    }

    private String saveFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);  // 실제 저장 경로 설정
        Files.copy(file.getInputStream(), filePath);      // 파일 저장
        System.out.println("File saved to: " + filePath.toString()); // 로그 추가
        return fileName; // 파일 이름만 반환
    }

    @Override
    public MarketDTO entityDto(Market market) {
        System.out.println("Entity DTO: " + market); // 디버깅을 위한 로그 추가
        return MarketDTO.builder()
                .mno(market.getMno())
                .title(market.getTitle())
                .content(market.getContent())
                .price(market.getPrice())
                .imageUrls(market.getImageUrls()) // 수정된 부분
                .thumbnailUrl(market.getThumbnailUrl())
                .createdAt(market.getCreatedAt())
                .updatedAt(market.getUpdatedAt())
                .userId(market.getUser().getUno())
                .userName(market.getUser().getUserName())
                .build();
    }

    @Override
    public MarketDTO getMno(Long mno, User user) {
        Market market = repository.findById(mno).orElseThrow(() -> new IllegalArgumentException("읽었다" + mno));
        return new MarketDTO(market.getMno(), market.getTitle(), market.getContent(), market.getImageUrls(), market.getThumbnailUrl(), market.getPrice());
    }

    @Override
    public void deletePost(Long mno, Long uno) {
        Optional<Market> marketToDelete = repository.findById(mno);

        if (marketToDelete.isPresent()) {
            Market market = marketToDelete.get();
            if (market.getUser().getUno().equals(uno)) {
                // 파일 삭제 처리
                deleteFile(market.getThumbnailUrl());
                market.getImageUrls().forEach(this::deleteFile); // 모든 이미지 파일 삭제

                repository.delete(market);
            } else {
                throw new SecurityException("삭제 권한이 없습니다.");
            }
        } else {
            throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
        }
    }
    @Override
    public MarketDTO findByMno(Long mno) {
        // Mno로 Market 객체를 조회
        Market market = repository.findById(mno)
                .orElseThrow(() -> new IllegalArgumentException("Invalid market ID: " + mno));

        // Market 객체를 MarketDTO로 변환 후 반환
        return entityDto(market); // entityDto 메서드는 Market 객체를 DTO로 변환하는 메서드
    }
    // 파일 삭제 메서드
    private void deleteFile(String fileUrl) {
        if (fileUrl != null && !fileUrl.isEmpty()) {
            String filePath = fileUrl.replace("/uploads/", "C:/last/be/upload/");
            try {
                Files.deleteIfExists(Paths.get(filePath));
            } catch (IOException e) {
                System.err.println("파일 삭제 실패: " + filePath);
                e.printStackTrace();
            }
        }
    }

    @Override
    public boolean modify(MarketDTO marketDTO, MultipartFile thumbnail, List<MultipartFile> images) {
        Market market = findMarketById(marketDTO.getMno());

        // 썸네일 처리
        if (thumbnail != null && !thumbnail.isEmpty()) {
            // 기존 썸네일 삭제 로직
            deleteFile(market.getThumbnailUrl());

            try {
                String thumbnailPath = saveThumbnail(thumbnail); // 썸네일 저장 메서드 호출
                market.setThumbnailUrl(thumbnailPath); // 썸네일 URL 업데이트
            } catch (IOException e) {
                System.err.println("썸네일 저장 중 오류 발생: " + e.getMessage());
                return false; // 썸네일 저장 실패
            }
        }

        // 이미지 처리
        if (images != null && !images.isEmpty()) {
            // 기존 이미지 삭제 로직
            market.getImageUrls().forEach(this::deleteFile); // 기존 이미지 삭제
            List<String> imagePaths;
            try {
                imagePaths = saveImages(images); // 이미지 저장 메서드 호출
                market.setImageUrls(imagePaths); // 이미지 URL 리스트 업데이트
            } catch (IOException e) {
                System.err.println("이미지 저장 중 오류 발생: " + e.getMessage());
                return false; // 이미지 저장 실패
            }
        }

        // Market 엔티티에 값 설정
        market.setTitle(marketDTO.getTitle());
        market.setContent(marketDTO.getContent());
        market.setPrice(marketDTO.getPrice());

        // DB에 저장
        repository.save(market);
        return true; // 성공적으로 수정된 경우
    }

    private String saveThumbnail(MultipartFile thumbnail) throws IOException {
        String thumbnailFileName = UUID.randomUUID() + "_" + thumbnail.getOriginalFilename();
        Path thumbnailPath = Paths.get(uploadDir + "/thumbnails", thumbnailFileName);
        Files.createDirectories(thumbnailPath.getParent());

        Files.copy(thumbnail.getInputStream(), thumbnailPath);

        return "/uploads/thumbnails/" + thumbnailFileName;
    }

    private List<String> saveImages(List<MultipartFile> images) throws IOException {
        List<String> imagePaths = new ArrayList<>();

        for (MultipartFile image : images) {
            // 파일 이름 생성
            String imageFileName = UUID.randomUUID() + "_" + image.getOriginalFilename();

            // 저장할 경로 생성
            Path imagePath = Paths.get(uploadDir + "/images", imageFileName);

            // 디렉토리 생성
            Files.createDirectories(imagePath.getParent());

            // 파일 저장
            Files.copy(image.getInputStream(), imagePath);

            // 저장된 경로 추가
            imagePaths.add("/uploads/images/" + imageFileName);
        }

        // 저장된 이미지 경로 리스트 반환
        return imagePaths;
    }

    @Override
    public Market findMarketById(Long mno) {
        return repository.findById(mno)
                .orElseThrow(() -> new IllegalArgumentException("Market not found for mno: " + mno));
    }


    @Override
    public List<MarketDTO> findDataByUno(Long uno) {
        User user = userRepository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<Market> marketList = repository.findByUser(user); // User 객체로 검색
        return marketList.stream()
                .map(this::entityDto)
                .collect(Collectors.toList());
    }
    @Override
    public User findByUno(Long uno) {
        return userRepository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + uno));
    }

}
