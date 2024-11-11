import React, { useCallback, useEffect, useState } from 'react'
import UserManageComponent from '../../components/superAdmin/UserManageComponent'
import { Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { superAdminGetAllList, superAdminGetSearchList, superAdminHardDelete, superAdminRecovery } from '../../components/api/superAdmin/superAdminApi'

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

const UserManagePage = () => {
    const navigate = useNavigate()
    const { checkedUno, setCheckedUno } = useOutletContext() // 부모에게서 전달된 함수
    const [searchData, setSearchData] = useState(initStateSearchData)
    const [pageServerData, setPageServerData] = useState(initStateServerData)
    const location = useLocation()

    const handleClickAddRole = useCallback(() => {
        if (checkedUno.length === 1) {
            navigate({ pathname: `addRole/${checkedUno[0]}` })  // 1개 체크 시
        } else if (checkedUno.length > 1) {
            alert("하나만 선택해주세요") // 여러개 체크 시
        } else {
            alert("선택된 항목이 없습니다") // 미체크 시
        }
    }, [checkedUno, navigate])

    // const handleClickRecovery = async () => {
    //     if (checkedUno.length > 0) {
    //         await superAdminRecovery(checkedUno)
    //         navigate({ pathname: '/superAdmin/userManage' }) // 삭제 후 새로고침 기능 수행
    //     } else {
    //         alert("선택된 항목이 없습니다")
    //         navigate({ pathname: '/superAdmin/userManage' })
    //     }
    // }

    const handleClickHardDelete = async () => {
        if (checkedUno.length > 0) {
            await superAdminHardDelete(checkedUno)
            navigate({ pathname: '/superAdmin/userManage' }) // 삭제 후 새로고침 기능 수행
        } else {
            alert("선택된 항목이 없습니다")
            navigate({ pathname: '/superAdmin/userManage' })
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

        // queryParameter 생성
        const searchParams = new URLSearchParams()
        searchParams.set('page', 1)
        searchParams.set('size', 10)

        if (searchData.searchCategory) {
            searchParams.set('searchCategory', searchData.searchCategory)
        }
        if (searchData.searchValue) {
            searchParams.set('searchValue', searchData.searchValue)
        }

        // queryParameter 경로 설정
        navigate(`/user/list?${searchParams.toString()}`)
    }

    useEffect(() => {
        // queryParameter 설정
        const queryParams = new URLSearchParams(location.search)
        const page = parseInt(queryParams.get('page')) || 1
        const size = parseInt(queryParams.get('size')) || 10

        const newSearchData = {
            searchCategory: queryParams.get('searchCategory') || '',
            searchValue: queryParams.get('searchValue') || '',
        }
        setSearchData(newSearchData)

        const pageParam = { page, size }

        if (newSearchData.searchCategory) {
            superAdminGetSearchList(pageParam, newSearchData).then(data => {
                setPageServerData(data)
                // 결과 예외 처리
                if (!data.dtoList || data.dtoList.length === 0) {
                    alert('검색 결과가 없습니다')
                }
            })
        } else {
            // 기본 데이터 로드
            superAdminGetAllList(pageParam).then(data => {
                setPageServerData(data)
            })
        }
    }, [location.search])

    const handleClickClear = () => {
        setPageServerData(initStateServerData)
    }
    // --------------------


    return (
        <div>
            <ul className='flex justify-center'>
                <li>
                    <button className='bg-gray-300 p-2 mr' onClick={handleClickAddRole}>
                        권한부여 / 복구
                    </button>
                </li>
                <li>
                    <button className='bg-gray-300 p-2 mr' onClick={handleClickHardDelete}>
                        완전삭제
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
            <UserManageComponent pageServerData={pageServerData} searchData={searchData} />
            {/* 자식요소로 uno 설정 함수 전달 */}
            <Outlet context={{ checkedUno, setCheckedUno }} />
        </div>
    )
}

export default UserManagePage