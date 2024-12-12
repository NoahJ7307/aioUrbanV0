package com.allinone.proja3.proja3.dataInsert;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.parking.EntryExitCarDTO;
import com.allinone.proja3.proja3.dto.parking.HouseholdDTO;
import com.allinone.proja3.proja3.dto.parking.RegularParkingDTO;
import com.allinone.proja3.proja3.dto.parking.VisitParkingDTO;
import com.allinone.proja3.proja3.dto.user.UserDTO;
import com.allinone.proja3.proja3.dto.user.UserSearchDataDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.UserRole;
import com.allinone.proja3.proja3.model.parking.Household;
import com.allinone.proja3.proja3.model.parking.HouseholdPK;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.service.UserService;
import com.allinone.proja3.proja3.service.parking.EntryExitCarService;
import com.allinone.proja3.proja3.service.parking.RegularParkingService;
import com.allinone.proja3.proja3.service.parking.VisitParkingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@SpringBootTest
public class DataInsertJSG {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RegularParkingService regularParkingService;
    @Autowired
    private VisitParkingService visitParkingService;
    @Autowired
    private EntryExitCarService entryExitCarService;


    @Test
    public void insertLoginUser() {
        User root = User.builder()
                .userName("루트")
                .phone("01000000000")
                .dong("9999")
                .ho("9999")
                .pw(passwordEncoder.encode("1"))
                .build();
        root.addRole(UserRole.ROOT);
        userRepository.save(root);

        User admin = User.builder()
                .userName("관리자")
                .phone("01011111111")
                .dong("8888")
                .ho("8888")
                .pw(passwordEncoder.encode("1"))
                .build();
        admin.addRole(UserRole.ADMIN);
        userRepository.save(admin);

        User user = User.builder()
                .userName("일반유저")
                .phone("01022222222")
                .dong("101")
                .ho("101")
                .pw(passwordEncoder.encode("1"))
                .build();
        user.addRole(UserRole.USER);
        userRepository.save(user);
    }

    @Test
    public void insertPending() {
        for (int i = 0; i < 99; i++) {
            int randNum1 = 1000+ (int)(Math.random()*8000);
            int randNum2 = 1000+ (int)(Math.random()*8000);
            User userPending = User.builder()
                    .userName((i+1)+"번 승인대기 유저")
                    .phone("011"+randNum1+randNum2)
                    .dong((int)(randNum2*0.001)+"01")
                    .ho((int)(Math.random()*20)+"0"+(int)(randNum1*0.001))
                    .pw(passwordEncoder.encode("1"))
                    .build();
            userPending.addRole(UserRole.PENDING);
            userRepository.save(userPending);
        }
    }

    @Test
    public void insertUser() {
        String[] userList = {
                "김경중","김시준","김영준","김혜수","박보근",
                "박지열","서혜인","안성주","유세현","윤선호",
                "이충만","이혜리","조무암","최현재","허태찬",
                "정승균","전재윤","최유림"};
        for (String s : userList) {
            int randNum = 3000 + (int) (Math.random() * 7000);
            User user = User.builder()
                    .userName(s)
                    .phone("0100000" + randNum)
                    .dong((int) (randNum * 0.001) + "01")
                    .ho((int) (Math.random() * 20) + "0" + (int) (randNum * 0.001))
                    .pw(passwordEncoder.encode("1"))
                    .build();
            user.addRole(UserRole.USER);
            userRepository.save(user);
        }
    }

