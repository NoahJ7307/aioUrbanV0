package com.allinone.proja3.proja3.dto.facilities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProgramEnrolleeDTO {
    private Long applicationId;
    private LocalDateTime applicationDate; //접수일
    private String applicationState; //접수 상태 //신청완료인지 대기자인지

    //user에서 가져올데이터
    private Long uno; // 사용자 ID
    private String userName; // 사용자 이름 추가
    private String phone;

    //program에서 가져올 데이터
    private long programId;
    private String title;
    private String content;

}
