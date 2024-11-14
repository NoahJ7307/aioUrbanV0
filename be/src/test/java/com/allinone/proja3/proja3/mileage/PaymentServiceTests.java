package com.allinone.proja3.proja3.mileage;

import com.allinone.proja3.proja3.dto.mileage.CardInfoDTO;
import com.allinone.proja3.proja3.dto.mileage.ManualRequestDTO;
import com.allinone.proja3.proja3.dto.mileage.MileageDTO;
import com.allinone.proja3.proja3.dto.mileage.MileageHistoryDTO;
import com.allinone.proja3.proja3.dto.user.UserDTO;
import com.allinone.proja3.proja3.model.mileage.CardInfo;
import com.allinone.proja3.proja3.model.mileage.Mileage;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.service.UserService;
import com.allinone.proja3.proja3.service.mileage.CardInfoService;
import com.allinone.proja3.proja3.service.mileage.MileageService;
import com.allinone.proja3.proja3.service.mileage.PaymentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@SpringBootTest
public class PaymentServiceTests {
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private MileageService mileageService;
    @Autowired
    private CardInfoService cardInfoService;
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void insertUserAndCard(){
        UserDTO userDTO = UserDTO.builder()
                .userName("MileageRegularTest")
                .phone("user100")
                .pw(passwordEncoder.encode("1"))
                .dong("100")
                .ho("100")
                .build();
        Long uno = userService.register(userDTO);
        CardInfoDTO cardInfoDTO = CardInfoDTO.builder()
                .cardExpiry("123")
                .encryptedCardNumber("1234123412341234")
                .uno(uno)
                .build();
        cardInfoService.saveCardInfo(cardInfoDTO);
        Long cardId = cardInfoService.findByUno(uno).getCardId();
        int amount = 5000;
    }

    @Test
    public void processUseMileage(){
        int amount = 5000;
        CardInfoDTO cardInfoDTO = CardInfoDTO.builder()
                .cardExpiry("123")
                .encryptedCardNumber("1234123412341234")
                .uno(81L)
                .build();
        Mileage mileage = Mileage.builder()
                .autopay(false)
                .dong("100")
                .ho("100")
                .price(50000)
                .build();
        ManualRequestDTO manualRequestDTO = ManualRequestDTO.builder()
                .card(cardInfoDTO)
                .mileage(mileageService.getDTO(mileage))
                .paymentAmount(amount*2)
                .build();
        paymentService.processManualPayment(manualRequestDTO);
        MileageHistoryDTO mileageHistoryDTO = MileageHistoryDTO.builder()
                .uno(81L)
                .timestamp(LocalDateTime.now())
                .amount(1000)
                .description("TEST")
                .build();
        paymentService.processUseMileage(mileageService.getDTO(mileage), 81L, amount, mileageHistoryDTO.getDescription());
    }
}
