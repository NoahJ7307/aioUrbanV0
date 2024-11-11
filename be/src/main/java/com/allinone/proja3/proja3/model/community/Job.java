package com.allinone.proja3.proja3.model.community;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tbl_job")
@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // 채용공고 ID

    private String title;  // 채용공고 제목
    private String companyName;  // 회사 이름
    private String location;  // 근무지
    private String salary;  // 급여
    private String applyUrl;  // 이력서 신청 URL
    private Double latitude;  // 위도
    private Double longitude;  // 경도
    private LocalDate postedDate;  // 게시일
    private LocalDate closingDate;  // 마감일
    private String employmentType;  // 근무 형태 (예: 정규직, 계약직, 인턴)
    private String experienceRequired;  // 경력 요구 사항 (예: 신입, 경력 3년 이상)
    private String workHours;  // 근무 시간 (예: 9시 ~ 6시)
    private String jobLevel;  // 직급 (예: 주니어, 시니어)


}
