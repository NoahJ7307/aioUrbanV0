package com.allinone.proja3.proja3.repository.parking;

import com.allinone.proja3.proja3.model.parking.HouseholdPK;
import com.allinone.proja3.proja3.model.parking.VisitParking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitParkingRepository extends JpaRepository<VisitParking, Long> {
}
