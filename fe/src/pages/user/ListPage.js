import React, { useCallback, useContext, useEffect, useState } from 'react'
import UserListComponent from '../../components/user/UserListComponent'
import useCustomLogin from '../../components/hook/useCustomLogin'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import { deleteChecked, getSearchList } from '../../components/api/userApi'
import useCustom from '../../components/hook/useCustom'

const initStateSearchData = {
    searchCategory: '',
    searchValue: '',
}

const initStateServerData = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const ListPage = () => {
    const navigate = useNavigate()
    const { checkedUno, setCheckedUno } = useOutletContext() // 부모에게서 전달된 함수
    const [searchData, setSearchData] = useState(initStateSearchData)
    const { page, size } = useCustom()
    const [pageServerData, setPageServerData] = useState(initStateServerData)

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

    // ------- 검색 -------
    const handleChangeSearchValue = (e) => {
        setSearchData(prevData => ({ ...prevData, searchValue: e.target.value }))
    }
    const handleChangeSearchCategory = (e) => {
        setSearchData(prevData => ({ ...prevData, searchCategory: e.target.value }))
    }
    const handleClickSearch = () => {
        const pageParam = { page, size }
        getSearchList(pageParam, searchData).then(data => {
            setPageServerData(data)
        })
    }
    const handleClickClear = () => {
        setPageServerData(initStateServerData)
    }
    // --------------------

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
                {/* // ------- 검색 ------- */}
                <li>
                    <select className=''
                        name='searchCategory'
                        onChange={handleChangeSearchCategory}>
                        <option value=''>검색 필터</option>
                        <option value="dong-ho">동-호</option>
                        <option value="dong">동</option>
                        <option value="ho">호</option>
                        <option value="name">이름</option>
                        <option value="phone">전화번호</option>
                    </select>
                </li>
                <li>
                    <input className=''
                        name='searchValue'
                        onChange={handleChangeSearchValue}
                    />
                </li>
                <li>
                    <button className='bg-gray-300 p-2 mr' onClick={handleClickSearch}>
                        검색
                    </button>
                </li>
                <li>
                    <button className='bg-gray-300 p-2 mr' onClick={handleClickClear}>
                        검색 초기화
                    </button>
                </li>
                {/* // -------------------- */}
            </ul>
            <UserListComponent pageServerData={pageServerData} />

            {/* 자식요소로 uno 설정 함수 전달 */}
            <Outlet context={{ checkedUno, setCheckedUno }} />
        </div>
    )
}

export default ListPage