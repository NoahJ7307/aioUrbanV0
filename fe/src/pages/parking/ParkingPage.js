import React, { useCallback, useEffect, useState } from 'react'
import BasicLayout from '../../layout/BasicLayout'
import { Outlet, useNavigate } from 'react-router-dom'
import { deleteChecked } from '../../components/api/userApi'
import useCustomLogin from '../../components/hook/useCustomLogin'

const ParkingPage = () => {
    const navigate = useNavigate()

    const handleClickRegularList = useCallback(() => { navigate({ pathname: '/' }) })
    const handleClickVisitList = useCallback(() => { navigate({ pathname: '/' }) })
    const handleClickEEList = useCallback(() => { navigate({ pathname: '/' }) })

    return (
        <BasicLayout>
            <ul className='flex justify-center'>
                <li>
                    <button className='bg-gray-300 p-2' onClick={handleClickRegularList}>
                        Regular List
                    </button>
                </li>
                <li>
                    <button className='bg-gray-300 p-2 mr' onClick={handleClickVisitList}>
                        Visit List
                    </button>
                </li>
                <li>
                    <button className='bg-gray-300 p-2' onClick={handleClickEEList}>
                        Entry/Exit List
                    </button>
                </li>
            </ul>
            {/* 자식요소로 uno 설정 함수 전달 */}
            <Outlet/>
        </BasicLayout>
    )
}

export default ParkingPage