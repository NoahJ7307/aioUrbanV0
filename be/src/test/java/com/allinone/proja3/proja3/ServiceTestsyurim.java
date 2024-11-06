package com.allinone.proja3.proja3;

import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.dto.facilities.GymDTO;
import com.allinone.proja3.proja3.dto.facilities.StudyDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.facilities.Golf;
import com.allinone.proja3.proja3.model.facilities.Gym;
import com.allinone.proja3.proja3.model.facilities.ProgramState;
import com.allinone.proja3.proja3.repository.facilities.GymRepository;
import com.allinone.proja3.proja3.service.UserService;
import com.allinone.proja3.proja3.service.facilities.GolfService;
import com.allinone.proja3.proja3.service.facilities.GymService;
import com.allinone.proja3.proja3.service.facilities.StudyService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ServiceTestsyurim {
    @Autowired
    private UserService userService;
    @Autowired
    private GolfService golfService;
    @Autowired
    private StudyService studyService;
    @Autowired
    private GymService gymService;
    @Autowired
    private GymRepository gymRepository;

//    @Test
//    public void insertTest() {
//        for (int i = 0; i < 130; i++) {
//            int randIdx = (int) (Math.random() * 100) + 1;
//            int randho = (int) (Math.random() * 10) + 1;
//            UserDTO userDTO = UserDTO.builder()
//                    .dong(101 + randIdx)
//                    .ho(101 + randho)
//                    .userName("User" + randIdx)
//                    .phone("0101234" + (1000 + randIdx))
//                    .pw("1111")
//                    .delFlag(false)
//                    .build();
//            userService.register(userDTO);
//        }
//    }

    @Test
    public  void insertGymTest() {
        for(int i = 0; i <10; i++) {
            GymDTO gymDTO = GymDTO.builder()
//                    .programId(1L)
                    .title("제목입니다"+i)
                    .content("내용입니다" +i)
                    .target("타겟"+i)
                    .participantLimit(10)
                    .programStartDate(LocalDate.of(2024, 11, 16))
                    .programEndDate(LocalDate.of(2024, 12, 16))
                    .programStartTime(LocalTime.of(10,30))
                    .programEndTime(LocalTime.of(12,30))
                    .applicationStartDate(LocalDateTime.of(2024, 10, 16, 10, 30))
                    .applicationEndDate(LocalDateTime.of(2024, 11, 10, 18, 30))
                    //.membershipType("Basic")
                    .delFlag(false) // delFlag 값을 설정
//                    .programState(ProgramState.WAITING)
                    .build();
            Gym gym = gymService.dtoToEntity(gymDTO);
            gymService.newProgramPost(gym);
        }
    }
//    @Test
//    public void oneinsert() {
//
//            GolfDTO golfDTO = GolfDTO.builder()
//                    .date(LocalDate.of(2024, 10, 16))
//                    .startTime(LocalTime.of(11, 55, 0))
//                    .endTime(LocalTime.of(13, 55, 0))
//                    .teeBox(12)
//                    .build();
//            golfService.register(golfDTO);
//        }
//    }



//    @Test
//    public void insertTest2() {
//        for (int i = 0; i < 130; i++) {
////            int randIdx = (int) (Math.random() * 100) + 1;
//            int randId = (int) (Math.random() * 10) + 1;
//            GolfDTO golfDTO = GolfDTO.builder()
//                    .date(LocalDate.of(2024, 10, 16))
//                    .startTime(LocalTime.of(11, 55, 0))
//                    .endTime(LocalTime.of(13, 55, 0))
//                    .teeBox(randId)
//                    .build();
//            Golf golf = gymService.dtoToEntity(golf);
//            golfService.register(golfDTO);
//        }
//    }

//    @Test
//    public void insertTest3() {
//        for (int i = 0; i < 50; i++) {
//            int randIdx = (int) (Math.random() * 100) + 1;
//            int randId = (int) (Math.random() * 10) + 1;
////            StudyDTO studyDTO = StudyDTO.builder()
//            GolfDTO golfDTO = GolfDTO.builder()
//                    .date(LocalDate.of(2024, 10, 16))
//                    .startTime(LocalTime.of(11, 55, 0))
//                    .endTime(LocalTime.of(13, 55, 0))
//                    .teeBox(randId)
//                    .build();
//            golfService.register(golfDTO);
//        }
//    }

//    @Test
//    public void getTest1() {
//        GolfDTO golfDTO = GolfDTO.builder()
//                    .userName("홍길동44")
//                    .date(LocalDate.of(2024, 10, 16))
//                    .startTime(LocalTime.of(11, 55, 0))
//                    .endTime(LocalTime.of(13, 55, 0))
//                    .teeBox(12)
//                    .build();
//            golfService.register(golfDTO);
//    }
//
//}

//    @Test
//    public void getTest(){
//        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
//                .page(1)
//                .size(10)
//                .build();
//        PageResponseDTO<UserDTO> list = userService.getList(pageRequestDTO);
//        list.getDtoList().forEach(System.out::println);
//    }



}
