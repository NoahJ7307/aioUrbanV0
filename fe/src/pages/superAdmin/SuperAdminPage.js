import React, { useCallback, useState } from 'react'
import BasicLayout from '../../layout/BasicLayout'
import { Outlet, useNavigate } from 'react-router-dom'

const SuperAdminPage = () => {
    const navigate = useNavigate()
    const [checkedUno, setCheckedUno] = useState([])

    const handleClickUserManage = useCallback(() => { navigate({ pathname: 'userManage' }) })
    const handleClickEntryTest = useCallback(() => { navigate({ pathname: 'entryTest' }) })

    return (
        <BasicLayout>
            <ul className='flex justify-center'>
                <li>
                    <button className='bg-gray-300 p-2' onClick={handleClickUserManage}>
                        유저 관리
                    </button>
                </li>
                <li>
                    <button className='bg-gray-300 p-2' onClick={handleClickEntryTest}>
                        입출차 테스트
                    </button>
                </li>
            </ul>
            <Outlet context={{ checkedUno, setCheckedUno }} />
        </BasicLayout>
    )
}

export default SuperAdminPage