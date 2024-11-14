package com.allinone.proja3.proja3.dto.facilities;

import com.allinone.proja3.proja3.model.facilities.MembershipType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GymMembershipDTO {
    private Long membershipId;

    // User 정보
    private Long uno;
    private String dong;
    private String ho;


    private Long mileageId; // Mileage 정보는 mileageId로만 전달
    private MembershipType membershipType;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate dayPassDate;
//    private boolean isOnHold; // 홀딩 상태
//    private long remainingDaysBeforeHold;

}
