package com.allinone.proja3.proja3.dto.community;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MarketDTO {

    private Long mno; //상품게시번호
    private String title; // 상품명
    private String content;// 상품의 내용설명
    private String thumbnailUrl; // 썸네일 이미지
    private String imageUrl; //상품이미지
    private int price; // 가격

    private Long userId; // 사용자 ID
    private String userName; // 사용자 이름 추가

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isAdmin; // 관리자 권한 여부 (옵션)


    public MarketDTO(Long pno, String title, String content,String imageUrl,String thumbnailUrl,int price ) {
        this.mno = mno;
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.price = price;





    }

}
