package com.allinone.proja3.proja3.service.facilities;


import com.allinone.proja3.proja3.dto.facilities.GymMembershipDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.facilities.GymMembership;

import com.allinone.proja3.proja3.model.facilities.MembershipPlan;
import com.allinone.proja3.proja3.model.mileage.Mileage;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.repository.facilities.GymMembershipRepository;

import com.allinone.proja3.proja3.repository.facilities.MembershipPlanRepository;
import com.allinone.proja3.proja3.repository.mileage.MileageRepository;
import com.allinone.proja3.proja3.service.mileage.PaymentService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Member;
import java.time.LocalDate;
import java.util.List;

@Service
@Log4j2
public class GymMembershipServiceImpl implements GymMembershipService {

    @Autowired
    private GymMembershipRepository gymMembershipRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MileageRepository mileageRepository;
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private MembershipPlanRepository membershipPlanRepository;


    @Override
    // (회원들이 그 등록된 이용권을 **구매(결제)**하는 로직)
    public GymMembership createMembership(GymMembershipDTO gymMembershipDTO) {
        // DTO를 엔티티로 변환
        GymMembership gymMembership = toEntity(gymMembershipDTO);

        // 엔티티 저장
        gymMembership = gymMembershipRepository.save(gymMembership);

        // 결제 처리
        User user = gymMembership.getUser();
        MembershipPlan membershipPlan = gymMembership.getMembershipPlan();
        paymentService.processUseMileage(user.getDong(), user.getHo(), gymMembershipDTO.getUno(), membershipPlan.getPrice(), "헬스장 일일이용권이 결제되었습니다.");
        return gymMembership;
    }

    @Override
    public GymMembership toEntity(GymMembershipDTO gymMembershipDTO) {
        // DTO에서 User와 Mileage를 가져오는 로직을 구현
        User user = userRepository.findById(gymMembershipDTO.getUno())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Mileage mileage = mileageRepository.findById(gymMembershipDTO.getMileageId())
                .orElseThrow(() -> new RuntimeException("Mileage not found"));
        MembershipPlan membershipPlan = membershipPlanRepository.findById(gymMembershipDTO.getMembershipPlanId())
                .orElseThrow(() -> new RuntimeException("Membership Plan not found"));

        // GymMembership 엔티티 생성
        GymMembership gymMembership = new GymMembership();
        gymMembership.setUser(user);
        gymMembership.setMileage(mileage);
        gymMembership.setMembershipPlan(membershipPlan);
        gymMembership.setStartDate(gymMembershipDTO.getStartDate());
        gymMembership.setEndDate(gymMembershipDTO.getEndDate());
        gymMembership.setOnHold(gymMembershipDTO.isOnHold());

        return gymMembership;
    }

    @Override
    public MembershipPlan createGymMembershipPlan (String membershipType, int durationMonths, int price) {
        //이용권 계획 생성
        MembershipPlan membershipPlan = MembershipPlan.builder()
                .membershipType(membershipType)
                .durationMonths(durationMonths)
                .price(price)
                .build();

        membershipPlanRepository.save(membershipPlan);

        return  membershipPlan;
    }


    @Override
    //( 관리자가 등록한 이용권을 사용자에게 연결해줌)
    public GymMembership createGymMembership(User user, Mileage mileage, MembershipPlan plan) {
        // 사용자가 이용권을 구매한 시점인 현재 날짜를 시작 날짜로 설정
        LocalDate startDate = LocalDate.now();

        // 이용권의 기간을 기준으로 종료 날짜를 계산 (관리자가 설정한 기간을 사용)
        LocalDate endDate = startDate.plusMonths(plan.getDurationMonths());

        GymMembership gymMembership = GymMembership.builder()
                .user(user)
                .mileage(mileage)
                .membershipPlan(plan) // 선택한 이용권 계획
                .startDate(startDate)
                .endDate(endDate)
                .build(); // GymMembership 객체 생성

        // 데이터베이스에 저장
        gymMembershipRepository.save(gymMembership);

        return gymMembership;
    }
    @Override
    public List<MembershipPlan> getAllMembershipPlans() {
        // 모든 이용권 목록을 가져와서 반환
        return membershipPlanRepository.findAll();
    }
}