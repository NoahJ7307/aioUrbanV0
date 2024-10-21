package com.allinone.proja3.proja3.controller;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.UserDTO;
import com.allinone.proja3.proja3.model.UserRole;
import com.allinone.proja3.proja3.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService service;

    @GetMapping("/list")
    public PageResponseDTO<UserDTO> getList(PageRequestDTO pageRequestDTO){
        System.out.println("get list : "+ pageRequestDTO);
        return service.getList(pageRequestDTO);
    }

    @GetMapping("/approval_list")
    public PageResponseDTO<UserDTO> getApprovalList(PageRequestDTO pageRequestDTO){
        System.out.println("get list : "+ pageRequestDTO);
        return service.getApprovalList(pageRequestDTO);
    }

    @GetMapping("/approval")
    public boolean getApprovalStatus(Long uno){
        System.out.println("ApprovalStatus : "+uno);
        return service.approvalStatus(uno);
    }

    @PostMapping("/approval")
    public void PostApproval(@RequestBody Map<String, Long> request){
        Long uno = request.get("uno");
        System.out.println("Approval : "+uno);
        service.addRole(uno, UserRole.USER);
    }

    @PostMapping("/")
    public void register(@RequestBody UserDTO userDTO){
        System.out.println("register : "+userDTO);
        Long uno = service.register(userDTO);
        service.addRole(uno, UserRole.PENDING);
    }

    @GetMapping("/{uno}")
    public UserDTO read(@PathVariable(name = "uno") Long uno){
        System.out.println("read : "+uno);
        return service.getOne(uno);
    }

    @PutMapping("/{uno}")
    public void modify(@PathVariable(name = "uno") Long uno, @RequestBody UserDTO userDTO){
        System.out.println("modify : "+userDTO);
        service.modify(userDTO);
    }

    @PostMapping("/delete")
    public void deleteChecked(@RequestBody List<Long> checkedUno){
        checkedUno.forEach(uno ->{
            service.clearRole(uno);
            service.remove(uno);
        });
    }
}
