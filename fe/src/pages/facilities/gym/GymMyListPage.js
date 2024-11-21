import React from 'react'
import GymMyList from '../../../components/facilities/gym/GymMyList'
import { Outlet } from 'react-router-dom'

const GymMyListPage = () => {
    return (
        <>
            <GymMyList />
            <Outlet/>
        </>
    )
}

export default GymMyListPage