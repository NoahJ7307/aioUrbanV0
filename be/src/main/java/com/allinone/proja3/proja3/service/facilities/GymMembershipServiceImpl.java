package com.allinone.proja3.proja3.service.facilities;

import com.allinone.proja3.proja3.dto.mileage.MileageDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.facilities.GymMembership;
import com.allinone.proja3.proja3.model.facilities.MembershipType;
import com.allinone.proja3.proja3.model.mileage.Mileage;
import com.allinone.proja3.proja3.repository.facilities.GymMembershipRepository;
import com.allinone.proja3.proja3.service.UserService;
import com.allinone.proja3.proja3.service.facilities.GymMembershipService;
import com.allinone.proja3.proja3.service.mileage.MileageService;
import com.allinone.proja3.proja3.service.mileage.MileagehistoryService;
import com.allinone.proja3.proja3.service.mileage.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Log4j2
public class GymMembershipServiceImpl implements GymMembershipService {
    private final GymMembershipRepository gymMembershipRepository;
    private final MileageService mileageService;
    private final PaymentService paymentService;
    private final MileagehistoryService mileagehistoryService;
    private final UserService userService;

    @Transactional
    public void purchaseDailyMembership(Long uno, String dong, String ho, int amount){
        //1.마일리지 조회
        Mileage mileage = mileageService.findByDongHoentity(dong, ho);
        //2.잔액 부족 시 처리
        if(mileage.getPrice()< amount) {
            throw new RuntimeException("잔액이 부족합니다. 충전이 필요합니다.");
        }
        //3. 마일리지 차감 및 저장
        mileage.setPrice(mileage.getPrice()-amount);
        mileageService.saveEntity(mileage);

        //4. 이용권 생성
        GymMembership gymMembership = GymMembership.builder()
//                .user.getUno()
                .membershipType(MembershipType.ONE_DAY)
                .startDate(LocalDate.now())
                .endDate(LocalDate.now())
                .isOnHold(false)
                .build();
        gymMembershipRepository.save(gymMembership);

        mileagehistoryService.savehistory(mileage, uno, amount, "-", "헬스장 일일 이용권 구매");
    }

}
