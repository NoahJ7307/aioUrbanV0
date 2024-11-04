import React, { useEffect, useState } from 'react'
import useCustom from '../hook/useCustom'
import { useOutletContext } from 'react-router-dom'
import PageComponent from '../common/PageComponent'
import useCustomLogin from '../hook/useCustomLogin'
import { regularGetList, regularGetUserList } from '../api/parking/regularApi'

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

const RegularListComponent = ({ pageServerData }) => {
    const [serverData, setServerData] = useState(initState)
    const { page, size, moveToPath } = useCustom()
    const [checked, setChecked] = useState([])
    const { setCheckedRpno } = useOutletContext() // 부모에게서 전달된 함수
    const { exceptionHandler, loadLoginData } = useCustomLogin()

    const handleCheckChange = (uno) => {
        console.log(serverData)
        setChecked(checkedItem => {
            if (checkedItem.includes(uno)) {
                return checkedItem.filter(item => item !== uno)
            } else {
                return [...checkedItem, uno];
            }
        })
    }

    // 체크된 항목이 변경 시 부모에 [uno] 전달 / 부모(UserPage) 업데이트
    useEffect(() => {
        if (checked.length > 0) {
            setCheckedRpno(checked);
            console.log("checked:" + checked)
        } else {
            setCheckedRpno([]);
        }
    }, [checked, setCheckedRpno]);

    useEffect(() => {
        const loginUser = {
            dong: loadLoginData().dong,
            ho: loadLoginData().ho,
        }
        if (!pageServerData.dtoList || pageServerData.dtoList.length === 0) { // 검색 결과 유무 분기
            if (loadLoginData().role == 'ADMIN' || loadLoginData().role == 'ROOT') { // 권한 분기
                console.log(loadLoginData().role)
                regularGetList({ page, size }).then(data => {
                    if (data.error) {
                        exceptionHandler(data)
                    } else {
                        setServerData(data)
                    }
                })
            } else {
                console.log(loadLoginData().role)
                regularGetUserList({ page, size }, loginUser).then(data => {
                    if (data.error) {
                        exceptionHandler(data)
                    } else {
                        setServerData(data)
                    }
                })
            }
        } else {
            setServerData(pageServerData)
        }
    }, [page, size, pageServerData])

    return (
        <div>
            <div className="grid grid-cols-7">
                <div>No</div>
                <div>차량번호</div>
                <div>이름</div>
                <div>동</div>
                <div>호</div>
                <div>전화번호</div>
                <div>등록 일자</div>
            </div>

            {/* 유저 데이터를 map으로 렌더링 */}
            {serverData.dtoList.map((regular, index) => (
                <div key={index} className="grid grid-cols-7">
                    <div>
                        <input
                            type='checkbox'
                            checked={checked.includes(regular.rpno)} // 페이지 이동 시 체크항목 유지
                            onChange={() => handleCheckChange(regular.rpno)}
                        />
                    </div>
                    <div>{regular.carNum}</div>
                    <div>{regular.name}</div>
                    <div>{regular.household ? regular.household.householdPK.dong : 'Null'}</div>
                    <div>{regular.household ? regular.household.householdPK.ho : 'Null'}</div>
                    <div>{regular.phone}</div>
                    <div>{regular.regDate}</div>
                </div>
            ))}
            <PageComponent serverData={serverData} movePage={(pageParam) => moveToPath('/parking/regular', pageParam)} />
        </div>
    );
}

export default RegularListComponent