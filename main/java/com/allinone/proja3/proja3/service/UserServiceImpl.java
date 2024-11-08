package com.allinone.proja3.proja3.service;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.user.UserDTO;
import com.allinone.proja3.proja3.dto.user.UserSearchDataDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.UserRole;
import com.allinone.proja3.proja3.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Long register(UserDTO userDTO) {
        System.out.println("register service : "+userDTO);
        String encodedPassword = passwordEncoder.encode(userDTO.getPw());
        userDTO.setPw(encodedPassword);
        User user = dtoToEntity(userDTO);
        User result = userRepository.save(user);
        System.out.println("register service : "+user);
        return result.getUno();
    }

    @Override
    public PageResponseDTO<UserDTO> getList(PageRequestDTO pageRequestDTO) {
        System.out.println("getList service");
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("uno").descending());

        Page<User> result = userRepository.notPendingList(UserRole.PENDING, pageable);// PENDING 이 아닌 유저만 필터링

        // entityToDto를 사용하여 엔티티 -> DTO 변환
        List<UserDTO> dtoList = result.get()
                .map(this::entityToDto)  // entityToDto 메서드를 사용하여 변환
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        return PageResponseDTO.<UserDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
    }

    @Override
    public PageResponseDTO<UserDTO> getSearchList(PageRequestDTO pageRequestDTO, UserSearchDataDTO userSearchDataDTO) {
        System.out.println("getSearchList service");
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("uno").descending());

        // 검색 필터
        Page<User> result;
        switch (userSearchDataDTO.getSearchCategory()){
            case "dong-ho": {
                String[] value = userSearchDataDTO.getSearchValue().split("-");
                String dong = value[0];
                String ho = value[1];
                result = userRepository.findByDongHo(dong, ho, pageable);
            } break;
            case "dong": result = userRepository.findByDong(userSearchDataDTO.getSearchValue(), pageable); break;
            case "ho": result = userRepository.findByHo(userSearchDataDTO.getSearchValue(), pageable); break;
            case "name": result = userRepository.findByName(userSearchDataDTO.getSearchValue(), pageable); break;
            case "phone": result = userRepository.findByPhone(userSearchDataDTO.getSearchValue(), pageable); break;
            default: result = Page.empty(pageable);
        }

        // entityToDto를 사용하여 엔티티 -> DTO 변환
        List<UserDTO> dtoList = result.get()
                .map(this::entityToDto)  // entityToDto 메서드를 사용하여 변환
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        return PageResponseDTO.<UserDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
    }

    @Override
    public PageResponseDTO<UserDTO> getApprovalList(PageRequestDTO pageRequestDTO) {
        System.out.println("getList service");
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("uno").descending());

        Page<User> result = userRepository.pendingList(UserRole.PENDING, pageable); // PENDING 유저만 필터링

        // entityToDto를 사용하여 엔티티 -> DTO 변환
        List<UserDTO> dtoList = result.get()
                .map(this::entityToDto)  // entityToDto 메서드를 사용하여 변환
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        return PageResponseDTO.<UserDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
    }

    @Override
    public UserDTO getOne(Long uno) {
        System.out.println("getOne service : "+uno);
        Optional<User> result = userRepository.findById(uno);
        User user = result.orElseThrow();
        System.out.println("getOne service : "+user);
        return entityToDto(user);
    }

    @Override
    public void putOne(UserDTO userDTO) {
        System.out.println("putOne service : "+userDTO);
        String encodedPassword = passwordEncoder.encode(userDTO.getPw());
        userDTO.setPw(encodedPassword);
        User user = dtoToEntity(userDTO);
        userRepository.save(user);
    }

    @Override
    public void remove(Long uno) {
        System.out.println("remove service : "+uno);
        userRepository.updateToDelete(uno, true);
    }

    @Override
    public boolean approvalStatus(Long uno) {
        System.out.println("approvalStatus service : "+uno);
        Optional<User> result = userRepository.findById(uno);
        User user = result.orElseThrow();
        return user.getUserRoleList().contains(UserRole.PENDING);
    }

    @Override
    public void addRole(Long uno, UserRole role) {
        System.out.println("addRoleUser service : "+uno);
        Optional<User> result = userRepository.findById(uno);
        User user = result.orElseThrow();
        user.clearRole();
        user.addRole(role);
        userRepository.save(user);
    }

    @Override
    public void clearRole(Long uno) {
        System.out.println("clearRole service : "+uno);
        Optional<User> result = userRepository.findById(uno);
        User user = result.orElseThrow();
        user.clearRole();
    }

    private User dtoToEntity(UserDTO userDTO) {
        return User.builder()
                .uno(userDTO.getUno())
                .dong(userDTO.getDong())
                .ho(userDTO.getHo())
                .userName(userDTO.getUserName())
                .phone(userDTO.getPhone())
                .pw(userDTO.getPw())
                .delFlag(userDTO.isDelFlag())
                .userRoleList(userDTO.getUserRoleList())
                .build();
    }

    private UserDTO entityToDto(User user) {
        return UserDTO.builder()
                .uno(user.getUno())
                .dong(user.getDong())
                .ho(user.getHo())
                .userName(user.getUserName())
                .phone(user.getPhone())
                .pw(user.getPw())
                .delFlag(user.isDelFlag())
                .userRoleList(user.getUserRoleList())
                .build();
    }
}
