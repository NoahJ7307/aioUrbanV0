package com.allinone.proja3.proja3.repository.parking;

import com.allinone.proja3.proja3.model.parking.Household;
import com.allinone.proja3.proja3.model.parking.VisitParking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface VisitParkingRepository extends JpaRepository<VisitParking, Long> {
    Page<VisitParking> findAllByHousehold(Household household, Pageable pageable);

    @Query("select v from VisitParking v where v.household.householdPK.dong like %:dong% and v.household.householdPK.ho like %:ho%")
    Page<VisitParking> findByDongHo(@Param("dong") String dong, @Param("ho") String ho, Pageable pageable);

    @Query("select v from VisitParking v where v.household.householdPK.dong like %:value%")
    Page<VisitParking> findByDong(@Param("value") String value, Pageable pageable);

    @Query("select v from VisitParking v where v.household.householdPK.ho like %:value%")
    Page<VisitParking> findByHo(@Param("value") String value, Pageable pageable);

    @Query("select v from VisitParking v where v.name like %:value%")
    Page<VisitParking> findByName(@Param("value") String value, Pageable pageable);
    Page<VisitParking> findByNameContainingAndHousehold_HouseholdPK_DongAndHousehold_HouseholdPK_Ho(
            String name, String dong, String ho, Pageable pageable);

    @Query("select v from VisitParking v where v.carNum like %:value%")
    Page<VisitParking> findByCarNum(@Param("value") String value, Pageable pageable);
    Page<VisitParking> findByCarNumContainingAndHousehold_HouseholdPK_DongAndHousehold_HouseholdPK_Ho(
            String carNum, String dong, String ho, Pageable pageable);

    @Query("select v from VisitParking v where v.phone like %:value%")
    Page<VisitParking> findByPhone(@Param("value") String value, Pageable pageable);
    Page<VisitParking> findByPhoneContainingAndHousehold_HouseholdPK_DongAndHousehold_HouseholdPK_Ho(
            String phone, String dong, String ho, Pageable pageable);

    @Query("select v from VisitParking v where v.expectedDate between :start and :end")
    Page<VisitParking> findByExpectedDate(@Param("start") LocalDate start, @Param("end") LocalDate end, Pageable pageable);
    Page<VisitParking> findByExpectedDateBetweenAndHousehold_HouseholdPK_DongAndHousehold_HouseholdPK_Ho(
            LocalDate start, LocalDate end, String dong, String ho, Pageable pageable);
}
