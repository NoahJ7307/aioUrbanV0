package com.allinone.proja3.proja3.model.facilities;

import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.mileage.Mileage;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

import static com.allinone.proja3.proja3.model.facilities.QGymMembership.gymMembership;

@Entity
@Table(name = "tbl_gym_membership")
@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class GymMembership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long membershipId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uno" , referencedColumnName = "uno") // 회원과 연관
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="mileageId" , referencedColumnName ="mileageId") // 마일리지와 연관
    private Mileage mileage;

    private MembershipType membershipType;
    private LocalDate startDate;
    private LocalDate endDate;

//    @Column(nullable = true)
//    private LocalDate dayPassDate;

    private boolean isOnHold = false; // 홀딩상태 관리하는 변수
//    private long remainingDaysBeforeHold = 0;



}
