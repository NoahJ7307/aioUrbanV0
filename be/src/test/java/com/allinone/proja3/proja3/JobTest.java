package com.allinone.proja3.proja3;

import com.allinone.proja3.proja3.dto.community.JobDTO;
import com.allinone.proja3.proja3.model.community.Job;
import com.allinone.proja3.proja3.repository.community.JobRepository;
import com.allinone.proja3.proja3.service.community.JobService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class JobTest {

    @Autowired
    private JobService jobService;

    @Autowired
    private JobRepository jobRepository;

    // 테스트 데이터 생성
    @Test
    public void setUp() {

        for (int i = 1; i <= 50; i++) {
            Job job = Job.builder()
                    .title("채용공고 제목 " + i)
                    .companyName("회사 " + i)
                    .location("위치 " + i)
                    .salary("급여 " + (i * 1000) + "만원")
                    .applyUrl("https://example.com/apply/" + i)
                    .latitude(37.34911 + (i * 0.0001))
                    .longitude(127.10611 + (i * 0.0001))
                    .postedDate(LocalDate.now())
                    .closingDate(LocalDate.now().plusDays(7))
                    .employmentType(i % 2 == 0 ? "정규직" : "계약직")
                    .experienceRequired(i % 2 == 0 ? "경력 3년 이상" : "신입")
                    .workHours("9시 ~ 6시")
                    .jobLevel(i % 2 == 0 ? "시니어" : "주니어")
                    .build();
            jobRepository.save(job);
        }
    }

    // 채용공고 리스트가 10개인지 테스트
    @Test
    public void testGetAllJobs() {
        List<JobDTO> jobList = jobService.getAllJobs();
        assertEquals(10, jobList.size(), "채용공고는 10개여야 합니다.");
    }

    // 채용공고 ID로 조회 테스트
    @Test
    public void testGetJobById() {
        Job job = jobRepository.findAll().get(0); // 첫 번째 채용공고를 조회
        JobDTO jobDTO = jobService.getJobById(job.getId());
        assertNotNull(jobDTO, "채용공고를 조회할 수 있어야 합니다.");
        assertEquals(job.getTitle(), jobDTO.getTitle(), "채용공고 제목이 일치해야 합니다.");
    }

    // 채용공고 생성 테스트
    @Test
    public void testCreateJob() {
        JobDTO newJobDTO = new JobDTO();
        newJobDTO.setTitle("그린컴퓨터아카데미 채용공고");
        newJobDTO.setCompanyName("그린컴퓨터아카데미");
        newJobDTO.setLocation("미금역 미친교회 앞");
        newJobDTO.setSalary("연봉 20억");
        newJobDTO.setApplyUrl("https://greenart.co.kr/?ACE_REF=adwords_g&ACE_KW=%EA%B7%B8%EB%A6%B0%EC%BB%B4%ED%93%A8%ED%84%B0%EC%95%84%EC%B9%B4%EB%8D%B0%EB%AF%B8&gad_source=1&gclid=Cj0KCQiA88a5BhDPARIsAFj595i70HnYBe7BRDs2t_BWhCvcfW8Gb_5m_LBQkJ2CrAqxzEXIUogHBaoaAopTEALw_wcB");
        newJobDTO.setLatitude(37.34971482603357);
        newJobDTO.setLongitude(127.10699487749355);
        newJobDTO.setPostedDate(LocalDate.now());
        newJobDTO.setClosingDate(LocalDate.now().plusDays(10));
        newJobDTO.setEmploymentType("정규직");
        newJobDTO.setExperienceRequired("경력 3년 이상");
        newJobDTO.setWorkHours("9시 ~ 6시");
        newJobDTO.setJobLevel("팀장");

        JobDTO createdJobDTO = jobService.createJob(newJobDTO);
        assertNotNull(createdJobDTO, "새로운 채용공고가 생성되어야 합니다.");

    }
}
