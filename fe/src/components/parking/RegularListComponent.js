import React, { useEffect, useState } from 'react'
import { getList, getUserList } from '../api/parking/regularApi'
import useCustom from '../hook/useCustom'
import { useOutletContext } from 'react-router-dom'
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

const RegularListComponent = () => {
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
        console.log(checked)
        if (checked.length > 0) {
            setCheckedRpno(checked);
            console.log("checked:" + checked)
        } else {
            setCheckedRpno([]);
        }
    }, [checked, setCheckedRpno]);

    useEffect(() => {
        if (loadLoginData().role == 'ADMIN' || loadLoginData().role == 'ROOT') {
            getList({ page, size }).then(data => {
                if (data.error) {
                    exceptionHandler(data)
                } else {
                    setServerData(data);
                }
            })
        } else {
            getUserList({ page, size }).then(data => {
                if (data.error) {
                    exceptionHandler(data)
                } else {
                    setServerData(data);
                }
            })
        }
    }, [page, size])

    return (
        <div>
            <div className="grid grid-cols-7">
                <div>No</div>
                <div>CarNumber</div>
                <div>name</div>
                <div>dong</div>
                <div>ho</div>
                <div>phoneNumber</div>
                <div>regDate</div>
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
                    <div>{regular.household.householdPK.dong}</div>
                    <div>{regular.household.householdPK.ho}</div>
                    <div>{regular.phone}</div>
                    <div>{regular.regDate}</div>
                </div>
            ))}
            <PageComponent serverData={serverData} movePage={(pageParam) => moveToPath('/parking/regular', pageParam)} />
        </div>
    );
}

export default RegularListComponent