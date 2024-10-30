package com.allinone.proja3.proja3.service;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.user.UserDTO;
import com.allinone.proja3.proja3.dto.user.UserSearchDataDTO;
import com.allinone.proja3.proja3.model.UserRole;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Transactional
public interface UserService {
    Long register(UserDTO userDTO);
    PageResponseDTO<UserDTO> getList(PageRequestDTO pageRequestDTO);
    PageResponseDTO<UserDTO> getApprovalList(PageRequestDTO pageRequestDTO);
    UserDTO getOne(Long uno);
    void putOne(UserDTO userDTO);
    void remove(Long uno);
    boolean approvalStatus(Long uno);
    void addRole(Long uno, UserRole role);
    void clearRole(Long uno);
    PageResponseDTO<UserDTO> getSearchList(PageRequestDTO pageRequestDTO, UserSearchDataDTO userSearchData);
}
