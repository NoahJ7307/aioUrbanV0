package com.allinone.proja3.proja3.service.parking;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.parking.HouseholdDTO;
import com.allinone.proja3.proja3.dto.parking.RegularParkingDTO;
import com.allinone.proja3.proja3.model.parking.RegularParking;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface RegularParkingService {
    Long register(RegularParkingDTO regularParkingDTO);
    PageResponseDTO<RegularParkingDTO> getList(PageRequestDTO pageRequestDTO);
    PageResponseDTO<RegularParkingDTO> getUserList(PageRequestDTO pageRequestDTO, HouseholdDTO householdDTO);
}
