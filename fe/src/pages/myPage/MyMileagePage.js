import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import '../../css/mileageManagement/mileageMypage.css'

const MyMileagePage = () => {
  return (
    <div className='mileageMypage'>
      <h2>마일리지 사용 </h2>
      <nav className='mileageLinkNav'>
        <NavLink to="usage">사용 내역</NavLink>
        <NavLink to="purchase">구매 내역</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default MyMileagePage