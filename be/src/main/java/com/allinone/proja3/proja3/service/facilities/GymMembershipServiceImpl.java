package com.allinone.proja3.proja3.service.facilities;


import com.allinone.proja3.proja3.dto.mileage.MileageDTO;
import com.allinone.proja3.proja3.service.mileage.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
@RequiredArgsConstructor
public class GymMembershipServiceImpl implements GymMembershipService{
    @Autowired
    private PaymentService paymentService;

    @Override
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
