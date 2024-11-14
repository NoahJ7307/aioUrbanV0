package com.allinone.proja3.proja3.service.mileage;

import com.allinone.proja3.proja3.dto.mileage.MileageDTO;
import com.allinone.proja3.proja3.dto.mileage.MileageHistoryDTO;
import com.allinone.proja3.proja3.model.mileage.CardInfo;
import com.allinone.proja3.proja3.model.mileage.Mileage;
import com.allinone.proja3.proja3.model.mileage.MileageHistory;
import com.allinone.proja3.proja3.model.mileage.MileageHistoryId;
import com.allinone.proja3.proja3.repository.mileage.MileageHistoryRepository;
import com.allinone.proja3.proja3.repository.mileage.MileageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class MileagehistoryServiceImpl implements MileagehistoryService {

    private final MileageHistoryRepository mileageHistoryRepository;
    private final MileageRepository mileageRepository;


    private MileageHistoryId makehistoryID(Mileage mileage) {
        return MileageHistoryId.builder()
                .mileageId(mileage.getMileageId())
                .timestamp(LocalDateTime.now())
                .build();
    }
    private MileageHistoryDTO getDTO(MileageHistory entity) {
        return MileageHistoryDTO.builder()
                .uno(entity.getUno())
                .mileageId(entity.getMileage().getMileageId())
                .type(entity.getType())
                .amount(entity.getAmount())
                .description(entity.getDescription())
                .timestamp(entity.getId().getTimestamp())
                .build();
    }
    private MileageHistory getEntity(MileageHistoryDTO dto) {

        Optional<Mileage> mileage = mileageRepository.findById(dto.getMileageId());
        MileageHistoryId pk = MileageHistoryId.builder()
                .mileageId(dto.getMileageId())
                .timestamp(dto.getTimestamp())
                .build();
        MileageHistory history = MileageHistory.builder()
                .amount(dto.getAmount())
                .type(dto.getType())
                .uno(dto.getUno())
                .description(dto.getDescription())
                .id(pk)
                .build();
        if (mileage.isPresent()) {
            history.setMileage(mileage.get());
        }
        return history;
    }

    public void savehistory(Mileage mileage , Long uno ,
                     int amount ,String type , String description) {
        MileageHistory history = MileageHistory.builder()
                .id(makehistoryID(mileage))//인자로들어간 mileage와 , 현재 시간으로 make
                .mileage(mileage)//매개변수 : 들어온 mileage
                .uno(uno) //매개변수 : 이 마일리지를 사용한 사람
                .type(type) //매개변수 : + 인지 , - 인지
                .amount(amount)// 매개변수 : 사용 금액
                .description(description)// 매개변수 : 내역으로 남길 글귀 정리
                .build();
        //엔터티 새롭게 저장
        mileageHistoryRepository.save(history);
    }


    @Override
    public List<MileageHistoryDTO> getMileageHistoryList(Long mileageId) {
        return mileageHistoryRepository.findByMileage_MileageId(mileageId).stream()
                .map(this::getDTO) // MileageHistory 엔터티를 DTO로 변환
                .collect(Collectors.toList());
    }

    @Override
    public void deleteMileageHistory(MileageHistoryId id) {


    }
}
