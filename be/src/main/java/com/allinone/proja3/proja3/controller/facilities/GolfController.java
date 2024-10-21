package com.allinone.proja3.proja3.controller.facilities;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.service.facilities.GolfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/facilities/golf")
public class GolfController {
    private final GolfService service;

//    @PutMapping("/modify")
//    public void modify (@PathVariable (name = "reservationId") Long reservationId, GolfDTO golfDTO) {
//        service.modify(golfDTO);
//    }

    //예약 조회 페이지를 위한 로직
    @GetMapping("/list")
    public PageResponseDTO<GolfDTO> getList(PageRequestDTO pageRequestDTO){
        System.out.println("get list 가져온다 : " + pageRequestDTO);

        return service.getList(pageRequestDTO);
    }

    //관리자를 위한 예약 삭제
    @PostMapping("/delete")
    public void deleteChecked(@RequestBody List<Long> checkedUno) {checkedUno.forEach(service::remove);}

    //관리자를 위한 예약 수정
    @PostMapping("/{reservationId}")
    public void modify(@PathVariable(name = "reservationId") Long reservationId, GolfDTO golfDTO) {
        service.modify(golfDTO);
    }


    //특정 uno 조회 페이지를 위한 로직
//    @GetMapping("/userlist/{uno}")
//    public PageResponseDTO<GolfDTO> getUserReservations(@PathVariable Long uno, PageRequestDTO pageRequestDTO) {
//        System.out.println("User reservations for uno: " + uno);
//        return  service.getUserReservations(uno, pageRequestDTO);
//    }
   //특정 uno 조회 페이지를 위한 로직
//    @GetMapping("/userlist/{uno}")
//    public PageResponseDTO<GolfDTO> getUserReservations(@PathVariable Long uno, PageRequestDTO pageRequestDTO) {
//        System.out.println("User reservations for uno: " + uno);
//        return  service.getUserReservations(uno, pageRequestDTO);
//    }

    //예약 등록을 위한 로직
    @PostMapping("/reserve")
    public Long register(@RequestBody GolfDTO golfDTO) {
        System.out.println("golf register...."+golfDTO);

        //날짜 ,시간,좌석번호로 예약 목록 중복 조회 메서드
        if(!service.isTimeAvailable(golfDTO.getDate(), golfDTO.getStartTime(), golfDTO.getEndTime(), golfDTO.getTeeBox())){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "해당 시간대는 이미 예약이 있습니다.");
        }


        Long reservationId =  service.register(golfDTO);
        return reservationId;
    }

    //예약 가능한지 확인하는 메서드
    @GetMapping("/checkAvailability")
    public boolean checkAvailability (@RequestParam LocalDate date,
                                      @RequestParam LocalTime startTime,
                                      @RequestParam LocalTime endTime,
                                      @RequestParam int teeBox){
        return service.isTimeAvailable(date, startTime,endTime,teeBox);
    }





}
