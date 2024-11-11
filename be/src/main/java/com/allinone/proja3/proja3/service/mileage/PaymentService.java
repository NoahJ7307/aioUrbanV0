package com.allinone.proja3.proja3.service.mileage;

import com.allinone.proja3.proja3.dto.mileage.CardInfoDTO;
import com.allinone.proja3.proja3.dto.mileage.ManualRequestDTO;
import com.allinone.proja3.proja3.dto.mileage.MileageDTO;
import com.allinone.proja3.proja3.model.mileage.CardInfo;

public interface PaymentService {
    MileageDTO processManualPayment(ManualRequestDTO dto);
}
