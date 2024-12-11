package com.allinone.proja3.proja3.service.community;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.community.MarketDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.community.Market;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MarketService {
    // ================= 조회 관련 메서드 =================//
    List<MarketDTO> findDataByUno(Long uno);

    PageResponseDTO<MarketDTO> findAllmarket(PageRequestDTO pageRequestDTO);

    MarketDTO findByMno(Long mno);

    Market findMarketById(Long mno);

    User findByUno(Long uno);

    // ================= 등록 관련 메서드 =================//
    Market createPost(User user, Market market, MultipartFile thumbnail, List<MultipartFile> images) throws IOException;

    // ================= 수정 관련 메서드 =================//
    boolean modify(MarketDTO marketDTO, MultipartFile thumbnail, List<MultipartFile> images);

    // ================= 삭제 관련 메서드 =================//
    void deletePost(Long mno, Long uno); // 일반삭제

    void deletePostByAdmin(Long mno); // 관리자삭제

    // ================= 유틸리티 메서드 =================//
    MarketDTO entityDto(Market market);
}