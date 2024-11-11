package com.allinone.proja3.proja3.service.community;

import com.allinone.proja3.proja3.dto.community.JobDTO;

import java.util.List;

public interface JobService {
    List<JobDTO> getAllJobs();  // 모든 채용공고 조회
    JobDTO getJobById(Long id);  // 채용공고 ID로 조회
    JobDTO createJob(JobDTO jobDTO);  // 채용공고 생성
}