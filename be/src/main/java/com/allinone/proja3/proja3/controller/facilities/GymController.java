package com.allinone.proja3.proja3.controller.facilities;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.dto.facilities.GymDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.facilities.Gym;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.service.facilities.GymService;
import com.allinone.proja3.proja3.service.facilities.GymServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
        return  service.getNonDeletedPrograms(pageRequestDTO);
    }
    //특정 게시물 조회 메서드
    @GetMapping("/detail/{programId}")
    public GymDTO getProgramPost(@PathVariable Long programId) {
        System.out.println("gym detail controller : " +programId);
        return service.getProgramPost(programId);
    }
    @PutMapping("/detail/modify/{programId}")
    public Map<String, String> modify(
            @PathVariable(name="programId") Long programId,
            @RequestBody GymDTO gymDTO){
        gymDTO.setProgramId(programId);
        System.out.println("Modify : " + gymDTO);

        service.modify(gymDTO);
        return Map.of("RESULT", "SUCCESS");
    }
    @GetMapping({"/detail/modify/{programId}"})
    public Gym readBeforePost(@PathVariable(name = "programId") Long programId) {
        System.out.println("데이터 조회" + programId);
        return service.findDataByProgramId(programId);
    }


    //삭제
    @PostMapping("/delete")
    public void deletePost(@RequestBody Long programId) {
        System.out.println("programId" + programId);
            service.remove(programId);
    }
//    @GetMapping("/list/{programId}")
//    public PageResponseDTO<GymDTO> getProgramPost (@PathVariable Long programId, PageRequestDTO pageRequestDTO){
//        return service.getProgramPost(programId, pageRequestDTO);
//    }


}
