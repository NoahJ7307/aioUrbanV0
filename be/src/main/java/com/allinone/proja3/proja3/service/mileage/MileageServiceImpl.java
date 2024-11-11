package com.allinone.proja3.proja3.service.mileage;

import com.allinone.proja3.proja3.dto.mileage.MileageDTO;
import com.allinone.proja3.proja3.model.mileage.CardInfo;
import com.allinone.proja3.proja3.model.mileage.Mileage;
import com.allinone.proja3.proja3.repository.mileage.CardInfoRepository;
import com.allinone.proja3.proja3.repository.mileage.MileageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class MileageServiceImpl implements MileageService {

    private final MileageRepository mileageRepository;
    private final CardInfoRepository cardInfoRepository;

    @Override
    public MileageDTO getDTO(Mileage entity) {
        return  MileageDTO.builder()
                .mileageId(entity.getMileageId())
                .ho(entity.getHo())
                .dong(entity.getDong())
                .price(entity.getPrice())
                .cardId(entity.getCardInfo() != null ? entity.getCardInfo().getCardId() : null)
                .autopay(entity.isAutopay())
                .state(entity.isActive())
                .build();
    }

    private Mileage getEntity(MileageDTO dto) {

        Optional<CardInfo> card = cardInfoRepository.findById(dto.getCardId());
        Mileage entity =  Mileage.builder()
                .mileageId(dto.getMileageId())
                .ho(dto.getHo())
                .dong(dto.getDong())
                .price(dto.getPrice())
                .autopay(dto.isAutopay())
                .state(dto.isState())
                .build();
        //card가 있으면 set 추가 하는 로직.
        if(card.isPresent()) {
            entity.setCardInfo(card.get());
        }
        return entity;
    }


    @Override
    public Mileage findByDongHoentity(int dong, int ho) {
        Optional<Mileage> entity = mileageRepository.findByDongAndHoAndStateTrue(dong,ho);
        if(entity.isPresent()) {
            return entity.get();
        }else return null;
    }
    @Override
    public MileageDTO findByDongHoDTO(int dong, int ho) {
        Optional<Mileage> entity = mileageRepository.findByDongAndHoAndStateTrue(dong, ho);
        return entity.map(this::getDTO).orElse(null);
    }


    @Override
    public Mileage saveDto(MileageDTO dto) {
        Mileage entity = getEntity(dto);
        return mileageRepository.save(entity);
    }

    //수동 충전 로직
    public Mileage duplicate(MileageDTO dto , int paymetAmount ) {
        Mileage entity =findByDongHoentity(dto.getDong(), dto.getHo());
        CardInfo cardInfo = cardInfoRepository.findById(dto.getCardId()).orElse(null);

        if(entity != null) {
            entity.setPrice(entity.getPrice()+paymetAmount);
        }else{
            entity = Mileage.builder()
                    .dong(dto.getDong())
                    .ho(dto.getHo())
                    .state(true)
                    .cardInfo(cardInfo)
                    .autopay(false)
                    .price(paymetAmount)
                    .build();
        }
        return mileageRepository.save(entity);
    }

    @Override
    public void deleteMileage(Mileage mileage) {
        mileageRepository.delete(mileage);
    }


}
