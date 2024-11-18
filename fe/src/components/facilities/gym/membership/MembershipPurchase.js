import React, { useEffect, useState } from 'react';
import { deleteGymMembership, fetchAllMembershipPlans, purchaseMembership } from '../../../api/facilities/gymApi';

const MembershipPurchase = () => {
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [message, setMessage] = useState('');
  const [userUno, setUserUno] = useState(53); // 예시로 사용자 uno 설정
  const [isAdmin, setAdmin] = useState(true);

  const role = localStorage.getItem("role");
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

  const handlePurchase = async (membershipPlanId) => {

    const membershipData = {
      userUno,
      membershipPlanId: selectedPlan.membershipPlanId,
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


  const handleDelete = async (planId) => {
    console.log("삭제버튼눌렸다 삭제될 이용권id:", planId, membershipPlans)
    const isConfirmed = window.confirm("해당 이용권을 삭제하시겠습니까?");
    if (!isConfirmed) {
      return; // 사용자가 취소하면 삭제를 하지 않음
    }

    try {
      // 이용권 삭제 요청
      await deleteGymMembership(planId);
      // 목록에서 삭제된 이용권 제거
      setMembershipPlans(prevPlans => prevPlans.filter(plan => plan.membershipPlanId !== planId));
      // 성공 메시지
      setMessage('이용권이 삭제되었습니다.');
    } catch (error) {
      console.error("이용권 삭제 오류: ", error);
      setMessage('삭제 중 오류가 발생 했습니다.');
    }
  };

    // 종료 날짜 계산 (오늘 날짜 기준)
    const calculateEndDate = (durationMonths) => {
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + durationMonths);
      return endDate.toLocaleDateString(); // 날짜를 YYYY/MM/DD 형식으로 반환
    };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">헬스장 이용권 구매</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">이용권 목록</h2>
        {membershipPlans.length === 0 ? (
          <p className="text-gray-500">등록된 이용권이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {membershipPlans.map((plan) => (
              <li
                key={plan.membershipPlanId}
                className={`p-4 border rounded cursor-pointer ${selectedPlan?.membershipPlanId === plan.membershipPlanId ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'
                  }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-lg">{plan.membershipType}</p>
                  {/* {isAdmin && ( */}
                    {role === 'ADMIN' && (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation(); // 클릭 이벤트 전파 방지
                        handleDelete(plan.membershipPlanId); // 이용권 삭제
                      }}
                    >
                      삭제
                    </button>
                  )}
                </div>
                {/* <p className="font-medium text-lg">{plan.membershipType}</p> */}
                <p className="text-sm text-gray-600">{plan.durationMonths}개월</p>
                <p className="text-sm text-gray-600">{plan.price.toLocaleString()}원</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedPlan && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">선택된 이용권</h3>
          <div className="p-4 border rounded bg-gray-50">
            <p className="font-medium text-lg">{selectedPlan.membershipType}</p>
            <p className="text-sm text-gray-600">{selectedPlan.durationMonths}개월</p>
            <p className="text-sm text-gray-600">{selectedPlan.price.toLocaleString()}원</p>
            <p className="text-sm text-gray-600">
              이용 종료일: {new Date().toISOString().split('T')[0]} ~ {calculateEndDate(selectedPlan.durationMonths)}
            </p>
          </div>
          <button
            onClick={handlePurchase}
            className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
          >
            구매하기
          </button>
        </div>
      )}

      {message && <p className="text-center text-green-600 font-medium">{message}</p>}
    </div>
  );
};

export default MembershipPurchase;
