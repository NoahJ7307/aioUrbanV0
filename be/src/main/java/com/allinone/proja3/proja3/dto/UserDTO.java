package com.allinone.proja3.proja3.dto;

import lombok.*;

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
}



