package com.allinone.proja3.proja3.dto.facilities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MembershipPlanDTO {
    private Long membershipPlanId;
    private String membershipType; // 예: 1개월권, 6개월권, 1년권
    private int price; // 가격
    private int durationMonths; // 기간(개월)
}
