package com.allinone.proja3.proja3.repository.parking;

import com.allinone.proja3.proja3.model.parking.HouseholdPK;
import com.allinone.proja3.proja3.model.parking.RegularParking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface RegularParkingRepository extends JpaRepository<RegularParking, Long> {
}
