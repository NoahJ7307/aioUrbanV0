package com.allinone.proja3.proja3.parking;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.UserDTO;
import com.allinone.proja3.proja3.dto.parking.HouseholdDTO;
import com.allinone.proja3.proja3.dto.parking.RegularParkingDTO;
import com.allinone.proja3.proja3.model.parking.Household;
import com.allinone.proja3.proja3.model.parking.HouseholdPK;
import com.allinone.proja3.proja3.service.parking.HouseholdService;
import com.allinone.proja3.proja3.service.parking.RegularParkingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

@SpringBootTest
public class ParkingServiceTest {
    @Autowired
    private RegularParkingService regularParkingService;

    @Autowired
    private HouseholdService householdService;

    @Test
    public void insertRP(){
        for (int i = 1; i < 6; i++) {
            for (int j = 1; j < 7; j++) {
                HouseholdDTO householdDTO = HouseholdDTO.builder()
                        .dong(100+i)
                        .ho(100+j)
                        .build();
                householdService.register(householdDTO);
                RegularParkingDTO regularParkingDTO = RegularParkingDTO.builder()
                        .household(householdService.getHousehold(householdDTO))
                        .carNum((i*10)+"가"+(1000*j))
                        .name("Test"+i+".."+j)
                        .phone("Test"+i+".."+j)
                        .regDate(LocalDate.now())
                        .build();
                regularParkingService.register(regularParkingDTO);
            }
        }
    }

    @Test
    public void getListTest(){
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(1)
                .size(10)
                .build();
        PageResponseDTO<RegularParkingDTO> list = regularParkingService.getList(pageRequestDTO);
        list.getDtoList().forEach(System.out::println);
    }

    @Test
    public void getUserListTest(){
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(1)
                .size(10)
                .build();
        HouseholdDTO householdDTO = HouseholdDTO.builder()
                .dong(101)
                .ho(101)
                .build();
        PageResponseDTO<RegularParkingDTO> list = regularParkingService.getUserList(pageRequestDTO, householdDTO);
        list.getDtoList().forEach(System.out::println);
    }
}
