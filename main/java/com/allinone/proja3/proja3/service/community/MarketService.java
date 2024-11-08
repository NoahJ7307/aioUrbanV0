package com.allinone.proja3.proja3.service.community;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.community.MarketDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.community.Market;

import java.util.List;


public interface MarketService {
    List<MarketDTO> findDataByUno(Long uno);
    PageResponseDTO<MarketDTO> findAllmarket(PageRequestDTO pageRequestDTO);
    Market createPost (User user, Market Market);
    MarketDTO entityDto(Market market);
    MarketDTO getMno(Long mno ,User user);
    void deletePost(Long mno, Long uno);
    boolean modify(MarketDTO marketDTO);

}
