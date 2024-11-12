package com.allinone.proja3.proja3.service.mileage;

import com.allinone.proja3.proja3.dto.mileage.PaymentHistoryDTO;
import com.allinone.proja3.proja3.model.mileage.PaymentHistory;

import java.util.List;

public interface PaymentHistoryService {

    List<PaymentHistoryDTO> getAllPaymentHistory(String dong , String ho);

    PaymentHistory savePaymentHistoryDTO(PaymentHistoryDTO dto);

    PaymentHistory savePaymentHistoryEntity(PaymentHistory entity);

    void deletePaymentHistory(PaymentHistoryDTO dto);
}
