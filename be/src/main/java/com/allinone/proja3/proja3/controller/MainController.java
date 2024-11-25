package com.allinone.proja3.proja3.controller;

import com.allinone.proja3.proja3.dto.user.UserDTO;
import com.allinone.proja3.proja3.model.UserRole;
import com.allinone.proja3.proja3.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/main")
public class MainController {
    private final UserService userService;

    @PostMapping("/join")
    public void register(@RequestBody UserDTO userDTO){
        System.out.println("register : "+userDTO);
        Long uno = userService.register(userDTO);
        userService.addRole(uno, UserRole.PENDING);
    }

    @PostMapping("/verify")
    public String verifyPhone(@RequestBody String phone){
        System.out.println("verify : "+ phone);
        return userService.verify(phone);
    }
}
