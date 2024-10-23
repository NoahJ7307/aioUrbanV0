import React, { useCallback, useEffect, useState } from 'react'
import BasicLayout from '../../layout/BasicLayout'
import { Outlet, useNavigate } from 'react-router-dom'
import { deleteChecked } from '../../components/api/userApi'
import useCustomLogin from '../../components/hook/useCustomLogin'

const ParkingPage = () => {
    const navigate = useNavigate()
    const [checkedUno, setCheckedUno] = useState([])

    const handleClickRegularList = useCallback(() => { navigate({ pathname: 'regular' }) })
    const handleClickVisitList = useCallback(() => { navigate({ pathname: 'visit' }) })
    const handleClickEEList = useCallback(() => { navigate({ pathname: 'entry' }) })

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
            <Outlet context={{ checkedUno, setCheckedUno }} />
        </BasicLayout>
    )
}

export default ParkingPage