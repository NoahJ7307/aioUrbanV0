import React, { useEffect, useState } from 'react'
import { createGymMembership } from '../../../api/facilities/gymApi';

const AdminCreateMembership = () => {
  // const [membershipPlanName, setMembershipPlanName] = useState('');
  const [durationMonths, setDurationMonths] = useState(1);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('');


  const membershipPlanName = `${durationMonths}개월권`;


  const handleCreateMembership = async () => {
    const membershipData = {
      membershipType: membershipPlanName,
      durationMonths,
      price,
    };
    console.log("101010", membershipData)

    try {
      const result = await createGymMembership(membershipData);
      setMessage('이용권 등록이 완료되었습니다!');
      console.log(result);
    } catch (error) {
      setMessage('이용권 등록 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>헬스장 이용권 등록</h1>
      
      <div>
        <label>이용권 기간 (개월) :  </label>
        <input
          type="number"
          value={durationMonths}
          onChange={(e) => setDurationMonths(Number(e.target.value))}
        />
      </div>
      <div>
        <label>이용권명 : </label>
        <input
          type="text"
          value={membershipPlanName}
          readOnly // 사용자 입력 불가
        />
      </div>
      <div>
        <label>가격</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <button onClick={handleCreateMembership}>이용권 등록</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminCreateMembership