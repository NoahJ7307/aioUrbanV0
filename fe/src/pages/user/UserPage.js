import React, { useCallback, useEffect, useState } from 'react'
import BasicLayout from '../../layout/BasicLayout'
import { Outlet, useNavigate } from 'react-router-dom'
import { deleteChecked } from '../../components/api/userApi'
import useCustomLogin from '../../components/hook/useCustomLogin'

const UserPage = () => {
    const navigate = useNavigate()
    const [checkedUno, setCheckedUno] = useState([])

    const handleClickList = useCallback(() => { navigate({ pathname: 'list' }) })
    const handleClickAdd = useCallback(() => { navigate({ pathname: 'add' }) })
    const handleClickApprovalList = useCallback(() => { navigate({ pathname: 'approval' }) })

    return (
        <BasicLayout>
            <ul className='flex justify-center'>
                <li>
                    <button className='bg-gray-300 p-2' onClick={handleClickList}>
                        List
                    </button>
                </li>
                <li>
                    <button className='bg-gray-300 p-2 mr' onClick={handleClickApprovalList}>
                        Approval
                    </button>
                </li>
                <li>
                    <button className='bg-gray-300 p-2' onClick={handleClickAdd}>
                        Add
                    </button>
                </li>
            </ul>
            <Outlet context={{ checkedUno, setCheckedUno }} />
        </BasicLayout>
    )
}

export default UserPage