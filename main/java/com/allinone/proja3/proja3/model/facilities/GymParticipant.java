package com.allinone.proja3.proja3.model.facilities;

import com.allinone.proja3.proja3.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Entity

public class GymParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "gym_id")
    private Gym gym;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private boolean waitlisted = false;
    private LocalDateTime createdAt = LocalDateTime.now();

}
