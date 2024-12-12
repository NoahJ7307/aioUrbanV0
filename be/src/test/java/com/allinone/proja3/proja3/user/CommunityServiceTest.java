package com.allinone.proja3.proja3.user;

import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.community.Announce;
import com.allinone.proja3.proja3.model.community.Community;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.repository.community.CommunityAnnounceRepository;
import com.allinone.proja3.proja3.service.community.AnnounceService;
import com.allinone.proja3.proja3.service.community.CommunityService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CommunityServiceTest {

    @Autowired
    private CommunityService communityService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    AnnounceService announceService;
    @Test
    public void createPostTest() {
        // 테스트용 사용자 생성
        User testUser = User.builder()
                .phone("010-1234-5678")
                .pw("password123")
                .userName("전재윤")
                .build();
        testUser = userRepository.save(testUser);

        // 100개의 게시글 생성
        for (int i = 1; i <= 100; i++) {
            Community community = Community.builder()
                    .title("테스트 게시글 " + i)
                    .content("이것은 테스트 게시글의 내용입니다. " + i)
                    .build();

            Community savedCommunity = communityService.createPost(community, testUser);
            System.out.println("생성된 게시글 번호: " + savedCommunity.getPno() +
                    ", 제목: " + savedCommunity.getTitle());
        }
    }
    @Test
    public void createAnnounceTest() {
        // 테스트용 사용자 생성
        User testUser = User.builder()
                .phone("010-1234-5678")
                .pw("password123")
                .userName("전재윤")
                .build();
        testUser = userRepository.save(testUser);

        // 100개의 게시글 생성
        for (int i = 1; i <= 100; i++) {
            Announce announce = Announce.builder()
                    .title("테스트 게시글 " + i)
                    .content("이것은 테스트 게시글의 내용입니다. " + i)
                    .build();

            Announce savedCommunity = announceService.createPost(testUser, announce);
            System.out.println("생성된 게시글 번호: " + savedCommunity.getPno() +
                    ", 제목: " + savedCommunity.getTitle());
        }
    }
}