package com.allinone.proja3.proja3.repository;

import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.dto.facilities.GymDTO;
import com.allinone.proja3.proja3.model.facilities.Golf;
import com.allinone.proja3.proja3.model.facilities.Gym;
import com.allinone.proja3.proja3.repository.facilities.GolfRepository;
import com.allinone.proja3.proja3.repository.facilities.GymRepository;
import com.allinone.proja3.proja3.service.facilities.GolfService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Fail.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
@Transactional
public class GolfRepositoryTestg {

    @Autowired
    private GolfRepository repository;
    @Autowired
    private GymRepository gymRepository;
    @Autowired
    private GolfService service;


//    @Test
//    public void testDel(){
//        List<Golf> list = repository.findGolfBydelFlag(false);
//
//        list.forEach(i-> System.out.println(i));
//    }

    @Test
    public void testModify() {
        Long reservationId = 33L;
        Optional<Golf> result = repository.findById(reservationId);
        Golf golf = result.orElseThrow();
        golf.changeDate(LocalDate.of(2025,10,22));
        golf.changeEndTime(LocalTime.of(13,25));
        golf.changeStartTime(LocalTime.of(10,22));
        golf.changeTeeBox(12);
        repository.save(golf);
    }


    @Test
    public void testModify2 () {
        Long programId = 55L;
        Optional<Gym> result = gymRepository.findById(programId);
        Gym gym = result.orElseThrow();
        gym.changeTitle("제목이 바뀌었어요 15 번 ");
        gym.changeContent("내용도 바뀌었어요 15번");
        gym.changeTarget("15번만 참가가능");
        gymRepository.save(gym);
    }





//    @Test
//    public void deleteTest () {
//        Long programId = 50L;
//        gymRepository.updateToDelete(programId, true);
//        // 여기서 업데이트된 값을 다시 가져옵니다.
//        Gym gym = gymRepository.findById(programId).orElse(null);
//        assertThat(gym).isNotNull();
//        assertThat(gym.isDelFlag()).isFalse(); // delFlag가 false로 설정되었는지 확인
//
//        // 추가적으로 true로 설정 후 확인해볼 수 있습니다.
//        gymRepository.updateToDelete(programId, true);
//        gym = gymRepository.findById(programId).orElse(null);
//        assertThat(gym).isNotNull();
//        assertThat(gym.isDelFlag()).isTrue(); // delFlag가 true로 설정되었는지 확인
//    }
    @Test
    public void deleteTest () {
        Long programId = 3L;
        gymRepository.updateToDelete(programId, true);
    }

//    @Test
//    @Transactional // 추가
//    public void deleteTest() {
//        Long programId = 50L;
//
//        // delFlag를 false로 설정
//        gymRepository.updateToDelete(programId, false);
//
//        // 해당 프로그램 ID로 다시 조회
//        Gym gym = gymRepository.findById(programId).orElse(null);
//        assertThat(gym).isNotNull();
//        assertThat(gym.isDelFlag()).isFalse(); // delFlag가 false로 설정되었는지 확인
//
//        // delFlag를 true로 설정
//        gymRepository.updateToDelete(programId, true);
//        gym = gymRepository.findById(programId).orElse(null);
//        assertThat(gym).isNotNull();
//        assertThat(gym.isDelFlag()).isTrue(); // delFlag가 true로 설정되었는지 확인
//    }

}
