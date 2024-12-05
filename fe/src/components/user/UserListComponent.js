import React, { useEffect, useState } from 'react'
import { getList } from '../api/userApi'
import useCustom from '../hook/useCustom'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import PageComponent from '../common/PageComponent'
import useCustomLogin from '../hook/useCustomLogin'

const initState = {
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

const roleListName = {
    PENDING: '승인대기',
    USER: '입주민',
    ADMIN: '관리자',
}

const UserListComponent = ({ pageServerData, searchData }) => {
    const [serverData, setServerData] = useState(initState)
    const { page, size } = useCustom()
    const [checked, setChecked] = useState([])
    const { setCheckedUno } = useOutletContext() // 부모에게서 전달된 함수
    const { exceptionHandler, loadLoginData } = useCustomLogin()
    const location = useLocation()
    const navigate = useNavigate()
    const [allChecked, setAllChecked] = useState(false)

    useEffect(() => {
        setChecked([])
        setAllChecked(false)

        if (!pageServerData.dtoList || pageServerData.dtoList.length === 0) {
            try {
                if (loadLoginData().role !== 'ADMIN' && loadLoginData().role !== 'ROOT') {
                    throw new Error('Access Error')
                } else {
                    getList({ page, size }).then(data => {
                        if (data.error) {
                            exceptionHandler(data)
                        } else {
                            setServerData(data)
                            console.log(data)
                        }
                    })
                }
            } catch (error) {
                console.error(error);
                alert('권한이 없습니다')
                navigate({ pathname: '/login' })
            }
        } else {
            setServerData(pageServerData)
        }

    }, [page, size, pageServerData])

    const movePage = (pageParam) => {
        const searchParams = new URLSearchParams(location.search)

        searchParams.set('page', pageParam.page)

        if (searchData.searchCategory) {
            searchParams.set('searchCategory', searchData.searchCategory)
        }
        if (searchData.searchValue) {
            searchParams.set('searchValue', searchData.searchValue)
        }

        navigate({
            pathname: '/user/list',
            search: `?${searchParams.toString()}`,
        })
    }
    const handleCheckChange = (uno) => {
        setChecked(checkedItem => {
            if (checkedItem.includes(uno)) {
                return checkedItem.filter(item => item !== uno)
            } else {
                return [...checkedItem, uno]
            }
        })
    }

    const handleAllCheckChange = () => {
        if (allChecked) {
            // 전체 해제
            setChecked([])
        } else {
            // 현재 페이지의 모든 uno를 checked에 추가
            const allUno = serverData.dtoList.map(user => user.uno)
            setChecked(allUno)
        }
        setAllChecked(!allChecked)
    }

    // 체크된 항목이 변경 시 부모에 [uno] 전달 / 부모(UserPage) 업데이트
    useEffect(() => {
        if (checked.length > 0) {
            setCheckedUno(checked)
            console.log("checked:" + checked)
        } else {
            setCheckedUno([])
        }
    }, [checked, setCheckedUno])

    return (
        <div className="tableRowContainer">
            <div className="userTable tableHeader">
                <div>
                    <label
                        htmlFor='checkbox-all'
                        className={`cursor-pointer ${allChecked ? 'selected' : ''}`}
                        style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                        전체선택
                        <input
                            type='checkbox'
                            id='checkbox-all'
                            checked={allChecked}
                            onChange={handleAllCheckChange}
                            style={{ display: 'none' }}
                        /></label>
                </div>
                <div>동</div>
                <div>호</div>
                <div>이름</div>
                <div>전화번호</div>
                <div>권한</div>
            </div>

            {/* 유저 데이터를 map으로 렌더링 */}
            {serverData.dtoList.filter(data => !data.userRoleList.includes('ROOT') // ROOT 권한 표기 X
            ).map((user, index) => (
                <label
                    key={index}
                    className={`userTable tableRow ${checked.includes(user.uno) ? "checked" : ""}`}
                    htmlFor={`checkbox-${user.uno}`}
                >
                    <input
                        type="checkbox"
                        id={`checkbox-${user.uno}`}
                        checked={checked.includes(user.uno)}
                        onChange={() => handleCheckChange(user.uno)}
                    />
                    <div>{user.dong}</div>
                    <div>{user.ho}</div>
                    <div>{user.userName}</div>
                    <div>{user.phone}</div>
                    <div>{user.userRoleList.map(role => roleListName[role])}</div>
                </label>
            ))}
            <PageComponent serverData={serverData} movePage={movePage} />
        </div>
    );
}

export default UserListComponent