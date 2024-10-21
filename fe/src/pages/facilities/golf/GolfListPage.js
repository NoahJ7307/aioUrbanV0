import React, { useState } from 'react'
import GolfList from '../../../components/facilities/golf/GolfList'
import { Outlet } from 'react-router-dom';

const GolfListPage = () => {
  const [checkedReservationId, setCheckedReservationId] = useState([]);
  return (
    <div><GolfList setCheckedReservationId ={setCheckedReservationId} />
      <Outlet context={{ setCheckedReservationId }} /> </div>
  )
}

export default GolfListPage