package com.allinone.proja3.proja3.parking;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.parking.*;
import com.allinone.proja3.proja3.repository.parking.EntryExitCarRepository;
import com.allinone.proja3.proja3.service.parking.EntryExitCarService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

@SpringBootTest
public class EntryServiceTest {
    @Autowired
    private EntryExitCarService entryExitCarService;
    @Autowired
    private EntryExitCarRepository entryExitCarRepository;

    @Test
    public void entryTest(){
        for (int ii = 0; ii < 5; ii++) {
            for (int i = 1; i < 10; i++) {
                for (int j = 1; j < 10; j++) {
                    EntryExitCarDTO entryExitCarDTO = EntryExitCarDTO.builder()
                            .dong("10"+i)
                            .ho("10"+j)
                            .carNum((i*10)+"테"+(1000*j))
                            .isExit(false)
                            .build();
                    entryExitCarService.entry(entryExitCarDTO);
                }
            }
        }
    }

    @Test
    public void exitTest(){
        for (int ii = 0; ii < 5; ii+=2) {
            for (int i = 1; i < 10; i+=2) {
                for (int j = 1; j < 10; j+=2) {
                    EntryExitCarDTO entryExitCarDTO = EntryExitCarDTO.builder()
                            .carNum((i*10)+"테"+(1000*j))
                            .isExit(true)
                            .build();
                    entryExitCarService.exit(entryExitCarDTO);
                }
            }
        }
    }

    @Test
    public void getListTest(){
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(1)
                .size(10)
                .build();
        PageResponseDTO<EntryExitCarDTO> carList = entryExitCarService.getList(pageRequestDTO);
        carList.getDtoList().forEach(System.out::println);
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
        PageResponseDTO<EntryExitCarDTO> list = entryExitCarService.getUserList(pageRequestDTO, householdDTO);
        list.getDtoList().forEach(System.out::println);
    }

    @Test
    public void getSearchListTest(){
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(1)
                .size(10)
                .build();
        // dong test
        EntryExitSearchDataDTO dongTest = EntryExitSearchDataDTO.builder()
                .searchCategory("dong")
                .searchValue("101")
                .build();
        HouseholdDTO householdDTO = HouseholdDTO.builder()
                .dong(null)
                .ho(null)
                .build();
        PageResponseDTO<EntryExitCarDTO> dongList = entryExitCarService.getSearchList(pageRequestDTO, dongTest, householdDTO);
        System.out.println("-------<dong>-------");
        dongList.getDtoList().forEach(System.out::println);


        // dong-ho test
        EntryExitSearchDataDTO dongHoTest = EntryExitSearchDataDTO.builder()
                .searchCategory("dong-ho")
                .searchValue("101-101")
                .build();

        PageResponseDTO<EntryExitCarDTO> dongHoList = entryExitCarService.getSearchList(pageRequestDTO, dongHoTest, householdDTO);
        System.out.println("-------<dong-ho>-------");
        dongHoList.getDtoList().forEach(System.out::println);

        // isExit test
        EntryExitSearchDataDTO isExitTest = EntryExitSearchDataDTO.builder()
                .searchCategory("isExit")
                .searchValue("exit")
                .build();
        PageResponseDTO<EntryExitCarDTO> isExitList = entryExitCarService.getSearchList(pageRequestDTO, isExitTest, householdDTO);
        System.out.println("-------<isExit>-------");
        isExitList.getDtoList().forEach(System.out::println);

        // entry date test
        EntryExitSearchDataDTO entryDateTest = EntryExitSearchDataDTO.builder()
                .searchCategory("entryDate")
                .entryExitDateStart(LocalDate.parse("2024-01-01"))
                .entryExitDateEnd(LocalDate.parse("2024-01-02"))
                .build();
        PageResponseDTO<EntryExitCarDTO> entryDateList = entryExitCarService.getSearchList(pageRequestDTO, entryDateTest, householdDTO);
        System.out.println("-------<entryDate>-------");
        entryDateList.getDtoList().forEach(System.out::println);

        // exit date test
        EntryExitSearchDataDTO exitDateTest = EntryExitSearchDataDTO.builder()
                .searchCategory("exitDate")
                .entryExitDateStart(LocalDate.parse("2024-01-01"))
                .entryExitDateEnd(LocalDate.parse("2024-01-07"))
                .build();
        PageResponseDTO<EntryExitCarDTO> exitDateList = entryExitCarService.getSearchList(pageRequestDTO, exitDateTest, householdDTO);
        System.out.println("-------<entryDate>-------");
        exitDateList.getDtoList().forEach(System.out::println);

    }
}
