package com.allinone.proja3.proja3.repository.mileage;

import com.allinone.proja3.proja3.model.mileage.Mileage;
import com.allinone.proja3.proja3.model.mileage.MileageHistory;
import com.allinone.proja3.proja3.model.mileage.MileageHistoryId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MileageHistoryRepository extends JpaRepository<MileageHistory, MileageHistoryId> {
    Page<MileageHistory> findByMileage_MileageId(Long mileageId, Pageable pageable);
    //List<MileageHistory> findByMileageId(Long mileageId);
}