    @Test
    public void insertRegularP(){
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .size(1000)
                .page(1)
                .build();
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("uno").descending());
        String[] userList = {
                "김경중","김시준","김영준","김혜수","박보근",
                "박지열","서혜인","안성주","유세현","윤선호",
                "이충만","이혜리","조무암","최현재","허태찬",
                "정승균","전재윤","최유림"};
        for (String s : userList) {
            int randNum = (int)(Math.random()*100);
        UserSearchDataDTO userSearchDataDTO = UserSearchDataDTO.builder()
                .searchCategory("name")
                .searchValue(s)
                .build();
            PageResponseDTO<UserDTO> userDTO = userService.getAllSearchList(pageRequestDTO, userSearchDataDTO);
            userDTO.getDtoList().forEach(user -> {
                HouseholdPK householdPK = HouseholdPK.builder()
                        .dong(user.getDong())
                        .ho(user.getHo())
                        .build();
                RegularParkingDTO regularParkingDTO = RegularParkingDTO.builder()
                        .name(user.getUserName())
                        .household(Household.builder().householdPK(householdPK).build())
                        .householdDTO(HouseholdDTO.builder()
                                .dong(user.getDong())
                                .ho(user.getHo())
                                .build())
                        .carNum(randNum+s.substring(2)+randNum+randNum)
                        .phone(user.getPhone())
                        .build();
                regularParkingService.register(regularParkingDTO);
            });
        }
    }

    @Test
    public void insertVisitP(){
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .size(1000)
                .page(1)
                .build();
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("uno").descending());
        String[] userList = {
                "김경중","김시준","김영준","김혜수","박보근",
                "박지열","서혜인","안성주","유세현","윤선호",
                "이충만","이혜리","조무암","최현재","허태찬",
                "정승균","전재윤","최유림"};
        for (int i = 0; i < 10; i++) {
            for (String s : userList) {
                int randNum = (int)(Math.random()*100);
            UserSearchDataDTO userSearchDataDTO = UserSearchDataDTO.builder()
                    .searchCategory("name")
                    .searchValue(s)
                    .build();
                PageResponseDTO<UserDTO> userDTO = userService.getAllSearchList(pageRequestDTO, userSearchDataDTO);
                userDTO.getDtoList().forEach(user -> {
                    HouseholdPK householdPK = HouseholdPK.builder()
                            .dong(user.getDong())
                            .ho(user.getHo())
                            .build();
                    VisitParkingDTO visitParkingDTO = VisitParkingDTO.builder()
                            .name(user.getUserName()+" 방문자")
                            .household(Household.builder().householdPK(householdPK).build())
                            .householdDTO(HouseholdDTO.builder()
                                    .dong(user.getDong())
                                    .ho(user.getHo())
                                    .build())
                            .carNum(randNum+s.substring(2)+randNum+randNum)
                            .phone(user.getPhone())
                            .expectedDate(LocalDate.now())
                            .build();
                    visitParkingService.register(visitParkingDTO);
                });
            }
        }
    }

    @Test
    public void insertEntryP(){
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .size(1000)
                .page(1)
                .build();
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("uno").descending());
        String[] userList = {
                "김경중","김시준","김영준","김혜수","박보근",
                "박지열","서혜인","안성주","유세현","윤선호",
                "이충만","이혜리","조무암","최현재","허태찬",
                "정승균","전재윤","최유림"};
        for (int i = 1; i <= 10; i++) {
            for (String s : userList) {
                int randNum = 10+(int)(Math.random()*90);
            UserSearchDataDTO userSearchDataDTO = UserSearchDataDTO.builder()
                    .searchCategory("name")
                    .searchValue(s)
                    .build();
                PageResponseDTO<UserDTO> userDTO = userService.getAllSearchList(pageRequestDTO, userSearchDataDTO);
                userDTO.getDtoList().forEach(user -> {
                    EntryExitCarDTO entryExitCarDTO = EntryExitCarDTO.builder()
                            .dong(user.getDong())
                            .ho(user.getHo())
                            .carNum(randNum+s.substring(2)+randNum+randNum)
                            .entryDate(LocalDate.now())
                            .build();
                    entryExitCarService.entry(entryExitCarDTO);
                    if (user.getUno()%2 == 0L){
                        entryExitCarService.exit(entryExitCarDTO);
                    }
                });
            }
        }
    }
}
