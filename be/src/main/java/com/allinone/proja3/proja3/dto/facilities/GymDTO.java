package com.allinone.proja3.proja3.dto.facilities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GymDTO {
    private Long reservationId;
    private String userName;
    private LocalDate date;
    private String membershipType;
    private boolean delFlag;


}
