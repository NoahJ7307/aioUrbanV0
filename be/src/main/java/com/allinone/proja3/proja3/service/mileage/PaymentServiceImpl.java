package com.allinone.proja3.proja3.service.mileage;

import com.allinone.proja3.proja3.dto.mileage.CardInfoDTO;
import com.allinone.proja3.proja3.dto.mileage.ManualRequestDTO;
import com.allinone.proja3.proja3.dto.mileage.MileageDTO;
import com.allinone.proja3.proja3.model.mileage.*;
import com.allinone.proja3.proja3.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Log4j2
@Service
public class PaymentServiceImpl implements PaymentService {

    private final CardInfoService cardInfoService;
    private final MileageService mileageService;
    private final MileagehistoryService mileagehistoryService;
    private final PaymentHistoryService paymentHistoryService;
    private final UserService userService;

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

        // MileageHistory 내역 저장
        mileagehistoryService.savehistory(mileageEntity,savedCard.getUser().getUno(), requestDTO.getPaymentAmount(),
                "+","수동 결제로 인한 마일리지 충전: " + requestDTO.getPaymentAmount() + "원");
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
                //ex requiredAmount(1일 경우)
                // -> 1 + 9999 = 10000
                // -> 10000 / 10000 = 1
                // -> 1 * 10000 = 10000
                // -> topUpAmount = 10000

                //ex requiredAmount(10001일 경우)
                // ->  10001 + 9999 = 20000
                // -> 20000 / 10000 = 2
                // -> 2 * 10000 = 20000
                // -> topUpAmount = 20000

                //// Mileage 업데이트
                mileage = mileageService.duplicate(requestDTO, topUpAmount); //금액 충전 후 저장
                // MileageHistory 내역 저장
                mileagehistoryService.savehistory(mileage,userId, topUpAmount,
                        "+","자동결제 결제로 인한 마일리지 충전: " + topUpAmount + "원");
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


        //마일리지 사용 내역 : MileageHistory 내역 저장
        mileagehistoryService.savehistory(mileage,userId,amount,"-",description);

        return mileageService.getDTO(mileage);
    }

    //관리자 : 해당 동호수에 대한 state 값 변경 및 카드 삭제 : String으로 결과 전송
    @Transactional
    @Override
    public String deleteCardAndMileageStateFalse(String dong , String ho , Long uno){
        mileageService.deleteMileageActive(dong, ho);
        //추후 추가되면 좋을 메서드 : 동 호에 해당하는 유저 id를 가지고 오는 메서드
        //동 호에 해당하는 유저의 모든 카드정보를 삭제 시킬 수 있음.
         //List<Long> usersUno = userService.findDongHo(dong , ho );
        //for (Long unoId : userUno) {
        //String resultCard = cardInfoService.deleteCardByUserId(unoId);
        //log.info(resultCard);
        //}
        String resultCard = cardInfoService.deleteCardByUserId(uno);
        log.info(resultCard);
        return "mileage 비활성화 , Card 삭제 완료";
    }


}
