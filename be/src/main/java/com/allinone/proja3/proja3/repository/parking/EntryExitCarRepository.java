package com.allinone.proja3.proja3.repository.parking;

import com.allinone.proja3.proja3.model.parking.EntryExitCar;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EntryExitCarRepository extends JpaRepository<EntryExitCar, Long> {
    // Query Method 사용
    Page<EntryExitCar> findAllByDongAndHo(String dong, String ho,Pageable pageable);
    List<EntryExitCar> findAllByCarNum(String carNum);
    Page<EntryExitCar> findByDongContainingAndHoContaining(String dong, String ho, Pageable pageable);
    Page<EntryExitCar> findByDongContaining(String dong, Pageable pageable);
    Page<EntryExitCar> findByHoContaining(String ho, Pageable pageable);
    Page<EntryExitCar> findByCarNumContaining(String carNum, Pageable pageable);
    Page<EntryExitCar> findByCarNumContainingAndDongAndHo(String carNum, String dong, String ho, Pageable pageable);
    Page<EntryExitCar> findAllByIsExit(boolean isExit, Pageable pageable);
    Page<EntryExitCar> findAllByIsExitAndDongAndHo(boolean isExit, String dong, String ho, Pageable pageable);
    Page<EntryExitCar> findByEntryDateBetween(LocalDate start, LocalDate end, Pageable pageable);
    Page<EntryExitCar> findByEntryDateBetweenAndDongAndHo(
            LocalDate start, LocalDate end, String dong, String ho, Pageable pageable);
    Page<EntryExitCar> findByExitDateBetween(LocalDate start, LocalDate end, Pageable pageable);
    Page<EntryExitCar> findByExitDateBetweenAndDongAndHo(
            LocalDate start, LocalDate end, String dong, String ho, Pageable pageable);
}
