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
    public void purchaseMembership(Long membershipType, Long uno, String dong, String ho) {
        MileageDTO mileageDTO = new MileageDTO();
        mileageDTO.setDong(dong);
        mileageDTO.setHo(ho);

        int amount;
        String description;

        switch (membershipType.intValue()) {
            case 0:
                amount = 3000;
                description = "일일권";
                break;
            case 1:
                amount = 30000;
                description = "한달권";
                break;
            case 2:
                amount = 150000;
                description = "육개월권";
                break;
            case 3:
                amount = 200000;
                description = "일년권";
                break;
            default:
                throw new IllegalArgumentException("Invalid membership type");
        }

        paymentService.processUseMileage(dong,ho, uno, amount, description);
    }

}
