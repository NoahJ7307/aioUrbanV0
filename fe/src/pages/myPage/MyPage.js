import React, { useCallback, useState } from 'react'
import BasicLayout from '../../layout/BasicLayout'
import { Outlet, useNavigate } from 'react-router-dom'

const MyPage = () => {
    const navigate = useNavigate()
    const [checkedRpno, setCheckedRpno] = useState([])
    const [checkedVpno, setCheckedVpno] = useState([])

    const handleClickRegularList = useCallback(() => { navigate({ pathname: 'myInfo' }) })
    const handleClickVisitList = useCallback(() => { navigate({ pathname: 'mileage' }) })
    const handleClickEEList = useCallback(() => { navigate({ pathname: 'facilities' }) })

    return (
        <BasicLayout>
            <div className='flex'>
                <ul className='flex-col p-2'>
                    <li>
                        <button className='p-2' onClick={handleClickRegularList}>
                            내정보
                        </button>
                    </li>
                    <li>
                        <button className='p-2' onClick={handleClickVisitList}>
                            마일리지
                        </button>
                    </li>
                    <li>
                        <button className='p-2' onClick={handleClickEEList}>
                            예약현황
                        </button>
                    </li>
                </ul>
                <div>
                    <Outlet />
                </div>
            </div>
        </BasicLayout>
    )
}

export default MyPage