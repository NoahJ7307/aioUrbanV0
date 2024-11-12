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


    private MileageHistoryId makehistoryID(Mileage mileage) {
        return MileageHistoryId.builder()
                .mileageId(mileage.getMileageId())
                .timestamp(LocalDateTime.now())
                .build();
    }
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


        MileageHistoryId pk = makehistoryID(mileageEntity);
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

    //마일리지 사용 시스템
    @Override
    @Transactional
    public MileageDTO processUseMileage(MileageDTO requestDTO ,Long userId, int amount , String description ) {
        //마일리지 내역 조회
        Mileage mileage = mileageService.findByDongHoentity(requestDTO.getDong(),requestDTO.getHo());
        if (mileage == null) {
            log.error("결제 도중 마일리지가 없음 = 마일리지 부족과 같은 상태");
            throw new RuntimeException("마일리지가 없습니다.");
        }
        //마일리지 금액 조회
        // 잔액이 충분하지 않은 경우 (자동 충전 여부에 따라 처리 분기)
        if (mileage.getPrice() < amount) {
            if (!mileage.isAutopay()) {
                log.error("잔액 부족: 현재 잔액 = {}, 필요한 금액 = {}", mileage.getPrice(), amount);
                throw new RuntimeException("금액이 부족합니다.");
            } else {
                log.info("자동 충전 요망: 현재 잔액 = {}, 필요한 금액 = {}", mileage.getPrice(), amount);
                int requiredAmount = amount - mileage.getPrice(); // 부족한 금액 계산
                int topUpAmount = ((requiredAmount + 9999) / 10000) * 10000; // 10,000원 단위로 올림
                mileage = mileageService.duplicate(requestDTO, topUpAmount); //금액 충전 후 저장

                // PaymentHistory 저장
                PaymentHistory pay = PaymentHistory.builder()
                        .ho(mileage.getHo())
                        .dong(mileage.getDong())
                        .price(topUpAmount)
                        .uno(mileage.getCardInfo().getUser().getUno())
                        .cardId(mileage.getCardInfo().getCardId())
                        .timestamp(LocalDateTime.now())
                        .build();
                paymentHistoryService.savePaymentHistoryEntity(pay);
            }
        }

        //마일리지 차감
        mileage.setPrice(mileage.getPrice()-amount);
        //마일리지 저장
        mileage = mileageService.saveEntity(mileage);


        //마일리지 사용 내역
        MileageHistory history = MileageHistory.builder()
                .id(makehistoryID(mileage))
                .uno(userId)
                .amount(amount) // 차감이므로 음수로 기록
                .description(description)
                .mileage(mileage)
                .type("-")
                .build();
        mileagehistoryService.saveMileageHistory(history);

        return mileageService.getDTO(mileage);
    }


}
