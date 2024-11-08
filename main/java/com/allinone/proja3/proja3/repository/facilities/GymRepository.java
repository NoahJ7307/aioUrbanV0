package com.allinone.proja3.proja3.repository.facilities;

import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.facilities.Golf;
import com.allinone.proja3.proja3.model.facilities.Gym;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GymRepository extends JpaRepository<Gym, Long> {
//    List<Gym> findByUserProgramId(Long programId,  Pageable pageable);
    Page<Gym> findAll(Pageable pageable);
    Optional<Gym> findByProgramId(Long programId);
//    long countByUserProgramId(Long programId);
    @Modifying
    @Query("update Gym g set g.delFlag = :flag where g.programId = :programId ")
    void updateToDelete(@Param("programId") Long programId, @Param("flag") boolean flag);
    @Query("SELECT g FROM Gym g WHERE g.delFlag = false ORDER BY g.programId DESC")
    Page<Gym> findNonDeletedPrograms(Pageable pageable);
}
