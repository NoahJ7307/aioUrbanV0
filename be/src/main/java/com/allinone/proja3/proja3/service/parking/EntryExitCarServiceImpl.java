package com.allinone.proja3.proja3.service.parking;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.parking.*;
import com.allinone.proja3.proja3.model.parking.EntryExitCar;
import com.allinone.proja3.proja3.model.parking.Household;
import com.allinone.proja3.proja3.model.parking.HouseholdPK;
import com.allinone.proja3.proja3.model.parking.VisitParking;
import com.allinone.proja3.proja3.repository.parking.EntryExitCarRepository;
import com.allinone.proja3.proja3.repository.parking.HouseholdRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EntryExitCarServiceImpl implements EntryExitCarService{
    private final EntryExitCarRepository entryExitCarRepository;
    private final HouseholdRepository householdRepository;

    @Override
    public Long entry(EntryExitCarDTO entryExitCarDTO) {
        System.out.println("EntryExitCar entry service" + entryExitCarDTO);
        EntryExitCar entryExitCar = dtoToEntity(entryExitCarDTO);
        EntryExitCar result = entryExitCarRepository.save(entryExitCar);
        return result.getEeno();
    }

    @Override
    public void exit(EntryExitCarDTO entryExitCarDTO) {
        System.out.println("EntryExitCar exit service" + entryExitCarDTO);
        List<EntryExitCar> exitList = entryExitCarRepository.findAllByCarNum(entryExitCarDTO.getCarNum());
        // 가장 최근에 입차한 차량의 isExit 를 true 로 설정 ... 이하
        exitList.forEach(System.out::println);
    }

    @Override
    public PageResponseDTO<EntryExitCarDTO> getList(PageRequestDTO pageRequestDTO) {
        System.out.println("EntryExitCar getList service");
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("eeno").descending());

        Page<EntryExitCar> result = entryExitCarRepository.findAll(pageable);

        List<EntryExitCarDTO> dtoList = result.get()
                .map(this::entityToDto)
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        return PageResponseDTO.<EntryExitCarDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
    }

    @Override
    public PageResponseDTO<EntryExitCarDTO> getUserList(PageRequestDTO pageRequestDTO, HouseholdDTO householdDTO) {
        System.out.println("EntryExitCar getUserList service");
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("eeno").descending());

        Page<EntryExitCar> result = entryExitCarRepository
                .findAllByDongAndHo(householdDTO.getDong(), householdDTO.getHo(), pageable);

        List<EntryExitCarDTO> dtoList = result.get()
                .map(this::entityToDto)
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        return PageResponseDTO.<EntryExitCarDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
    }

    @Override
    public PageResponseDTO<EntryExitCarDTO> getSearchList(PageRequestDTO pageRequestDTO, EntryExitSearchDataDTO entryExitSearchDataDTO) {
        System.out.println("EntryExitCar getSearchList service");
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("eeno").descending());

        // 검색 필터
        Page<EntryExitCar> result;
        switch (entryExitSearchDataDTO.getSearchCategory()) {
            case "dong-ho": {
                String[] value = entryExitSearchDataDTO.getSearchValue().split("-");
                String dong = value[0];
                String ho = value[1];
                result = entryExitCarRepository.findByDongContainingAndHoContaining(dong, ho, pageable);
            }
            break;
            case "dong":
                result = entryExitCarRepository.findByDongContaining(entryExitSearchDataDTO.getSearchValue(), pageable);
                break;
            case "ho":
                result = entryExitCarRepository.findByHoContaining(entryExitSearchDataDTO.getSearchValue(), pageable);
                break;
            case "carNum":
                result = entryExitCarRepository.findByCarNumContaining(entryExitSearchDataDTO.getSearchValue(), pageable);
                break;
            case "isExit":
                result = entryExitCarRepository.findAllByIsExit(entryExitSearchDataDTO.isExit(), pageable);
                break;
            case "entryDate": {
                LocalDate start = entryExitSearchDataDTO.getEntryExitDateStart();
                LocalDate end = entryExitSearchDataDTO.getEntryExitDateEnd();
                result = entryExitCarRepository.findByEntryDateBetween(start, end, pageable);
            }
            case "exitDate": {
                LocalDate start = entryExitSearchDataDTO.getEntryExitDateStart();
                LocalDate end = entryExitSearchDataDTO.getEntryExitDateEnd();
                result = entryExitCarRepository.findByExitDateBetween(start, end, pageable);
            }
            break;
            default:
                result = Page.empty(pageable);
        }

        // entityToDto를 사용하여 엔티티 -> DTO 변환
        List<EntryExitCarDTO> dtoList = result.getContent().stream()
                .map(this::entityToDto)  // entityToDto 메서드를 사용하여 변환
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        return PageResponseDTO.<EntryExitCarDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
    }

    private EntryExitCar dtoToEntity(EntryExitCarDTO entryExitCarDTO) {
        return EntryExitCar.builder()
                .eeno(entryExitCarDTO.getEeno())
                .carNum(entryExitCarDTO.getCarNum())
                .dong(entryExitCarDTO.getDong())
                .ho(entryExitCarDTO.getHo())
                .isExit(entryExitCarDTO.isExit())
                .entryDate(entryExitCarDTO.getEntryDate())
                .exitDate(entryExitCarDTO.getExitDate())
                .build();
    }

    private EntryExitCarDTO entityToDto(EntryExitCar entryExitCar) {
        return EntryExitCarDTO.builder()
                .eeno(entryExitCar.getEeno())
                .carNum(entryExitCar.getCarNum())
                .dong(entryExitCar.getDong())
                .ho(entryExitCar.getHo())
                .isExit(entryExitCar.isExit())
                .entryDate(entryExitCar.getEntryDate())
                .exitDate(entryExitCar.getExitDate())
                .build();
    }

    private Household householdReg(EntryExitCarDTO entryExitCarDTO) {
        HouseholdPK householdPK = HouseholdPK.builder()
                .dong(entryExitCarDTO.getDong())
                .ho(entryExitCarDTO.getHo())
                .build();
        Household household = Household.builder()
                .householdPK(householdPK)
                .build();
        return householdRepository.save(household);
    }
}
