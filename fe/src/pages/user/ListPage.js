import React, { useCallback, useContext, useEffect, useState } from 'react'
import UserListComponent from '../../components/user/UserListComponent'
import useCustomLogin from '../../components/hook/useCustomLogin'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import { deleteChecked } from '../../components/api/userApi'

const ListPage = () => {
    const navigate = useNavigate()
    const { checkedUno, setCheckedUno } = useOutletContext() // 부모에게서 전달된 함수
    const { loadLoginData } = useCustomLogin()

    useEffect(() => {
        if (loadLoginData().role !== 'ADMIN' && loadLoginData().role !== 'ROOT') {
            alert('권한이 없습니다')
            navigate({ pathname: '/login' })
        }
    }, [loadLoginData, navigate])

    const handleClickModify = useCallback(() => {
        if (checkedUno.length == 1) {
            navigate({ pathname: `modify/${checkedUno[0]}` })  // 1개 체크 시
        } else if (checkedUno.length > 1) {
            alert("하나만 선택해주세요") // 여러개 체크 시
        } else {
            alert("선택된 항목이 없습니다") // 미체크 시
        }
    }, [checkedUno, navigate])
    const handleClickDelete = async () => {
        if (checkedUno.length > 0) {
            await deleteChecked(checkedUno)
            navigate({ pathname: '/user' }) // 삭제 후 새로고침 기능 수행
        } else {
            alert("선택된 항목이 없습니다")
            navigate({ pathname: '/user' })
        }
    }
    return (
        <div>

            <ul className='flex justify-center'>
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
            </ul>
            <UserListComponent />

            {/* 자식요소로 uno 설정 함수 전달 */}
            <Outlet context={{ checkedUno, setCheckedUno }} />
        </div>
    )
}

export default ListPage