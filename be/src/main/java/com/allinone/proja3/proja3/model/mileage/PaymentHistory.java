package com.allinone.proja3.proja3.model.mileage;

import com.allinone.proja3.proja3.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class PaymentHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;

//    @ManyToOne
//    @JoinColumn(name = "card_id",nullable = true)//
//    private CardInfo cardInfo; // 카드 정보와의 연관관계 설정
// 탈퇴후에도 이력을 남기기 위함.
    private Long cardId;

//    @ManyToOne
//    @JoinColumn(name = "uno" ,nullable = true)//
//    private User user; // 사용자와의 연관관계 설정
// 탈퇴후에도 이력을 남기기 위함.
    private Long uno; // 회원의 고유 ID를 직접 저장

    private int price;

    private LocalDateTime timestamp; // 결제 발생 시간
}
