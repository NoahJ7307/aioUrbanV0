package com.allinone.proja3.proja3.service.community;

import com.allinone.proja3.proja3.dto.community.JobDTO;
import com.allinone.proja3.proja3.model.community.Job;

import com.allinone.proja3.proja3.repository.community.JobRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Override
    public List<JobDTO> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public JobDTO getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        return convertToDTO(job);
    }

    @Override
    public JobDTO createJob(JobDTO jobDTO) {
        Job job = convertToEntity(jobDTO);
        job = jobRepository.save(job);
        return convertToDTO(job);
    }

    private JobDTO convertToDTO(Job job) {
        JobDTO dto = new JobDTO();
        dto.setTitle(job.getTitle());
        dto.setCompanyName(job.getCompanyName());
        dto.setLocation(job.getLocation());
        dto.setSalary(job.getSalary());
        dto.setApplyUrl(job.getApplyUrl());
        dto.setLatitude(job.getLatitude());
        dto.setLongitude(job.getLongitude());
        dto.setPostedDate(job.getPostedDate());
        dto.setClosingDate(job.getClosingDate());
        dto.setEmploymentType(job.getEmploymentType());
        dto.setExperienceRequired(job.getExperienceRequired());
        dto.setWorkHours(job.getWorkHours());
        dto.setJobLevel(job.getJobLevel());
        return dto;
    }

    private Job convertToEntity(JobDTO jobDTO) {
        Job job = new Job();
        job.setTitle(jobDTO.getTitle());
        job.setCompanyName(jobDTO.getCompanyName());
        job.setLocation(jobDTO.getLocation());
        job.setSalary(jobDTO.getSalary());
        job.setApplyUrl(jobDTO.getApplyUrl());
        job.setLatitude(jobDTO.getLatitude());
        job.setLongitude(jobDTO.getLongitude());
        job.setPostedDate(jobDTO.getPostedDate());
        job.setClosingDate(jobDTO.getClosingDate());
        job.setEmploymentType(jobDTO.getEmploymentType());
        job.setExperienceRequired(jobDTO.getExperienceRequired());
        job.setWorkHours(jobDTO.getWorkHours());
        job.setJobLevel(jobDTO.getJobLevel());
        return job;
    }
}
