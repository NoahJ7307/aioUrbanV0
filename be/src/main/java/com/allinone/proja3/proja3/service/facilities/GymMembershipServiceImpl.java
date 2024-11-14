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

    @Transactional
    public void purchaseDailyMembership(Long uno, String dong, String ho, int amount){
        //1.ak
    }

}
