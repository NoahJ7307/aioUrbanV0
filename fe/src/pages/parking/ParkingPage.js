import React, { useCallback, useState } from 'react'
import BasicLayout from '../../layout/BasicLayout'
import { Outlet, useNavigate } from 'react-router-dom'

const ParkingPage = () => {
    const navigate = useNavigate()
    const [checkedRpno, setCheckedRpno] = useState([])
    const [checkedVpno, setCheckedVpno] = useState([])

    const handleClickRegularList = useCallback(() => { navigate({ pathname: 'regular' }) })
    const handleClickVisitList = useCallback(() => { navigate({ pathname: 'visit' }) })
    const handleClickEEList = useCallback(() => { navigate({ pathname: 'entry' }) })

    return (
        <BasicLayout>
            <ul className='flex justify-center'>
                <li>
                    <button className='bg-gray-300 p-2' onClick={handleClickRegularList}>
                        정기권 차량
                    </button>
                </li>
                <li>
                    <button className='bg-gray-300 p-2 mr' onClick={handleClickVisitList}>
                        방문 예약 차량
                    </button>
                </li>
                <li>
                    <button className='bg-gray-300 p-2' onClick={handleClickEEList}>
                        입출차 기록
                    </button>
                </li>
            </ul>
            <Outlet context={{ checkedRpno, setCheckedRpno, checkedVpno, setCheckedVpno }} />
        </BasicLayout>
    )
}

export default ParkingPage