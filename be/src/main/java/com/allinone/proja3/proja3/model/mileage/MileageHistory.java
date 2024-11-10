package com.allinone.proja3.proja3.model.mileage;
import com.allinone.proja3.proja3.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class MileageHistory {

    @EmbeddedId
    private MileageHistoryId id; // 복합 키로 사용

    @ManyToOne
    @JoinColumn(name = "mileageId", insertable = false, updatable = false)
    private Mileage mileage; // Mileage 테이블 참조

//    @ManyToOne
//    @JoinColumn(name = "uno", nullable = true) // 회원 삭제 시 `NULL` 설정 가능
//    private User user;
// 탈퇴후에도 이력을 남기기 위함.
    private Long uno; // 회원의 고유 ID를 직접 저장


    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private int amount;

    private String description;

    public boolean isAddition() {
        return "+".equals(type);
    }

    public boolean isDeduction() {
        return "-".equals(type);
    }
}
