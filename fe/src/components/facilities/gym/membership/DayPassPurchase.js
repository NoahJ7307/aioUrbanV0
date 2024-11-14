import React from 'react'

const DayPassPurchase = () => {
  return (
    <div>
      DayPassPurchase
      일일입장 등록
      <h1>
        이용하시는 날짜를 선택해 주세요
      </h1>
      <hr/>
      <input
        type="date"
        name="dayPassDate"

      />

    </div>
  )
}

export default DayPassPurchase