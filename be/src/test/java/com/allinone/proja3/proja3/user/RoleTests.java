package com.allinone.proja3.proja3.user;

import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.UserRole;
import com.allinone.proja3.proja3.repository.UserRepository;
import com.allinone.proja3.proja3.service.UserService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class RoleTests {
    @Autowired
    private UserRepository repository;
    @Autowired
    private UserService service;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void insertRolesRoot() {
        User userRoot = User.builder()
                .userName("유저유림")
                .phone("유저유림")
                .pw(passwordEncoder.encode("1111"))
                .build();
        userRoot.addRole(UserRole.ROOT);
        repository.save(userRoot);
    }

    @Test
    public void roleChangeRoot() {
        service.addRole(52L, UserRole.ROOT);
    }

    @Test
    public void insertRolesAdmin() {
        User yr = User.builder()
                .userName("정승균")
                .phone("정승균")
                .pw(passwordEncoder.encode("1111"))
                .build();
        yr.addRole(UserRole.ADMIN);
        repository.save(yr);
        User sg = User.builder()
                .userName("최유림")
                .phone("최유림")
                .pw(passwordEncoder.encode("1111"))
                .build();
        sg.addRole(UserRole.ADMIN);
        repository.save(sg);
        User jy = User.builder()
                .userName("전재윤")
                .phone("전재윤")
                .pw(passwordEncoder.encode("1111"))
                .build();
        jy.addRole(UserRole.ADMIN);
        repository.save(jy);
    }

    @Test
    public void insertRolesUser() {
        for (int i = 0; i < 20; i++) {
            User user = User.builder()
                    .userName("유저" + (i + 1))
                    .phone("010111100" + (i + 11))
                    .dong("101")
                    .ho("1" + (i + 11))
                    .pw(passwordEncoder.encode("1"))
                    .build();
            user.addRole(UserRole.USER);
            repository.save(user);
            }
        }

    @Test
    public void insertRolesPending() {
        for (int i = 0; i < 99; i++) {
            User userPending = User.builder()
                    .userName("승인대기"+(i+1))
                    .phone("010000000"+(i+11))
                    .dong("102")
                    .ho("1"+(i+11))
                    .pw(passwordEncoder.encode("1"))
                    .build();
            userPending.addRole(UserRole.PENDING);
            repository.save(userPending);
        }
    }

    @Transactional
    @Test
    public void read() {
        List<String> list = new ArrayList<>();
        list.add("admin");
        list.add("pending");
        list.forEach(s -> System.out.println(repository.findByPhone(s)));
    }

    @Test
    public void insertID() {
        User root = User.builder()
                .userName("루트")
                .phone("root")
                .dong("9999")
                .ho("9999")
                .pw(passwordEncoder.encode("1"))
                .build();
        root.addRole(UserRole.ROOT);
        repository.save(root);

        User admin = User.builder()
                .userName("관리자")
                .phone("admin")
                .dong("8888")
                .ho("8888")
                .dong("8888")
                .ho("8888")
                .pw(passwordEncoder.encode("1"))
                .build();
        admin.addRole(UserRole.ADMIN);
        repository.save(admin);

        User user = User.builder()
                .userName("일반유저")
                .phone("user")
                .dong("101")
                .ho("103")
                .pw(passwordEncoder.encode("1"))
                .build();
        user.addRole(UserRole.USER);
        repository.save(user);
    }
}
