package com.allinone.proja3.proja3.model.mileage;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Mileage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mileageId; // 고유 식별자

    @Column(nullable = false)
    private int dong;

    @Column(nullable = false)
    private int ho;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private boolean state = true;
    // true일 때만 활성화된 마일리지

    private boolean autopay; // 자동결제 설정

    @OneToOne
    @JoinColumn(name = "card_id")
    private CardInfo cardInfo; // 카드 정보와 연관관계 설정


    // 마일리지 상태 확인 메소드 (Optional)
    public boolean isActive() {
        return state;
    }


     // 필요해 보이지 않아서 일단 막음.
     //양방향 관계 설정
//    @OneToMany(mappedBy = "mileage", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<MileageHistory> historyList = new ArrayList<>();
//
//    public void addHistory(MileageHistory history) {
//        historyList.add(history);
//        history.setMileage(this);
//    }
}
