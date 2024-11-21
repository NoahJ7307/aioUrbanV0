import React from 'react'
import GolfMyList from '../../../components/facilities/golf/GolfMyList'
import { Outlet } from 'react-router-dom'

const GolfMyListPage = () => {
  return (
    <>
            <GolfMyList />
            <Outlet/>
        </>
  )
}

export default GolfMyListPage