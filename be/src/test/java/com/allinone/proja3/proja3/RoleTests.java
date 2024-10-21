package com.allinone.proja3.proja3;

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
    public void insertRolesAdmin(){
        User userAdmin = User.builder()
                .userName("admin")
                .phone("admin")
                .pw("1111")
                .build();
        userAdmin.addRole(UserRole.ADMIN);
        repository.save(userAdmin);
    }
    @Test
    public void insertRolesPending(){
        User userPending = User.builder()
                .userName("superAdmin")
                .phone("superAdmin")
                .pw(passwordEncoder.encode("1111"))
                .build();
        userPending.addRole(UserRole.ROOT);
        repository.save(userPending);
    }

    @Test
    public void setPasswordEncoder(){
        User userPending = User.builder()
                .dong(1111)
                .ho(1111)
                .userName("pending5")
                .phone("pending5")
                .pw(passwordEncoder.encode("1111"))
                .build();
        userPending.addRole(UserRole.PENDING);
        userPending.addRole(UserRole.USER);
        userPending.addRole(UserRole.ADMIN);
        repository.save(userPending);
    }

    @Test
    public void read(){
        List<String> list = new ArrayList<>();
        list.add("admin");
        list.add("pending");
        list.forEach(s -> System.out.println(repository.getWithRoles(s)));

    }

}
