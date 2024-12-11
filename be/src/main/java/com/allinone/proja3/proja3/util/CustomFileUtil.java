package com.allinone.proja3.proja3.util;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

// CustomFileUtil.java
@Component
public class CustomFileUtil {
    private final String uploadPath = "C:\\last\\be\\upload";

    // ================= 조회 관련 메서드 =================//

    /**
     * 파일 조회
     */
    public ResponseEntity<Resource> getFile(String fileName) {
        try {
            Path filePath = Paths.get(uploadPath).resolve(fileName);
            Resource resource = new FileSystemResource(filePath.toFile());

            if (!resource.exists()) {
                throw new RuntimeException("File not found: " + fileName);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", determineContentType(resource.getFile()));

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);
        } catch (Exception e) {
            throw new RuntimeException("Failed to load file: " + fileName, e);
        }
    }

    // ================= 저장 관련 메서드 =================//

    /**
     * 썸네일 저장
     */
    public String saveThumbnail(MultipartFile file) throws IOException {
        String savedName = saveFile(file, "thumbnails");
        return "/upload/thumbnails/" + savedName;
    }

    /**
     * 여러 이미지 저장
     */
    public List<String> saveImages(List<MultipartFile> files) throws IOException {
        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                String savedName = saveFile(file, "images");
                imageUrls.add("/upload/images/" + savedName);
            }
        }
        return imageUrls;
    }

    /**
     * 파일 저장 (내부 메서드)
     */
    private String saveFile(MultipartFile file, String directory) throws IOException {
        String originalName = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        String savedName = uuid + "_" + originalName;

        Path dirPath = Paths.get(uploadPath, directory);
        Files.createDirectories(dirPath);

        Path filePath = dirPath.resolve(savedName);
        Files.copy(file.getInputStream(), filePath);

        return savedName;
    }

    // ================= 삭제 관련 메서드 =================//

    /**
     * 파일 삭제 (썸네일 또는 이미지)
     */
    public boolean removeFile(String fileUrl) {
        if (fileUrl == null || fileUrl.isEmpty())
            return false;

        try {
            // URL에서 실제 파일 경로 추출
            String relativePath = fileUrl.substring(fileUrl.indexOf("/", 1) + 1);
            File file = new File(uploadPath + File.separator + relativePath);

            return file.exists() && file.delete();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 게시글 관련 모든 파일 삭제
     */
    public void removeAllFiles(String thumbnailUrl, List<String> imageUrls) {
        // 썸네일 삭제
        if (thumbnailUrl != null && !thumbnailUrl.isEmpty()) {
            removeFile(thumbnailUrl);
        }

        // 이미지들 삭제
        if (imageUrls != null && !imageUrls.isEmpty()) {
            imageUrls.forEach(this::removeFile);
        }
    }

    // ================= 유틸리티 메서드 =================//

    /**
     * Content-Type 결정
     */
    private String determineContentType(File file) throws IOException {
        String contentType = Files.probeContentType(file.toPath());
        return contentType == null ? "application/octet-stream" : contentType;
    }

    /**
     * 파일 검증
     */
    public boolean validateFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image");
    }

    /**
     * 파일 크기 검증
     */
    public boolean validateFileSize(MultipartFile file, long maxSize) {
        return file.getSize() <= maxSize;
    }
}