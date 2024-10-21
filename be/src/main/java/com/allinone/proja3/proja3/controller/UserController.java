package com.allinone.proja3.proja3.controller;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.UserDTO;
import com.allinone.proja3.proja3.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/")
    public Long register(@RequestBody UserDTO userDTO){
        System.out.println("register......"+userDTO);
        Long uno = service.register(userDTO);
        return uno;
    }

    @GetMapping("/{uno}")
    public UserDTO read(@PathVariable(name = "uno") Long uno){
        return service.getOne(uno);
    }

    @PutMapping("/{uno}")
    public void modify(@PathVariable(name = "uno") Long uno, UserDTO userDTO){
        service.modify(userDTO);
    }

    @PostMapping("/delete")
    public void deleteChecked(@RequestBody List<Long> checkedUno){
        checkedUno.forEach(service::remove);
    }
}
