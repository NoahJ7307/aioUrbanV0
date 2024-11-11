package com.allinone.proja3.proja3.controller.community;


import com.allinone.proja3.proja3.dto.community.JobDTO;
import com.allinone.proja3.proja3.service.community.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/communities/info")
public class JobController {

    @Autowired
    private JobService jobService;

    // 채용공고 리스트 조회
    @GetMapping("/jobs")
    public List<JobDTO> getAllJobs() {
        return jobService.getAllJobs();
    }

    // 채용공고 ID로 조회
    @GetMapping("/jobs/{id}")
    public JobDTO getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    // 채용공고 생성
    @PostMapping("/jobs")
    public JobDTO createJob(@RequestBody JobDTO jobDTO) {
        return jobService.createJob(jobDTO);
    }
}
