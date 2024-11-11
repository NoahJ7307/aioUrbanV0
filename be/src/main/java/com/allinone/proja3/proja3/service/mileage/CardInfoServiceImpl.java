package com.allinone.proja3.proja3.service.mileage;

import com.allinone.proja3.proja3.dto.mileage.CardInfoDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.mileage.CardInfo;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.repository.mileage.CardInfoRepository;
import com.allinone.proja3.proja3.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class CardInfoServiceImpl implements CardInfoService {

    private final CardInfoRepository cardInfoRepository;
    private final UserRepository userRepository;

    private CardInfoDTO getDTO(CardInfo entity) {
        CardInfoDTO dto = CardInfoDTO.builder()
                .cardId(entity.getCardId())
                .cardExpiry(entity.getCardExpiry())
                .encryptedCardNumber(entity.getEncryptedCardNumber())
                .uno(entity.getUser()!=null ? entity.getUser().getUno() : null)
                .build();

        return dto;
    }

    private CardInfo getEntity(CardInfoDTO dto) {

        Optional<User> user = userRepository.findById(dto.getUno());
        CardInfo entity = CardInfo.builder()
                .cardId(dto.getCardId())
                .cardExpiry(dto.getCardExpiry())
                .encryptedCardNumber(dto.getEncryptedCardNumber())
                .build();

        if(user.isPresent()) {
            entity.setUser(user.get());
        }
        return entity;
    }


    @Override
    public CardInfoDTO findByUno(long uno) {
        Optional<CardInfo> card = cardInfoRepository.findByUserUno(uno);
        return card.map(this::getDTO).orElse(null);
    }

    @Override
    public CardInfo saveCardInfo(CardInfoDTO dto) {
        CardInfoDTO selectDTO = findByUno(dto.getUno());
        if (selectDTO != null) {
            dto.setCardId(selectDTO.getCardId());
        }
        return cardInfoRepository.save(getEntity(dto));
    }

    @Override
    public void deleteCardInfo(CardInfoDTO dto) {
        cardInfoRepository.delete(getEntity(dto));
    }
}
