package com.allinone.proja3.proja3.repository;

import com.allinone.proja3.proja3.model.facilities.Golf;
import com.allinone.proja3.proja3.repository.facilities.GolfRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class GolfRepositoryTestg {

    @Autowired
    private GolfRepository repository;


    @Test
    public void testDel(){
        List<Golf> list = repository.findGolfBydelFlag(false);

        list.forEach(i-> System.out.println(i));
    }
}
