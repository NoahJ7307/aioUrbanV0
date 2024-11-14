package com.allinone.proja3.proja3.controller.facilities;

import com.allinone.proja3.proja3.dto.mileage.MileageDTO;
import com.allinone.proja3.proja3.service.facilities.GymMembershipService;
import com.allinone.proja3.proja3.service.mileage.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Log4j2
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") //host 3000으로변경 1025
@RequestMapping("/api/facilities/gym")
public class GymMembershipController {


}


