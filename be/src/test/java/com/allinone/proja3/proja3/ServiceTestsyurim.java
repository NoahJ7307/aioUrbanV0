package com.allinone.proja3.proja3;

import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.service.UserService;
import com.allinone.proja3.proja3.service.facilities.GolfService;
import com.allinone.proja3.proja3.service.facilities.StudyService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ServiceTestsyurim {
    @Autowired
    private UserService userService;
    @Autowired
    private GolfService golfService;
    @Autowired
    private StudyService studyService;

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
//    @Test
//    public void oneinsert() {
//
//            GolfDTO golfDTO = GolfDTO.builder()
//                    .userName("홍길동44")
//                    .date(LocalDate.of(2024, 10, 16))
//                    .startTime(LocalTime.of(11, 55, 0))
//                    .endTime(LocalTime.of(13, 55, 0))
//                    .teeBox(12)
//                    .build();
//            golfService.register(golfDTO);
//        }
//    }
    @Test
    public void insertTest2() {
        for (int i = 0; i < 130; i++) {
            int randIdx = (int) (Math.random() * 100) + 1;
            int randId = (int) (Math.random() * 10) + 1;
            GolfDTO golfDTO = GolfDTO.builder()
                    .userName("홍길동" + i)
                    .date(LocalDate.of(2024, 10, 16))
                    .startTime(LocalTime.of(11, 55, 0))
                    .endTime(LocalTime.of(13, 55, 0))
                    .teeBox(randId)
                    .build();
            golfService.register(golfDTO);
        }
    }

//    @Test
//    public void insertTest3() {
//        for (int i = 0; i < 10; i++) {
//            int randIdx = (int) (Math.random() * 100) + 1;
//            int randId = (int) (Math.random() * 10) + 1;
//            StudyDTO studyDTO = StudyDTO.builder()
//                    .userName("김말자" + i)
//                    .date(LocalDate.of(2024, 10, 16))
//                    .startTime(LocalTime.of(11, 55, 0))
//                    .endTime(LocalTime.of(13, 55, 0))
//                    .seatNum(randId)
//                    .build();
//            studyService.registerStudy(studyDTO);
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
