package com.allinone.proja3.proja3.parking;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.parking.HouseholdDTO;
import com.allinone.proja3.proja3.dto.parking.RegularParkingDTO;
import com.allinone.proja3.proja3.dto.parking.RegularSearchDataDTO;
import com.allinone.proja3.proja3.dto.parking.VisitParkingDTO;
import com.allinone.proja3.proja3.model.parking.Household;
import com.allinone.proja3.proja3.model.parking.HouseholdPK;
import com.allinone.proja3.proja3.service.parking.HouseholdService;
import com.allinone.proja3.proja3.service.parking.RegularParkingService;
import com.allinone.proja3.proja3.service.parking.VisitParkingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

@SpringBootTest
public class ParkingServiceTest {
    @Autowired
    private RegularParkingService regularParkingService;

    @Autowired
    private VisitParkingService visitParkingService;

    @Autowired
    private HouseholdService householdService;

    @Test
    public void insertRP(){
        for (int i = 1; i < 3; i++) {
            for (int j = 1; j < 3; j++) {
                HouseholdDTO householdDTO = HouseholdDTO.builder()
                        .dong(""+(200+i))
                        .ho(""+(100+j))
                        .build();

                RegularParkingDTO regularParkingDTO = RegularParkingDTO.builder()
                        .householdDTO(householdDTO)
                        .carNum((i*10)+"가"+(1000*j))
                        .name("Test"+i+".."+j)
                        .phone("Test"+i+".."+j) // 등록 날짜 test 는 serviceImpl 에서 변경
                        .build();

                regularParkingDTO.setHousehold(Household.builder()
                        .householdPK(HouseholdPK.builder()
                                .dong(regularParkingDTO.getHouseholdDTO().getDong())
                                .ho(regularParkingDTO.getHouseholdDTO().getHo())
                                .build())
                        .build());

                regularParkingService.register(regularParkingDTO);
            }
        }
    }

    @Test
    public void insertVP(){
        for (int i = 1; i < 5; i++) {
            for (int j = 1; j < 5; j++) {
                HouseholdDTO householdDTO = HouseholdDTO.builder()
                        .dong(""+(200+i))
                        .ho(""+(100+j))
                        .build();

                VisitParkingDTO visitParkingDTO = VisitParkingDTO.builder()
                        .householdDTO(householdDTO)
                        .carNum((i*10)+"가"+(1000*j))
                        .name("Test"+i+".."+j)
                        .phone("Test"+i+".."+j)
                        .expectedDate(LocalDate.parse("2024-0"+i+"-0"+j))
                        .build();

                visitParkingDTO.setHousehold(Household.builder()
                        .householdPK(HouseholdPK.builder()
                                .dong(visitParkingDTO.getHouseholdDTO().getDong())
                                .ho(visitParkingDTO.getHouseholdDTO().getHo())
                                .build())
                        .build());

                visitParkingService.register(visitParkingDTO);
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
                .dong("101")
                .ho("101")
                .build();
        PageResponseDTO<RegularParkingDTO> list = regularParkingService.getUserList(pageRequestDTO, householdDTO);
        list.getDtoList().forEach(System.out::println);
    }

    @Test
    public void getOneTest(){
        RegularParkingDTO list = regularParkingService.getOne(72L);
        System.out.println(list);
    }

    @Test
    public void getSearchListTest(){
        RegularSearchDataDTO regularSearchDataDTO = RegularSearchDataDTO.builder()
                .searchCategory("regDate")
                .regDateStart(LocalDate.parse("2024-01-01"))
                .regDateEnd(LocalDate.parse("2024-01-02"))
                .build();
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(1)
                .size(10)
                .build();
        PageResponseDTO<RegularParkingDTO> list = regularParkingService.getSearchList(pageRequestDTO, regularSearchDataDTO);
        list.getDtoList().forEach(System.out::println);
    }
}
