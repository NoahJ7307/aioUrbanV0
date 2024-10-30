package com.allinone.proja3.proja3.model.facilities;

import com.allinone.proja3.proja3.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "tbl_gym")
@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Gym {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long programId;

    private LocalDate programStartDate; //프로그램 시작일
    private LocalDate programEndDate; //프로그램 종료일
    private LocalTime programStartTime; //프로그램 시작 시간
    private LocalTime programEndTime;//프로그램 종료 시간
    private LocalDateTime applicationEndDate; //접수기간 종료일
    private LocalDateTime applicationStartDate; //접수기간 시작일
    private int participantLimit; //모집정원
    private String title;
    private String target;
    private String content;
    private boolean delFlag;
    private ProgramState programState;//프로그램등록 상태 접수마감(:대기)/접수중/접수전/프로그램종료

//    @ManyToOne(fetch = FetchType.LAZY) // User와의 관계
//    @JoinColumn(name = "uno", referencedColumnName = "uno") // Community 테이블의 uno 외래 키 설정
//    private User user; // 작성자 (User 엔티티의 uno)

    //데이터 수정에 대한 메서드
    public void changeProgramStartDate (LocalDate programStartDate) {this.programStartDate = programStartDate;}
    public void changeProgramEndDate (LocalDate programEndDate) { this.programEndDate = programEndDate;}
    public void changeProgramStartTime (LocalTime programStartTime) {this.programStartTime = programStartTime;}
    public void changeProgramEndTime (LocalTime programEndTime) {this.programEndTime = programEndTime;}
    public void changeTitle (String title) { this.title = title;}
    public void changeTarget (String target) { this.target = target;}
    public void changeContent (String content) {this.content = content; }
    public void changeApplicationStartDate (LocalDateTime applicationStartDate) {this.applicationStartDate = applicationStartDate; }
    public void changeApplicationEndDate (LocalDateTime applicationEndDate) {this.applicationEndDate = applicationEndDate; }
    public void changeParticipantLimit (int participantLimit) {this.participantLimit = participantLimit; }
    public void changeProgramState (ProgramState programState) {this.programState = programState; }

}
