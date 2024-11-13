import React, { useState } from 'react'

const MembershipPurchase = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [expiryDate, setExpiryDate] = useState(''); // 만료 날짜
  const [currentMileageBalance, setCurrentMileageBalance] = useState(300000); // 초기 마일리지 잔액
  const [selectedMileageCost, setSelectedMileageCost] = useState(0);

  // 상품 선택 핸들러
  const handleSelectOption = (option, months, mileageCost) => {
    setSelectedOption(option);
    calculateExpiryDate(months);
    setSelectedMileageCost(mileageCost); 
  };


  //마일리지 차감 계산 함수
  const handlePurchase = () => {
    if (currentMileageBalance >= selectedMileageCost) {
      setCurrentMileageBalance(prevBalance => prevBalance - selectedMileageCost); // 마일리지 잔액 업데이트
      alert("구매가 완료되었습니다! ")
    } else {
      alert("마일리지가 부족합니다. 마일리지 충전 후 사용해 주세요")
    }
  }
  


  // 만료 날짜 계산 함수
  const calculateExpiryDate = (months) => {
    const today = new Date();
    const expiry = new Date(today.setMonth(today.getMonth() + months));// 오늘 날짜에 months를 더함
    const formattedExpiryDate = `${expiry.getFullYear()}년 ${expiry.getMonth() + 1}월 ${expiry.getDate()}일`; // YYYY-MM-DD 형식으로 포맷팅
    setExpiryDate(formattedExpiryDate);
  }
  return (
    <div>
      <h1>정기권 구매</h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* 1개월권 */}
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2>1개월권</h2>
          <p>1개월 동안 이용 가능한 정기권입니다.</p>
          <button onClick={() => handleSelectOption('1개월', 1, 30000)}>1개월권 선택</button>
        </div>

        {/* 6개월권 */}
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2>6개월권</h2>
          <p>6개월 동안 이용 가능한 정기권입니다.</p>
          <button onClick={() => handleSelectOption('6개월', 6, 150000)}>6개월권 선택</button>
        </div>

        {/* 1년권 */}
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2>1년권</h2>
          <p>1년 동안 이용 가능한 정기권입니다.</p>
          <button onClick={() => handleSelectOption('1년', 12, 250000)}>1년권 선택</button>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        {selectedOption ? (
          <>
            <p>선택한 상품: {selectedOption}권</p>
            <p>이용 만료일: {expiryDate} 까지 이용이 가능합니다. </p>
            <p>남은 마일리지: {currentMileageBalance.toLocaleString()}점 - {selectedMileageCost.toLocaleString()}점 ={' '}
            {(currentMileageBalance - selectedMileageCost).toLocaleString()}점</p>
          </>
        ) : (
          <p>상품을 선택해 주세요.</p>
        )}
      </div>

      {selectedOption && (
        <button style={{ marginTop: '20px' }} onClick={handlePurchase}>구매하기</button>
      )}
    </div>
  );
}

export default MembershipPurchase


