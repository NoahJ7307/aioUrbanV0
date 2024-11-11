package com.allinone.proja3.proja3.dto.mileage;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MileageHistoryDTO {
    private Long mileageId;
    private Long uno; // 사용자의 고유 ID
    private String type; // "+", "-"로 마일리지 증감 여부
    private int amount; // 변경된 마일리지 금액
    private String description;
    private LocalDateTime timestamp;
}
