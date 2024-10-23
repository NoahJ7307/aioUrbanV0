package com.allinone.proja3.proja3.controller.facilities;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.dto.facilities.StudyDTO;
import com.allinone.proja3.proja3.service.facilities.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/facilities/study")
public class StudyController {
    private final StudyService service;
    //예약변경을 위한 페이지
//    @GetMapping("/modify")

    //예약 조회 페이지를 위한 로직
    @GetMapping("/list")
    public PageResponseDTO<StudyDTO> getList(PageRequestDTO pageRequestDTO){
        System.out.println("get list 가져온다 : " + pageRequestDTO);

        return service.getList(pageRequestDTO);
    }



    //예약 등록을 위한 로직
    @PostMapping("/reserve")
    public Long register(@RequestBody StudyDTO studyDTO) {
        System.out.println("study register...." + studyDTO);

        //날짜 ,시간, 좌석번호로 예약 목록 중복 조회 메서드
        if(!service.isTimeAvailable(studyDTO.getDate(), studyDTO.getStartTime(), studyDTO.getEndTime(),studyDTO.getSeatNum())){
            throw new ResponseStatusException(HttpStatus.CONFLICT,"해당시간대는 이미 예약이 있습니다.");
            //java.lang.IllegalArgumentException은 적합하지 않거나(illegal)
            // 적절하지 못한(inappropriate) 인자를 메소드에 넘겨주었을 때 발생합니다.
        }
        Long reservationId = service.registerStudy(studyDTO);
        return reservationId;
    }

    //예약가능한지 확인하는 메서드
    @GetMapping("/checkAvailability")
    public boolean checkAvailability (@RequestParam LocalDate date,
                                      @RequestParam LocalTime startTime,
                                      @RequestParam LocalTime endTime,
                                      @RequestParam int seatNum){
        return service.isTimeAvailable(date, startTime, endTime, seatNum);
    }
}
