package com.allinone.proja3.proja3.controller.facilities;

import com.allinone.proja3.proja3.dto.facilities.GymMembershipDTO;
import com.allinone.proja3.proja3.dto.mileage.MileageDTO;
import com.allinone.proja3.proja3.model.facilities.MembershipType;
import com.allinone.proja3.proja3.service.facilities.GymMembershipService;
import com.allinone.proja3.proja3.service.mileage.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.text.Style;
import java.util.HashMap;
import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") //host 3000으로변경 1025
@RequestMapping("/api/facilities/gym/signup")
public class GymMembershipController {

    @Autowired
    private GymMembershipService gymMembershipService;

    @Autowired
    private PaymentService paymentService;

    //1: MembershipType.ONE_MONTH ,0
    @GetMapping("/one")
    public ResponseEntity<String> processMembershipPurchase(Long membershipType, Long uno) {
        try {
            gymMembershipService.purchaseMembership(membershipType, uno, "yourDongValue", "yourHoValue");
            return ResponseEntity.ok("Membership purchase processed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
