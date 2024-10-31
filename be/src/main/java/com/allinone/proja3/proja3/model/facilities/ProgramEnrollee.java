package com.allinone.proja3.proja3.model.facilities;

import com.allinone.proja3.proja3.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_program_enrollee")
@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProgramEnrollee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    private LocalDateTime applicationDate; //접수일
    private String applicationState; //접수 상태 //신청완료인지 대기자인지

    @ManyToOne(fetch = FetchType.LAZY) // User와의 관계
    @JoinColumn(name = "uno", referencedColumnName = "uno") // Community 테이블의 uno 외래 키 설정
    private User user; // 작성자 (User 엔티티의 uno)

    @ManyToOne(fetch = FetchType.LAZY) // User와의 관계
    @JoinColumn(name = "programId", referencedColumnName = "programId") // Community 테이블의 uno 외래 키 설정
    private Gym gym; // 작성자 (User 엔티티의 uno)

}
