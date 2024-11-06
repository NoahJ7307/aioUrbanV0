package com.allinone.proja3.proja3.controller.facilities;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.facilities.GymDTO;
import com.allinone.proja3.proja3.dto.user.UserDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.facilities.Gym;
import com.allinone.proja3.proja3.model.facilities.GymParticipant;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.service.facilities.GymService;
import jakarta.persistence.EntityNotFoundException;
import jdk.swing.interop.SwingInterOpUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@Log4j2
@RestController
//@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/facilities/gym")
public class GymController {

    @Autowired
    private GymService service;
    @Autowired
    private UserRepository userRepository;

    //등록
    @PostMapping("/add")
    public ResponseEntity<GymDTO> newProgramPost (@RequestBody Gym gym) {
        System.out.println("gym: "+gym);
        Gym newPost = service.newProgramPost(gym);
        GymDTO response = service.entityToDto(newPost);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    //조회
    @GetMapping("/list")
    public PageResponseDTO<GymDTO> getList(PageRequestDTO pageRequestDTO) {
        System.out.println("get list controller: " + pageRequestDTO);
        PageResponseDTO<GymDTO> list = service.getNonDeletedPrograms(pageRequestDTO);
        System.out.println("after service list 120) : " +list);
        return  list;
    }
//    @GetMapping("/list")
//    public PageResponseDTO<GymDTO> getList(PageRequestDTO pageRequestDTO) {
//        System.out.println("get list controller: " + pageRequestDTO);
//        PageResponseDTO<GymDTO> list = service.getNonDeletedPrograms(pageRequestDTO);
//        System.out.println("after service list 120) : " +list);
//        return  service.getNonDeletedReservations(pageRequestDTO);
//    }
    //특정 게시물 조회 메서드
    @GetMapping("/detail/{programId}")
    public GymDTO getProgramPost(@PathVariable Long programId) {
        System.out.println("gym detail controller : " +programId);
        return service.getProgramPost(programId);
    }

    //수정
    @PutMapping("/detail/modify/{programId}")
    public Map<String, String> modify(
            @PathVariable(name="programId") Long programId,
            @RequestBody GymDTO gymDTO){
        gymDTO.setProgramId(programId);
        System.out.println("Modify : " + gymDTO);

        service.modify(gymDTO);
        return Map.of("RESULT", "SUCCESS");
    }

    //수정 버튼 클릭시 이전 데이터 내용 불러오기
    @GetMapping({"/detail/modify/{programId}"})
    public GymDTO readBeforePost(@PathVariable(name = "programId") Long programId) {
        System.out.println("데이터 조회" + programId);
        return service.findDataByProgramId(programId);
    }


    //삭제
    @PostMapping("/delete")
    public void deletePost(@RequestBody Long programId) {
        System.out.println("programId" + programId);
            service.remove(programId);
    }

    //참가자 등록
    @PostMapping("/detail/register/{programId}")
    public ResponseEntity<String> registerParticipant(@PathVariable Long programId,  @RequestBody User user) {
        String response = service.registerParticipant(programId, user);
        if(response.equals("Already"))   return new ResponseEntity<>("A001",HttpStatus.OK);
        else if(response.equals("Done"))   return new ResponseEntity<>("A002",HttpStatus.OK);
        else return new ResponseEntity<>("A003",HttpStatus.OK);
    }
    // 대기자 등록
    @PostMapping("/detail/waitlist/{programId}")
    public ResponseEntity<String> registerWaitlist(@PathVariable Long programId, @RequestBody User user) {
        String response = service.registerWaitlist(programId, user);

        switch (response) {
            case "Already registered":
                return new ResponseEntity<>("B000", HttpStatus.OK); // 이미 정식 참가자인 경우
            case "Already on waitlist":
                return new ResponseEntity<>("B001", HttpStatus.OK); // 이미 대기자인 경우
            case "Added to waitlist":
                return new ResponseEntity<>("B002", HttpStatus.OK); // 대기자 등록 성공
            default:
                return new ResponseEntity<>("B003", HttpStatus.INTERNAL_SERVER_ERROR); // 기타 에러
        }
    }
//    @PostMapping("/detail/waitlist/{programId}")
//    public ResponseEntity<String> registerWaitlist(@PathVariable Long programId, @RequestBody User user) {
//        String response = service.registerWaitlist(programId, user);
//
//        if("Already registered".equals(response)) {
//            return new ResponseEntity<>("B000", HttpStatus.OK);//이미 정식참가자인경우
//        }else if ("Already on waitlist".equals(response)) {
//            return new ResponseEntity<>("B001", HttpStatus.OK); // 이미 대기자인 경우
//        } else if ("Added to waitlist".equals(response)) {
//            return new ResponseEntity<>("B002", HttpStatus.OK); // 대기자 등록 성공
//        } else {
//            return new ResponseEntity<>("B003", HttpStatus.OK); // 기타 에러
//        }
//    }


    //참가 신청한 명단 불러오기
    @GetMapping("/{programId}/participants")
    public ResponseEntity<List<UserDTO>> getRegisteredUsers(@PathVariable Long programId) {
        List<UserDTO> participants = service.getRegisterdUsers(programId);
        System.out.println("participants1105 " + participants);
        return ResponseEntity.ok(participants);
    }
    //대기자 명단 불러오기
    @GetMapping("/{programId}/waitlist")
    public ResponseEntity<List<UserDTO>> getWaitlistUsers(@PathVariable Long programId) {
        List<UserDTO> waitlist = service.getWaitlistUsers(programId);
        System.out.println("waitlists1105 " + waitlist);
        return ResponseEntity.ok(waitlist);
    }

    //참가취소 메서드
//    @DeleteMapping("/{programId}/participants/cancel")
//    public ResponseEntity<String> cancelParticipant(@PathVariable Long programId, @RequestBody User user){
//        String response = service.cancelParticipant(programId, user);
//        if(response.equals("Not Found")) {
//            return new ResponseEntity<>("Participant not found", HttpStatus.NOT_FOUND);
//        }else if (response.equals("Canceled")) {
//            return new ResponseEntity<>("Cancellation successful", HttpStatus.OK);
//        }else {
//            return new ResponseEntity<>("Error during cancellation", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }







}
