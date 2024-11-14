import React, { useState, useEffect } from 'react';
import { purchaseMembership } from '../../../api/facilities/gymApi';

const MembershipPurchase = ({ userRole }) => { // userRole을 prop으로 받아옴
  const [selectedOption, setSelectedOption] = useState('');
  const [expiryDate, setExpiryDate] = useState(''); // 만료 날짜
  const [currentMileageBalance, setCurrentMileageBalance] = useState(300000); // 초기 마일리지 잔액
  const [selectedMileageCost, setSelectedMileageCost] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태
  const [uno, setUno] = useState(); // 로그인한 사용자 uno
  const [userName, setUserName] = useState(); // 로그인한 사용자 name
  const [phone, setPhone] = useState(); // 로그인한 사용자 phone
  const userUno = 53;

  
  useEffect(() => {
    const getUno = localStorage.getItem('uno');
    const getUserName = localStorage.getItem('userName');
    const getPhone = localStorage.getItem('phone');
    console.log("로컬 스토리지에서 가져온 데이터:", { getUno, getUserName, getPhone }); // 추가: 로컬 스토리지 데이터 확인

    if (getUno) setUno(Number(getUno));
    if (getUserName) setUserName(getUserName);
    if (getPhone) setPhone(getPhone);
    if (!getUno && !getUserName && !getPhone) console.log("로그인 정보가 없습니다.");



}, [])

  useEffect(() => {
    // userRole이 'admin'이면 관리자로 설정, 아니면 사용자로 설정
    if (userRole === 'admin') {
      setIsAdmin(true);
    }
  }, [userRole]);

  // 상품 선택 핸들러
  const handleSelectOption = (option, months, mileageCost) => {
    setSelectedOption(option);
    calculateExpiryDate(months);
    setSelectedMileageCost(mileageCost);
  };

  // 마일리지 차감 계산 함수
  const handlePurchase = async () => {
    if (currentMileageBalance >= selectedMileageCost) {
      try {
        const result = await purchaseMembership(selectedOption, userUno);
        console.log('구매 응답 데이터: ', result);
        // 구매 성공시 마일리지 잔액 업데이트 및 알림
        setCurrentMileageBalance(prevBalance => prevBalance - selectedMileageCost); // 마일리지 잔액 업데이트
        alert('구매가 완료되었습니다!');
      } catch (error) {
        console.error('구매 실패 : ', error);
        alert('구매 처리중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } else {
      alert('마일리지가 부족합니다. 마일리지 충전 후 사용해 주세요.');
    }
  };

  // 만료 날짜 계산 함수
  const calculateExpiryDate = (months) => {
    const today = new Date();
    const expiry = new Date(today.setMonth(today.getMonth() + months)); // 오늘 날짜에 months를 더함
    const formattedExpiryDate = `${expiry.getFullYear()}년 ${expiry.getMonth() + 1}월 ${expiry.getDate()}일`; // YYYY-MM-DD 형식으로 포맷팅
    setExpiryDate(formattedExpiryDate);
  };

  return (
    <div>
      <h1>정기권 구매</h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* 1개월권 */}
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2>1개월권</h2>
          <p>1개월 동안 이용 가능한 정기권입니다.</p>
          <button onClick={() => handleSelectOption(1, 1, 30000)}>1개월권 선택</button>
        </div>

        {/* 6개월권 */}
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2>6개월권</h2>
          <p>6개월 동안 이용 가능한 정기권입니다.</p>
          <button onClick={() => handleSelectOption(2, 6, 150000)}>6개월권 선택</button>
        </div>

        {/* 1년권 */}
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2>1년권</h2>
          <p>1년 동안 이용 가능한 정기권입니다.</p>
          <button onClick={() => handleSelectOption(3, 12, 250000)}>1년권 선택</button>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        {selectedOption !== null ? (
          <>
            <p>선택한 상품: {selectedOption}권</p>
            <p>이용 만료일: {expiryDate} 까지 이용이 가능합니다.</p>
            {isAdmin ? (
              <div>
                <label>금액 설정:</label>
                <input
                  type="number"
                  value={selectedMileageCost}
                  onChange={(e) => setSelectedMileageCost(Number(e.target.value))}
                  placeholder="금액을 설정하세요"
                />
              </div>
            ) : (
              <p>남은 마일리지: {currentMileageBalance.toLocaleString()}점 - {selectedMileageCost.toLocaleString()}점 ={' '}
                {(currentMileageBalance - selectedMileageCost).toLocaleString()}점</p>
            )}
          </>
        ) : (
          <p>상품을 선택해 주세요.</p>
        )}
      </div>

      {selectedOption !== null && !isAdmin && (
        <button style={{ marginTop: '20px' }} onClick={handlePurchase}>구매하기</button>
      )}
    </div>
  );
};

export default MembershipPurchase;
