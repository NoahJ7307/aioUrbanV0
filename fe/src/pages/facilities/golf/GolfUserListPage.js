import React from 'react'
import GolfUserList from '../../../components/facilities/golf/GolfUserList'
import { useParams } from 'react-router-dom';

const GolfUserListPage = () => {
    const { uno } = useParams();
  return (
      <div><GolfUserList uno={uno} /></div>
  )
}

export default GolfUserListPage