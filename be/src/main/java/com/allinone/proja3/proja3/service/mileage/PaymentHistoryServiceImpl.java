package com.allinone.proja3.proja3.service.mileage;

import com.allinone.proja3.proja3.dto.mileage.PaymentHistoryDTO;
import com.allinone.proja3.proja3.model.mileage.PaymentHistory;
import com.allinone.proja3.proja3.repository.mileage.PaymentHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Log4j2
@Service
public class PaymentHistoryServiceImpl implements PaymentHistoryService {

    private final PaymentHistoryRepository paymentHistoryRepository;
    private final MileageService mileageService;
    private final MileagehistoryService mileagehistoryService;
    private final CardInfoService cardInfoService;


    private PaymentHistory getEntity(PaymentHistoryDTO dto){
        PaymentHistory entity = PaymentHistory.builder()
                .paymentId(dto.getPaymentId())
                .uno(dto.getUno())
                .price(dto.getPrice())
                .dong(dto.getDong())
                .ho(dto.getHo())
                .cardId(dto.getCardId())

                .build();
        return entity;
    }

    private PaymentHistoryDTO getDto(PaymentHistory entity){
        PaymentHistoryDTO dto = PaymentHistoryDTO.builder()
                .paymentId(entity.getPaymentId())
                .price(entity.getPrice())
                .uno(entity.getUno())
                .dong(entity.getDong())
                .ho(entity.getHo())
                .timestamp(entity.getTimestamp())
                .build();
        return dto;
    }

    @Override
    public List<PaymentHistoryDTO> getAllPaymentHistory(int dong, int ho) {
        return paymentHistoryRepository.findByDongAndHo(dong, ho).stream()
                .map(this::getDto)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentHistory savePaymentHistoryDTO(PaymentHistoryDTO dto) {
        PaymentHistory entity = getEntity(dto);
        return paymentHistoryRepository.save(entity);
    }

    @Override
    public PaymentHistory savePaymentHistoryEntity(PaymentHistory entity) {
        return paymentHistoryRepository.save(entity);
    }

    @Override
    public void deletePaymentHistory(PaymentHistoryDTO dto) {
        paymentHistoryRepository.delete(getEntity(dto));
    }





}
