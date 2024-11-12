package com.allinone.proja3.proja3.service.mileage;

import com.allinone.proja3.proja3.dto.mileage.CardInfoDTO;
import com.allinone.proja3.proja3.dto.mileage.ManualRequestDTO;
import com.allinone.proja3.proja3.dto.mileage.MileageDTO;
import com.allinone.proja3.proja3.model.mileage.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Log4j2
@Service
public class PaymentServiceImpl implements PaymentService {

    private final CardInfoService cardInfoService;
    private final MileageService mileageService;
    private final MileagehistoryService mileagehistoryService;
    private final PaymentHistoryService paymentHistoryService;

    //수동 결제 시스템
    @Transactional
    public MileageDTO processManualPayment(ManualRequestDTO requestDTO) {
        // CardInfo 저장
        CardInfo savedCard = cardInfoService.saveCardInfo(requestDTO.getCard());
        if (savedCard == null) {
            throw new RuntimeException("카드 정보 저장 실패");
        }
        log.info("Saved CardInfo : {}", savedCard);

        // Mileage 저장
        MileageDTO dto = requestDTO.getMileage();
        dto.setCardId(savedCard.getCardId());

        Mileage mileageEntity = mileageService.duplicate(dto, requestDTO.getPaymentAmount());

        log.info("Saved mileageEntity : {}", mileageEntity);

        if (mileageEntity == null) {
            throw new RuntimeException("마일리지 정보 처리 실패");
        }


        MileageHistoryId pk = MileageHistoryId.builder()
                .mileageId(mileageEntity.getMileageId())
                .timestamp(LocalDateTime.now())
                .build();
        log.info("Saved historyPk : {}", pk);
        // MileageHistory 저장
        MileageHistory mileageHistory = MileageHistory.builder()
                .id(pk)
                .mileage(mileageEntity)
                .uno(savedCard.getUser().getUno())
                .type("+")
                .amount(requestDTO.getPaymentAmount())
                .description("수동 결제로 인한 마일리지 충전: " + requestDTO.getPaymentAmount() + "원")
                .build();
        mileagehistoryService.saveMileageHistory(mileageHistory);

        // PaymentHistory 저장
        PaymentHistory pay = PaymentHistory.builder()
                .ho(mileageEntity.getHo())
                .dong(mileageEntity.getDong())
                .price(requestDTO.getPaymentAmount())
                .uno(savedCard.getUser().getUno())
                .cardId(savedCard.getCardId())
                .timestamp(LocalDateTime.now())
                .build();
        paymentHistoryService.savePaymentHistoryEntity(pay);
        dto = mileageService.findByDongHoDTO(dto.getDong(),dto.getHo());
        return dto;
    }

    //자동 결제 시스템
    @Transactional
    @Override
    public MileageDTO processRegisterAutoPay(ManualRequestDTO requestDTO){
        // CardInfo 저장
        CardInfo savedCard = cardInfoService.saveCardInfo(requestDTO.getCard());
        if (savedCard == null) {
            throw new RuntimeException("카드 정보 저장 실패");
        }
        log.info("Saved CardInfo : {}", savedCard);

        // Mileage 저장
        MileageDTO dto = requestDTO.getMileage();
        log.info("requestDTO.Mileage Mileage : {}", dto);

        dto.setCardId(savedCard.getCardId());

        Mileage mileageEntity = mileageService.autoState(dto, savedCard);

        log.info("Saved mileageEntity : {}", mileageEntity);


        if (mileageEntity == null) {
            throw new RuntimeException("마일리지 정보 처리 실패");
        }

        dto = mileageService.findByDongHoDTO(dto.getDong(),dto.getHo());
        return dto;
    }


}
