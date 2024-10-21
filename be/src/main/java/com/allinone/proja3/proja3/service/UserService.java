package com.allinone.proja3.proja3.service;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.UserDTO;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface UserService {
    Long register(UserDTO userDTO);
    PageResponseDTO<UserDTO> getList(PageRequestDTO pageRequestDTO);
    UserDTO getOne(Long uno);
    void modify(UserDTO userDTO);
    void remove(Long uno);
}
