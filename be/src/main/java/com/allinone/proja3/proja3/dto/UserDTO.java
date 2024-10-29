package com.allinone.proja3.proja3.dto;

import com.allinone.proja3.proja3.model.UserRole;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long uno;
    private int dong;
    private int ho;
    private String userName;
    private String phone;
    private String pw;
    private boolean delFlag;
    private List<UserRole> userRoleList;
}