package com.allinone.proja3.proja3.service.community;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.community.MarketDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.community.Market;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.repository.community.CommunityChatRepository;
import com.allinone.proja3.proja3.repository.community.CommunityMarketRepository;
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

import java.io.File;
import java.io.IOException;


import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MarketServiceImpl implements MarketService {
    @PersistenceContext
    private EntityManager entityManager;
    private final CommunityMarketRepository repository;
    private final UserRepository userRepository; // UserRepository 주입
    private final String uploadDir = "upload"; // 이미지가 저장될 디렉토리 경로 설정
    private final CommunityChatRepository chatRepository;


// 게시물 조회를 위한 마켓 데이터 조회후, 페이지 반환 .
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
//게시물 생성 . 게시물 생성을 위해  savefile을 이용하여 이미지와 섬네일 저장후 유저데이터 저장.
    @Override
    public Market createPost(User user, Market market, MultipartFile thumbnail, List<MultipartFile> images) throws IOException {
        if (thumbnail != null && !thumbnail.isEmpty()) {
            String savedThumbnailName = saveFile(thumbnail); // 파일 이름만 반환
            String thumbnailUrl = "/upload/" + savedThumbnailName; // HTTP URL 생성
            market.setThumbnailUrl(thumbnailUrl);
        }
        // 이미지 리스트 처리
        if (images != null && !images.isEmpty()) {
            List<String> imageUrls = images.stream()
                    .map(image -> {
                        try {
                            String savedImageName = saveFile(image); // 파일 이름만 반환
                            return "/upload/" + savedImageName; // HTTP URL 생성
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

        // 디렉토리가 없는 경우 자동으로 생성
        Files.createDirectories(filePath.getParent());

        Files.copy(file.getInputStream(), filePath);      // 파일 저장
        System.out.println("File saved to: " + filePath.toString());
        return fileName; // 파일 이름만 반환
    }

// 엔터티에 있는 내용을 dto로 반환
    @Override
    public MarketDTO entityDto(Market market) {
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
    public MarketDTO findByMno(Long mno) {
        Market market = repository.findById(mno)
                .orElseThrow(() -> new IllegalArgumentException("Invalid market ID: " + mno));
        return entityDto(market);
    }


    @Override
    public void deletePost(Long mno, Long uno) {
        // 게시글 찾기
        Market market = repository.findById(mno)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다: " + mno));

        // 작성자 검증
        if (!market.getUser().getUno().equals(uno)) {
            throw new SecurityException("본인만 게시글을 삭제할 수 있습니다.");
        }
        // 외래 키 무시 설정
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 0").executeUpdate();
        // 썸네일 삭제
        deleteFile(market.getThumbnailUrl());
        // 모든 이미지 파일 삭제
        market.getImageUrls().forEach(this::deleteFile);
        // 게시글 삭제
        repository.delete(market);
        // 외래 키 복원
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 1").executeUpdate();
    }



    @Override
    public void deletePostByAdmin(Long mno) {
        // 게시글 찾기
        Market market = repository.findById(mno)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다: " + mno));

        // 외래 키 무시 설정
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 0").executeUpdate();

        // 썸네일 삭제
        deleteFile(market.getThumbnailUrl());

        // 모든 이미지 파일 삭제
        market.getImageUrls().forEach(this::deleteFile);

        // 게시글 삭제
        repository.delete(market);

        // 외래 키 복원
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 1").executeUpdate();
    }


    // 파일 삭제 메서드
    private void deleteFile(String filePath) {
        if (filePath != null && !filePath.isEmpty()) {
            // 상대 경로를 절대 경로로 변환
            String fullFilePath = System.getProperty("user.dir")  + filePath;  // 예: "/upload/파일명" -> 프로젝트 디렉토리 절대 경로
            File file = new File(fullFilePath);
            if (file.exists()) {
                if (!file.delete()) {
                    System.err.println("파일 삭제 실패:1not" + fullFilePath);
                } else {
                    System.out.println("파일 삭제 성공: 2ok" + fullFilePath);
                }
            } else {
                System.err.println("파일이 존재하지 않음: 3null" + fullFilePath);
            }
        }
    }


    @Override
    public boolean modify(MarketDTO marketDTO, MultipartFile thumbnail, List<MultipartFile> images) {
        Market market = findMarketById(marketDTO.getMno());

        if (thumbnail != null && !thumbnail.isEmpty()) {
            deleteFile(market.getThumbnailUrl());
            try {
                String thumbnailPath = saveThumbnail(thumbnail);
                market.setThumbnailUrl(thumbnailPath);
            } catch (IOException e) {
                System.err.println("썸네일 저장 중 오류 발생: " + e.getMessage());
                return false;
            }
        }

        if (images != null && !images.isEmpty()) {
            market.getImageUrls().forEach(this::deleteFile);
            List<String> imagePaths;
            try {
                imagePaths = saveImages(images);
                market.setImageUrls(imagePaths);
            } catch (IOException e) {
                System.err.println("이미지 저장 중 오류 발생: " + e.getMessage());
                return false;
            }
        }

        market.setTitle(marketDTO.getTitle());
        market.setContent(marketDTO.getContent());
        market.setPrice(marketDTO.getPrice());
        repository.save(market);
        return true;
    }

    private String saveThumbnail(MultipartFile thumbnail) throws IOException {
        String thumbnailFileName = UUID.randomUUID() + "_" + thumbnail.getOriginalFilename();
        Path thumbnailPath = Paths.get(uploadDir + "/thumbnails", thumbnailFileName);
        Files.createDirectories(thumbnailPath.getParent());
        Files.copy(thumbnail.getInputStream(), thumbnailPath);
        return "/upload/thumbnails/" + thumbnailFileName;
    }

    private List<String> saveImages(List<MultipartFile> images) throws IOException {
        List<String> imagePaths = new ArrayList<>();

        for (MultipartFile image : images) {
            String imageFileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path imagePath = Paths.get(uploadDir + "/images", imageFileName);

            // 디렉토리가 없는 경우 자동으로 생성
            Files.createDirectories(imagePath.getParent());

            Files.copy(image.getInputStream(), imagePath);
            imagePaths.add("/upload/images/" + imageFileName);
        }

        return imagePaths;
    }

    @Override
    public Market findMarketById(Long mno) {
        return repository.findById(mno)
                .orElseThrow(() -> new IllegalArgumentException("Market not found for mno12: " + mno));
    }

    @Override
    public List<MarketDTO> findDataByUno(Long uno) {
        User user = userRepository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found123"));
        List<Market> marketList = repository.findByUser(user);
        return marketList.stream()
                .map(this::entityDto)
                .collect(Collectors.toList());
    }

    @Override
    public User findByUno(Long uno) {
        return userRepository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID:1234 " + uno));
    }
}
