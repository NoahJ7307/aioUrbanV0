package com.allinone.proja3.proja3.service.facilities;

import com.allinone.proja3.proja3.dto.facilities.GolfDTO;
import com.allinone.proja3.proja3.dto.facilities.GymDTO;
import com.allinone.proja3.proja3.dto.facilities.GymMembershipDTO;
import com.allinone.proja3.proja3.dto.facilities.MembershipPlanDTO;
import com.allinone.proja3.proja3.model.User;
import com.allinone.proja3.proja3.model.facilities.Gym;
import com.allinone.proja3.proja3.model.facilities.GymMembership;
import com.allinone.proja3.proja3.model.facilities.GymParticipant;
import com.allinone.proja3.proja3.model.facilities.MembershipPlan;
import com.allinone.proja3.proja3.model.mileage.Mileage;

import java.util.List;

public interface GymMembershipService {
    public GymMembership toEntity(GymMembershipDTO gymMembershipDTO);
    public GymMembership createGymMembership(User user, Mileage mileage, MembershipPlan plan);
    public MembershipPlan createGymMembershipPlan (String membershipType, int durationMonths, int price);
    public List<MembershipPlan> getAllMembershipPlans();
    void deleteMembership(Long membershipPlanId);
    public GymMembership  purchaseMembership(GymMembershipDTO gymMembershipDTO);
    public MembershipPlan toEntityMembership (MembershipPlanDTO membershipPlanDTO);
    public List<GymMembershipDTO> getUserMemberships (Long uno);



}
