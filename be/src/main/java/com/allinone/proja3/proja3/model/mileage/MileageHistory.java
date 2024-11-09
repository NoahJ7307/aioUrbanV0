package com.allinone.proja3.proja3.model.mileage;
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

    @Column(nullable = false)
    private String userName;

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
