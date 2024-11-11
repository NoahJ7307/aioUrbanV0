package com.allinone.proja3.proja3.dto.community;

import lombok.Data;

import java.time.LocalDate;

@Data
public class JobDTO {

    private String title;  // 채용공고 제목
    private String companyName;  // 회사 이름
    private String location;  // 근무지
    private String salary;  // 급여
    private String applyUrl;  // 이력서 신청 URL
    private Double latitude;  // 위도
    private Double longitude;  // 경도
    private LocalDate postedDate;  // 게시일
    private LocalDate closingDate;  // 마감일

    // 추가된 필드
    private String employmentType;  // 근무 형태
    private String experienceRequired;  // 경력 요구 사항
    private String workHours;  // 근무 시간
    private String jobLevel;  // 직급


}
