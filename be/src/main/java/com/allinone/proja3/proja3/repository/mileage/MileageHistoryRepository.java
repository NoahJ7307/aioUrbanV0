package com.allinone.proja3.proja3.repository.mileage;

import com.allinone.proja3.proja3.model.mileage.Mileage;
import com.allinone.proja3.proja3.model.mileage.MileageHistory;
import com.allinone.proja3.proja3.model.mileage.MileageHistoryId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MileageHistoryRepository extends JpaRepository<MileageHistory, MileageHistoryId> {
    List<MileageHistory> findByMileage_MileageId(Long mileageId);
    //List<MileageHistory> findByMileageId(Long mileageId);
}
