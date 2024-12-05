import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import '../../css/mileageManagement/mileageMypage.css'
import useMileage from '../../components/hook/useCustomMileage'
const MyMileagePage = () => {
  const { money, mileageId } = useMileage();


  return (
    <div className='mileageMypage'>
      
      <h2 className='mileageName'>마일리지 사용 내역 조회</h2>
      <div className="balance" style={{ textAlign: 'center', marginBottom:'1rem', fontSize:'1.5rem' }}>

            현재 잔액 : <span style={{ color: 'red', fontWeight: 'bold',}}>
              {money.toLocaleString()}
            </span> 원<br />
          
          </div>
      <p>아래 탭에서 마일리지 사용 및 구매 내역을 확인하세요.</p>
      <nav className='mileageLinkNav'>
        <NavLink to="usage">마일리지 사용 내역</NavLink>
        <NavLink to="purchase">나의 구매 내역</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default MyMileagePage