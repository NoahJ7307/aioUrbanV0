package com.allinone.proja3.proja3.controller;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.UserDTO;
import com.allinone.proja3.proja3.model.UserRole;
import com.allinone.proja3.proja3.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/main")
public class MainController {
    private final UserService service;

    @PostMapping("/join")
    public void register(@RequestBody UserDTO userDTO){
        System.out.println("register : "+userDTO);
        Long uno = service.register(userDTO);
        service.addRole(uno, UserRole.PENDING);
    }
}
