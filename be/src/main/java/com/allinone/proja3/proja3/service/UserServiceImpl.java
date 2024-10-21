package com.allinone.proja3.proja3.service;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.UserDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public Long register(UserDTO userDTO) {
        User user = dtoToEntity(userDTO);
        User result = userRepository.save(user);
        return result.getUno();
    }

    @Override
    public PageResponseDTO<UserDTO> getList(PageRequestDTO pageRequestDTO) {
        System.out.println("getList.....");
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("uno").descending());

        Page<User> result = userRepository.selectList(pageable);

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
        Optional<User> result = userRepository.findById(uno);
        User user = result.orElseThrow();
        return entityToDto(user);
    }

    @Override
    public void modify(UserDTO userDTO) {
        User user = dtoToEntity(userDTO);
        userRepository.save(user);
    }

    @Override
    public void remove(Long uno) {
        userRepository.updateToDelete(uno, true);
    }


    private User dtoToEntity(UserDTO userDTO){
        return User.builder()
                .uno(userDTO.getUno())
                .dong(userDTO.getDong())
                .ho(userDTO.getHo())
                .userName(userDTO.getUserName())
                .phone(userDTO.getPhone())
                .pw(userDTO.getPw())
                .delFlag(userDTO.isDelFlag())
                .build();
    }

    private UserDTO entityToDto(User user){
        return UserDTO.builder()
                .uno(user.getUno())
                .dong(user.getDong())
                .ho(user.getHo())
                .userName(user.getUserName())
                .phone(user.getPhone())
                .pw(user.getPw())
                .delFlag(user.isDelFlag())
                .build();
    }
}
