import React, { useEffect, useState } from 'react'
import useCustom from '../hook/useCustom'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import PageComponent from '../common/PageComponent'
import useCustomLogin from '../hook/useCustomLogin'
import { entryGetList, entryGetUserList } from '../api/parking/entryApi'

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

const EntryTestListComponent = ({ pageServerData, searchData }) => {
    const [serverData, setServerData] = useState(initState)
    const [checkedEeno, setCheckedEeno] = useState([])
    const { page, size } = useCustom()
    const { exceptionHandler } = useCustomLogin()
    const location = useLocation()
    const navigate = useNavigate()

    const handleCheckChange = (eeno) => {
        setCheckedEeno(checkedItem => {
            if (checkedItem.includes(eeno)) {
                return checkedItem.filter(item => item !== eeno)
            } else {
                return [...checkedItem, eeno]
            }
        })
    }

    useEffect(() => {
        if (!pageServerData.dtoList || pageServerData.dtoList.length === 0) { // 검색 결과 유무 분기
            entryGetList({ page, size }).then(data => {
                if (data.error) {
                    exceptionHandler(data)
                } else {
                    setServerData(data)
                }
            })
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
        if (searchData.entryExitDateStart) {
            searchParams.set('entryExitDateStart', searchData.entryExitDateStart)
        }
        if (searchData.entryExitDateEnd) {
            searchParams.set('entryExitDateEnd', searchData.entryExitDateEnd)
        }

        navigate({
            pathname: '/superAdmin/entryTest',
            search: `?${searchParams.toString()}`,
        })
    }

    return (
        <div>
            <div className='grid grid-cols-7'>
                <div>No</div>
                <div>차량번호</div>
                <div>동</div>
                <div>호</div>
                <div>입차일</div>
                <div>출차일</div>
                <div>출차여부</div>
            </div>

            {/* Data Rendering */}
            {serverData.dtoList.map((entry, index) => (
                <div key={index} className='grid grid-cols-7'>
                    <div>
                        <input
                            type='checkbox'
                            checked={checkedEeno.includes(entry.eeno)} // 페이지 이동 시 체크항목 유지
                            onChange={() => handleCheckChange(entry.eeno)}
                        />
                    </div>
                    <div>{entry.carNum}</div>
                    <div>{entry.dong ? entry.dong : ''}</div>
                    <div>{entry.ho ? entry.ho : ''}</div>
                    <div>{entry.entryDate}</div>
                    <div>{entry.exitDate}</div>
                    <div>{entry.exit ? '출차완료' : '미출차'}</div>
                </div>
            ))}
            <PageComponent serverData={serverData} movePage={movePage} />
        </div>
    )
}

export default EntryTestListComponent