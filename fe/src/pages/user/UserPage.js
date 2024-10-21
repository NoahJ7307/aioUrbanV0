import React, { useCallback, useEffect, useState } from 'react'
import BasicLayout from '../../layout/BasicLayout'
import { Outlet, useNavigate } from 'react-router-dom'
import { deleteChecked } from '../../components/api/userApi'
import useCustomLogin from '../../components/hook/useCustomLogin'

const UserPage = () => {
    const navigate = useNavigate()
    const [checkedUno, setCheckedUno] = useState([null])
    const { loadLoginData } = useCustomLogin()

    useEffect(() => {
        if (loadLoginData().role !== 'ADMIN' && loadLoginData().role !== 'ROOT') {
            alert('권한이 없습니다')
            navigate({ pathname: '../login' })
        }
        return () => {
            setCheckedUno([]) // 페이지가 사라질 때 체크된 항목 초기화
        }
    }, [])

    const handleClickList = useCallback(() => { navigate({ pathname: 'list' }) })
    const handleClickAdd = useCallback(() => { navigate({ pathname: 'add' }) })
    const handleClickModify = useCallback(() => {
        if (checkedUno.length == 1) {
            navigate({ pathname: `modify/${checkedUno[0]}` })  // 1개 체크 시
        } else if (checkedUno.length > 1) {
            alert("하나만 선택해주세요") // 여러개 체크 시
        } else {
            alert("선택된 항목이 없습니다") // 미체크 시
            navigate({ pathname: '/user' })
        }
    })
    const handleClickDelete = async () => {
        if (checkedUno.length > 0) {
            await deleteChecked(checkedUno)
            navigate({ pathname: '/user' }) // 삭제 후 새로고침 기능 수행
        } else {
            alert("선택된 항목이 없습니다")
            navigate({ pathname: '/user' })
        }
    }
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
                    <button className='bg-gray-300 p-2' onClick={handleClickAdd}>
                        Add
                    </button>
                </li>
                <li>
                    <button className='bg-gray-300 p-2 mr' onClick={handleClickModify}>
                        Modify
                    </button>
                </li>
                <li>
                    <button className='bg-gray-300 p-2 mr' onClick={handleClickDelete}>
                        Delete
                    </button>
                </li>
                <li>
                    <button className='bg-gray-300 p-2 mr' onClick={handleClickApprovalList}>
                        Approval
                    </button>
                </li>
            </ul>
            {/* 자식요소로 uno 설정 함수 전달 */}
            <Outlet context={{ checkedUno, setCheckedUno }} />
        </BasicLayout>
    )
}

export default UserPage