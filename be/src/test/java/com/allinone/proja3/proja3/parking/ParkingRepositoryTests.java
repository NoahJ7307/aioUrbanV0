package com.allinone.proja3.proja3.parking;

import com.allinone.proja3.proja3.model.parking.*;
import com.allinone.proja3.proja3.repository.parking.EntryExitCarRepository;
import com.allinone.proja3.proja3.repository.parking.HouseholdRepository;
import com.allinone.proja3.proja3.repository.parking.RegularParkingRepository;
import com.allinone.proja3.proja3.repository.parking.VisitParkingRepository;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.Optional;

@SpringBootTest
public class ParkingRepositoryTests {
    private static final Logger log = LoggerFactory.getLogger(ParkingRepositoryTests.class);
    @Autowired
    private HouseholdRepository householdRepository;

    @Autowired
    private RegularParkingRepository regularParkingRepository;

    @Autowired
    private VisitParkingRepository visitParkingRepository;

    @Autowired
    private EntryExitCarRepository entryExitCarRepository;

    @Test
    public void insertHouseholdAndRegularParking(){
        HouseholdPK householdPK = HouseholdPK.builder()
                .dong("101")
                .ho("101")
                .build();
        Household household = Household.builder()
                .householdPK(householdPK)
                .build();
        householdRepository.save(household);
        RegularParking regularParking = RegularParking.builder()
                .household(household)
                .carNum("99가9999")
                .name("TestRegCarName")
                .phone("TestRegCarPhone")
                .regDate(LocalDate.now())
                .build();
        regularParkingRepository.save(regularParking);
    }

    @Test
    public void getHouseholdAndInsertVisit(){
        HouseholdPK householdPK = HouseholdPK.builder()
                .dong("101")
                .ho("101")
                .build();
        Optional<Household> visitHousehold = householdRepository.findById(householdPK);
        if (visitHousehold.isPresent()){
            Household visitKey = visitHousehold.get();
            VisitParking visitParking = VisitParking.builder()
                    .household(visitKey)
                    .carNum("88방8888")
                    .name("TestVisitName")
                    .phone("TestVisitPhone")
                    .expectedDate(LocalDate.parse("2024-11-01"))
                    .build();
            visitParkingRepository.save(visitParking);
        }
    }

    @Test
    public void insertEECar(){
        EntryExitCar entryExitCar = EntryExitCar.builder()
                .carNum("77테7777")
                .entryDate(LocalDate.now())
                .exitDate(LocalDate.now())
                .isExit(true)
                .build();
        entryExitCarRepository.save(entryExitCar);
    }

    @Test
    public void queryMethodTest(){
        Pageable pageable = PageRequest.of(0,10);
        Page<VisitParking> list = visitParkingRepository.findByNameContainingAndHousehold_HouseholdPK_DongAndHousehold_HouseholdPK_Ho("t", "201", "101", pageable);
        list.forEach(s-> System.out.println(s.getVpno()));
    }
}
