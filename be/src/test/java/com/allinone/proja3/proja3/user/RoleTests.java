package com.allinone.proja3.proja3.user;

import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.UserRole;
import com.allinone.proja3.proja3.repository.UserRepository;
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
    private PasswordEncoder passwordEncoder;

    @Test
    public void insertRolesRoot() {
        User userPending = User.builder()
                .userName("root")
                .phone("root")
                .pw(passwordEncoder.encode("1"))
                .build();
        userPending.addRole(UserRole.ROOT);
        repository.save(userPending);
    }

    @Test
    public void insertRolesAdmin() {
        User userAdmin = User.builder()

                .userName("admin")
                .phone("1231")
                .pw(passwordEncoder.encode("1"))
                .build();
        userAdmin.addRole(UserRole.ADMIN);
        repository.save(userAdmin);
    }

    @Test
    public void insertRolesPending() {
        for (int i = 0; i < 50; i++) {
            User userPending = User.builder()
                    .userName("pending"+(i+10))
                    .phone("pending"+(i+10))
                    .pw(passwordEncoder.encode("1"))
                    .build();
            userPending.addRole(UserRole.PENDING);
            repository.save(userPending);
        }
    }

    @Test
    public void read() {
        List<String> list = new ArrayList<>();
        list.add("admin");
        list.add("pending");
        list.forEach(s -> System.out.println(repository.getWithRoles(s)));
    }
}
