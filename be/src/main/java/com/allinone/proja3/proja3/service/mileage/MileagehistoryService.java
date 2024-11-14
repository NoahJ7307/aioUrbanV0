package com.allinone.proja3.proja3.service.mileage;

import com.allinone.proja3.proja3.dto.mileage.MileageHistoryDTO;
import com.allinone.proja3.proja3.model.mileage.CardInfo;
import com.allinone.proja3.proja3.model.mileage.Mileage;
import com.allinone.proja3.proja3.model.mileage.MileageHistory;
import com.allinone.proja3.proja3.model.mileage.MileageHistoryId;

import java.util.List;

public interface MileagehistoryService {

    List<MileageHistoryDTO> getMileageHistoryList(Long MileageId);



    void deleteMileageHistory(MileageHistoryId id);

    void savehistory(Mileage mileage , Long uno ,
                     int amount , String type , String description);
}
