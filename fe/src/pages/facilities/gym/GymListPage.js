import React, { useState } from 'react'
import GymList from '../../../components/facilities/gym/GymList'
import { Outlet, useSearchParams } from 'react-router-dom';

const GymListPage = () => {
    const [checkedProgramId, setCheckedProgramId] = useState([]);
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');
    const size = searchParams.get('size');
    console.log(page, size)
    return (
        <>
            <GymList  page={page} size={size} />
            <Outlet context={{setCheckedProgramId}}/>
        </>
    )
}

export default GymListPage