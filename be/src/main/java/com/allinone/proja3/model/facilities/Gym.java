package com.allinone.proja3.proja3.model.facilities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tbl_gym")
@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Gym {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationId;

    private LocalDate date;
    private String membershipType;
    private boolean delFlag;

}
