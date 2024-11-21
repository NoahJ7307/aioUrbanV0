package com.allinone.proja3.proja3.controller.facilities;

import com.allinone.proja3.proja3.dto.facilities.GymDTO;
import com.allinone.proja3.proja3.dto.facilities.GymMembershipDTO;
import com.allinone.proja3.proja3.dto.facilities.MembershipPlanDTO;
import com.allinone.proja3.proja3.dto.user.UserDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.facilities.GymMembership;
import com.allinone.proja3.proja3.model.facilities.MembershipPlan;
import com.allinone.proja3.proja3.model.mileage.Mileage;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.repository.mileage.MileageRepository;
import com.allinone.proja3.proja3.service.UserService;
import com.allinone.proja3.proja3.service.facilities.GymMembershipService;
import com.allinone.proja3.proja3.service.mileage.PaymentService;
import com.allinone.proja3.proja3.service.mileage.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Make sure frontend is running on port 3000
@RequestMapping("/api/facilities/gym")
@Log4j2
public class GymMembershipController {

    @Autowired
    private PaymentService paymentService;
    @Autowired
    private  GymMembershipService gymMembershipService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MileageRepository mileageRepository;

//    //사용자가 등록한 프로그램 목록 조회
//    @GetMapping("/myPage/{uno}")
//    public ResponseEntity<List<GymDTO>> getUserRegisteredPrograms(@PathVariable Long uno) {
//        // 사용자 uno로 등록된 프로그램 목록 조회
//        List<GymDTO> registeredPrograms = gymMembershipService.getUserRegisteredPrograms(uno);
//        //프로그램 목록 반환
//        if(registeredPrograms.isEmpty()) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.ok(registeredPrograms);
//    }
    //관리자가 이용권 등록하는 로직
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/membership/create/admin")
    public ResponseEntity<MembershipPlan> createGymMembership (
            @RequestBody MembershipPlanDTO membershipPlanDTO) {  // RequestBody 사용
        try {
            MembershipPlan newPlan = gymMembershipService.createGymMembershipPlan(
                    membershipPlanDTO.getMembershipType(),
                    membershipPlanDTO.getDurationMonths(),
                    membershipPlanDTO.getPrice()
            );
            System.out.println("101010:" + newPlan);
            return ResponseEntity.ok(newPlan);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    //관리자가 등록한 이용권 삭제
//    @PostMapping("/membership/delete/{membershipPlanId}")
    @DeleteMapping("/membership/delete/{membershipPlanId}")
    public ResponseEntity<String> deleteMembership(@PathVariable Long membershipPlanId) {
        try {
            gymMembershipService.deleteMembership(membershipPlanId); // 서비스 호출
            return ResponseEntity.ok("이용권이 삭제되었습니다.");
        } catch (Exception e) {
            System.out.println("121212:"+ e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제 중 오류가 발생했습니다.");
        }
//    public void deleteMembershipType(@RequestBody Long membershipPlanId) {
//        System.out.println("programId" + membershipPlanId);
//        gymMembershipService.deleteMembership(membershipPlanId);
    }
//    @PreAuthorize("hasRole('ADMIN')")
//    @PostMapping("/membership/create/admin")
//    public ResponseEntity<MembershipPlan> createGymMembership (
//            @RequestBody MembershipPlanDTO membershipPlanDTO) {
////            @RequestParam String membershipType, // 이용권 이름
////            @RequestParam int durationMonths, // 이용권 기간(개월)
////            @RequestParam int price) { //이용권 가격
//
//        try {
//            //관리자에 의해 이용권 생성
//            MembershipPlan newPlan = gymMembershipService.createGymMembershipPlan(membershipType,durationMonths, price);
//            System.out.println("1212" + newPlan);
//            return ResponseEntity.ok(newPlan);
//        }catch (Exception e){
//            return ResponseEntity.status(500).body(null);
//        }
//    }

//     사용자가 이용권을 구매하는 API
    @PostMapping("/membership/purchase")
    public ResponseEntity<GymMembership> purchaseGymMembership(
            @RequestBody GymMembershipDTO gymMembershipDTO){
        try {
            System.out.println("sss"+gymMembershipDTO);
            GymMembership gymMembership = gymMembershipService.purchaseMembership(gymMembershipDTO);
            return ResponseEntity.ok(gymMembership);
        }catch (Exception e) {
            System.out.println("sss"+gymMembershipDTO);
            return ResponseEntity.status(500).body(null);
        }
    }
    //등록한 이용권 반환하기(조회)
    @GetMapping("/membership/plans")
    public ResponseEntity<List<MembershipPlan>> getAllMembershipPlans() {
        List<MembershipPlan> plans = gymMembershipService.getAllMembershipPlans(); // 모든 이용권 가져오기
        return ResponseEntity.ok(plans); // JSON 응답 반환
    }
    //삭제한 이용권 반환 (조회) 관리자용 필요시 사용
//    @GetMapping("/membership/plans/admin")
//    public ResponseEntity<List<MembershipPlan>> getAllMembershipPlansForAdmin(@RequestParam(defaultValue = "false") boolean includeDeleted) {
//        List<MembershipPlan> plans = gymMembershipService.getAllMembershipPlans(includeDeleted);
//        return ResponseEntity.ok(plans);
//    }


//    public ResponseEntity<String> add(@RequestBody GymMembershipDTO dto) {
//        System.out.println("controller 100) " + dto);
//        System.out.println("Received data: " + dto.toString());
//        // DTO를 엔티티로 변환 후 저장
//        GymMembership gymMembership = gymMembershipService.createMembership(dto);
//        System.out.println("membership after 200) : " + gymMembership);
//
//        log.info("Gym Membership added and payment processed for user: {}", dto.getUno());
//
//        return new ResponseEntity<>("OK", HttpStatus.OK);
//    }


//    @PostMapping("/membership/add")
//    public ResponseEntity<String> add(@RequestBody GymMembershipDTO dto) {
//        System.out.println("controller 100) " +dto);
//        // Convert DTO to entity
//        GymMembership gymMembership = gymMembershipService.createMembership(dto);
//        System.out.println("membership after 200) : " + gymMembership);
////        UserDTO user = userService.getOne(dto.getUno()); //uno 정보로 user에 있는 동, 호를 알고 싶다
////        User user = userRepository.findById(dto.getUno())
////                .orElseThrow(() -> new RuntimeException("User not found"));
////        Mileage mileage = mileageRepository.findById(dto.getMileageId())
////                .orElseThrow(() -> new RuntimeException("Mileage not found"));
//
//        // Save the membership using the service
//        gymMembership = gymMembershipService.createMembership(dto);
//        System.out.println("membershsip after 200) : " +gymMembership);
//        log.info("Gym Membership added and payment processed for user: {}", dto.getUno());
////        paymentService.processUseMileage(user.getDong(), user.getHo(), dto.getUno(), dto.getAmount(), "헬스장 일일이용권이 결제되었습니다.");
//
//        return new ResponseEntity<>("OK", HttpStatus.OK);
//    }
}
