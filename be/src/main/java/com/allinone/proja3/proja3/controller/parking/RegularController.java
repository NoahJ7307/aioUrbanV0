package com.allinone.proja3.proja3.controller.parking;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.parking.HouseholdDTO;
import com.allinone.proja3.proja3.dto.parking.RegularParkingDTO;
import com.allinone.proja3.proja3.service.parking.RegularParkingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/parking/regular")
public class RegularController {
    private final RegularParkingService regularParkingService;

    @GetMapping("/list")
    public PageResponseDTO<RegularParkingDTO> getList(PageRequestDTO pageRequestDTO){
        System.out.println("RegularParking getList controller : " + pageRequestDTO);
        return regularParkingService.getList(pageRequestDTO);
    }
    @GetMapping("/user_list")
    public PageResponseDTO<RegularParkingDTO> getUserList(PageRequestDTO pageRequestDTO, @RequestBody HouseholdDTO householdDTO){
        System.out.println("RegularParking getList controller : " + pageRequestDTO);
        return regularParkingService.getList(pageRequestDTO);
    }
}
