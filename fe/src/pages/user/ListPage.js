import React, { useCallback, useContext, useEffect, useState } from 'react'
import UserListComponent from '../../components/user/UserListComponent'
import useCustomLogin from '../../components/hook/useCustomLogin'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import { deleteChecked } from '../../components/api/userApi'

const ListPage = () => {
    const navigate = useNavigate()
    const { checkedUno, setCheckedUno } = useOutletContext() // 부모에게서 전달된 함수

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

    const handleClickSearch = () => {

    }
    return (
        <div>
            <ul className='flex justify-center'>
                <li>
                    <button className='bg-gray-300 p-2 mr' onClick={handleClickModify}>
                        수정
                    </button>
                </li>
                <li>
                    <button className='bg-gray-300 p-2 mr' onClick={handleClickDelete}>
                        삭제
                    </button>
                </li>
                <li>
                    <select>
                        <option value="">검색 필터</option>
                        <option value="dong-ho">동-호</option>
                        <option value="dong">동</option>
                        <option value="ho">호</option>
                        <option value="name">이름</option>
                        <option value="phone">전화번호</option>
                    </select>
                </li>
                <li>
                    <input />
                </li>
                <li>
                    <button className='bg-gray-300 p-2 mr' onClick={handleClickSearch}>
                        검색
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