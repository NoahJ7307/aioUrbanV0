package com.allinone.proja3.proja3.model.community;

import com.allinone.proja3.proja3.model.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tbl_market")
@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Market {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long mno; // 상품게시번호
    private String title; // 제목
    private String content; // 내용
    private int price; // 가격

    @Column(name = "thumbnail_url") // 썸네일 이미지 URL
    private String thumbnailUrl;

    @ElementCollection // 여러 이미지를 위한 리스트
    @CollectionTable(name = "tbl_market_images", joinColumns = @JoinColumn(name = "mno"))
    @Column(name = "image_url") // 전체 이미지 URL
    private List<String> imageUrls; // 이미지 URL 리스트

    @CreationTimestamp
    private LocalDateTime createdAt; // 작성일

    @UpdateTimestamp
    private LocalDateTime updatedAt; // 수정일

    @ManyToOne // User와의 관계
    @JoinColumn(name = "uno", referencedColumnName = "uno", nullable = false) // Community 테이블의 uno 외래 키 설정
    private User user; // 작성자 (User 엔티티의 uno)

    @PrePersist
    public void prePersist() {
        System.out.println("CreatedAt: " + createdAt);  // 엔티티가 생성될 때 로그 출력
    }

    @PreUpdate
    public void preUpdate() {
        System.out.println("UpdatedAt: " + updatedAt);  // 엔티티가 수정될 때 로그 출력
    }

}
