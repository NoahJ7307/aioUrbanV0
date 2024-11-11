package com.allinone.proja3.proja3.controller.mileage;


import com.allinone.proja3.proja3.dto.mileage.ManualRequestDTO;
import com.allinone.proja3.proja3.dto.mileage.MileageDTO;
import com.allinone.proja3.proja3.model.mileage.Mileage;
import com.allinone.proja3.proja3.service.mileage.MileageService;
import com.allinone.proja3.proja3.service.mileage.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RequiredArgsConstructor
@RestController
@RequestMapping("/mileage")
public class MileageController {

    private final MileageService mileageService;
    private final PaymentService paymentService;

    @GetMapping("/getmileage")
    public ResponseEntity<?> getMileage(@RequestParam("dong") int dong , @RequestParam("ho") int ho) {

        MileageDTO dto = mileageService.findByDongHoDTO(dong, ho);

        log.info(dto);

    return ResponseEntity.ok(dto);
    }

    @PostMapping("/manualPayment")
    public ResponseEntity<?> manualPayment(@RequestBody ManualRequestDTO dto) {
    log.info(dto.getMileage());
    log.info(dto.getCard());
    log.info(dto.getPaymentAmount());
        try {
            MileageDTO mileageDTO = paymentService.processManualPayment(dto);
            return ResponseEntity.ok(mileageDTO);
        }catch (Exception e) {
            log.error(e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }




}
