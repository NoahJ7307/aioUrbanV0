package com.allinone.proja3.proja3.controller.parking;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.parking.*;
import com.allinone.proja3.proja3.service.parking.EntryExitCarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/parking/entry")
public class EntryController {
    private final EntryExitCarService entryExitCarService;

    @GetMapping("/list")
    public PageResponseDTO<EntryExitCarDTO> getList(PageRequestDTO pageRequestDTO) {
        System.out.println("EntryExitCar getList controller : " + pageRequestDTO);
        return entryExitCarService.getList(pageRequestDTO);
    }

    @PostMapping("/user_list")
    public PageResponseDTO<EntryExitCarDTO> getUserList(@RequestBody EntryExitReqDTO entryExitReqDTO) {
        PageRequestDTO pageRequestDTO = entryExitReqDTO.getPageRequestDTO();
        HouseholdDTO householdDTO = entryExitReqDTO.getHouseholdDTO();
        System.out.println("RegularParking getList controller P : " + pageRequestDTO);
        System.out.println("RegularParking getList controller H : " + householdDTO);
        return entryExitCarService.getUserList(pageRequestDTO, householdDTO);
    }

    @PostMapping("/search")
    public PageResponseDTO<EntryExitCarDTO> getSearchList(@RequestBody EntryExitReqDTO entryExitReqDTO){
        PageRequestDTO pageRequestDTO = entryExitReqDTO.getPageRequestDTO();
        EntryExitSearchDataDTO entryExitSearchDataDTO = entryExitReqDTO.getEntryExitSearchDataDTO();
        System.out.println("Regular getSearchList controller P : "+pageRequestDTO);
        System.out.println("Regular getSearchList controller U : "+entryExitSearchDataDTO);
        return entryExitCarService.getSearchList(pageRequestDTO,entryExitSearchDataDTO);
    }

    // entry, exit controller 추가...
}
