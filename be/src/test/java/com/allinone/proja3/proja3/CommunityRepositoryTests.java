package com.allinone.proja3.proja3;


import com.allinone.proja3.proja3.model.Community;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.repository.CommunityRepository;

import com.allinone.proja3.proja3.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest

public class CommunityRepositoryTests {
    @Autowired
    private CommunityRepository communityRepository;
    @Autowired
    private UserRepository userRepository; // UserRepository를 주입받아야 합니다.

    @Test

    public void testInsert() {
        // 사용자 객체 생성 및 저장 (필요한 필드를 설정)
        User user = User.builder()
                .userName("테스트 사용자")
                .pw("비밀번호")
                .phone("010-1111-1111")
                .build();
        userRepository.save(user); // 사용자 저장

        for ( int i = 1; i<=1; i++){


            Community cm = Community.builder()
                    .title("첫번째 게시글" +i)
                    .user(user)
                    .content("이렇게 적었어요"+i)
                    .updatedAt(LocalDateTime.now())
                    .createdAt(LocalDateTime.now())
                    .build();


                    communityRepository.save(cm);
        }
    }

}
