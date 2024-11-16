import React, { useEffect, useState } from 'react';
import { fetchAllMembershipPlans, purchaseMembership } from '../../../api/facilities/gymApi';

const MembershipPurchase = () => {
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [message, setMessage] = useState('');
  const [userUno, setUserUno] = useState(53); // 예시로 사용자 uno 설정

  useEffect(() => {
    // 헬스장 이용권 목록을 가져옵니다.
    const fetchMembershipPlansList = async () => {
      try {
        const plans = await fetchAllMembershipPlans(); // fetchAllMembershipPlans 호출
        setMembershipPlans(plans); // 가져온 데이터를 상태에 설정
      } catch (error) {
        console.error("이용권 목록 가져오기 오류: ", error);
      }
    };
    fetchMembershipPlansList(); // 목록을 가져오기
  }, []);

  const handlePurchase = async () => {
    if (!selectedPlan) {
      alert("구매할 이용권을 선택해 주세요.");
      return;
    }

    const membershipData = {
      userUno,
      membershipPlanId: selectedPlan.id,
      startDate: new Date().toISOString(),
      endDate: new Date().setMonth(new Date().getMonth() + selectedPlan.durationMonths).toISOString(),
    };

    try {
      const result = await purchaseMembership(membershipData);
      setMessage('구매가 완료되었습니다!');
      console.log(result);
    } catch (error) {
      setMessage('구매 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>헬스장 이용권 구매</h1>
      <div>
        <h3>이용권 목록</h3>
        {membershipPlans.length === 0 ? (
          <p>등록된 이용권이 없습니다.</p>
        ) : (
          <ul>
            {membershipPlans.map(plan => (
              <li key={plan.id} onClick={() => setSelectedPlan(plan)}>
                <p>{plan.name} - {plan.durationMonths}개월 - {plan.price}원</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedPlan && (
        <div>
          <h3>선택된 이용권</h3>
          <p>{selectedPlan.name} - {selectedPlan.durationMonths}개월 - {selectedPlan.price}원</p>
          <button onClick={handlePurchase}>구매하기</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default MembershipPurchase;
