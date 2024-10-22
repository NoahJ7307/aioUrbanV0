package com.allinone.proja3.proja3.parking;

import com.allinone.proja3.proja3.dto.parking.RegularParkingDTO;
import com.allinone.proja3.proja3.model.parking.Household;
import com.allinone.proja3.proja3.model.parking.HouseholdPK;
import com.allinone.proja3.proja3.service.parking.RegularParkingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

@SpringBootTest
public class ParkingServiceTest {
    @Autowired
    private RegularParkingService regularParkingService;

    @Test
    public void insertRP(){
        Household household = Household.builder()
                .householdPK(HouseholdPK.builder().dong(11).ho(11).build())
                .build();
        RegularParkingDTO regularParkingDTO = RegularParkingDTO.builder()
                .household(household)
                .carNum("99RP9999")
                .name("serviceTest")
                .phone("serviceTest")
                .regDate(LocalDate.now())
                .build();
    }
}
