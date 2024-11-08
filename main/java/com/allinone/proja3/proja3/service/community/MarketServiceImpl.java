package com.allinone.proja3.proja3.service.community;

import com.allinone.proja3.proja3.dto.PageRequestDTO;
import com.allinone.proja3.proja3.dto.PageResponseDTO;
import com.allinone.proja3.proja3.dto.community.AnnounceDTO;
import com.allinone.proja3.proja3.dto.community.MarketDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.community.Market;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.repository.community.CommunityMarketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MarketServiceImpl implements MarketService {
    private final CommunityMarketRepository repository;
    private final UserRepository userRepository; // UserRepository 주입

    @Override
    public PageResponseDTO<MarketDTO> findAllmarket(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize()
        , Sort.by("mno").descending());
        Page<Market> result = repository.findAll(pageable);

        List<MarketDTO> dtoList = result.getContent().stream()
                .map(this::entityDto)
                .collect(Collectors.toList());

        return PageResponseDTO.<MarketDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();
    }


    @Override
    public Market createPost(User user, Market market) {
        market.setUser(user);
        market.setImageUrl(market.getImageUrl());
        market.setThumbnailUrl(market.getThumbnailUrl());
        return repository.save(market);
    }

    @Override
    public MarketDTO entityDto(Market market) {
        return MarketDTO.builder()
                .mno(market.getMno())
                .title(market.getTitle())
                .content(market.getContent())
                .price(market.getPrice())
                .imageUrl(market.getImageUrl())
                .thumbnailUrl(market.getThumbnailUrl())
                .createdAt(market.getCreatedAt())
                .updatedAt(market.getUpdatedAt())
                .userId(market.getUser().getUno())
                .userName(market.getUser().getUserName())
                .build();
    }

    @Override
    public MarketDTO getMno(Long mno, User user) {
        Market market = repository.findById(mno).orElseThrow(()->new IllegalArgumentException("읽었다"+mno));
        return new MarketDTO(market.getMno(),market.getTitle(),market.getContent(),market.getImageUrl(),market.getThumbnailUrl(),market.getPrice());
    }

    @Override
    public void deletePost(Long pno, Long uno) {
        // 게시글을 찾고, 해당 게시글이 로그인한 사용자(uno)의 것인지 확인
        Optional<Market> announceDelete = repository.findById(pno);

        if (announceDelete.isPresent()) {
            Market Market = announceDelete.get();
            // 삭제 권한 체크: 게시글 작성자와 현재 로그인한 사용자의 uno가 일치하는지 확인
            if (announceDelete.get().getUser().getUno().equals(uno)) {
                repository.delete(Market);
                return; // 삭제 성공
            } else {
                return; // 삭제 권한 없음
            }
        }
        throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
    }

    @Override
    public boolean modify(MarketDTO marketDTO) {
        Optional<Market> optionalPost = repository.findById(marketDTO.getMno());

        if (optionalPost.isPresent()) {
            Market post = optionalPost.get();
            post.setTitle(marketDTO.getTitle());
            post.setContent(marketDTO.getContent());

            repository.save(post); // 수정된 게시글 저장
            return true; // 성공 시 true 반환
        } else {
            return false; // 게시글이 없을 경우 false 반환
        }
    }



    @Override
    public List<MarketDTO> findDataByUno(Long uno) {
        User user = userRepository.findById(uno)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<Market> marketList = repository.findByUser(user); // User 객체로 검색
        return marketList.stream()
                .map(this::entityDto)
                .collect(Collectors.toList());
    }

}
