import React, { useEffect, useState } from 'react'
import { getList } from '../api/parking/regularApi'
import useCustom from '../hook/useCustom'
import { useOutletContext } from 'react-router-dom'
import PageComponent from '../common/PageComponent'

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
    const { page, size, moveToList } = useCustom()
    const [checked, setChecked] = useState([])
    const { setCheckedUno } = useOutletContext() // 부모에게서 전달된 함수

    const handleCheckChange = (uno) => {
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
            setCheckedUno(checked);
            console.log("checked:" + checked)
        } else {
            setCheckedUno([]);
        }
    }, [checked, setCheckedUno]);

    useEffect(() => {
        getList({ page, size }).then(data => {
            setServerData(data)
        }).catch(err => {
            console.error("Axios error", err)
        })
    }, [page, size])

    return (
        <div>
            <div className="grid grid-cols-6">
                <div>No</div>
                <div>CarNumber</div>
                <div>name</div>
                <div>phoneNumber</div>
                <div>regDate</div>
            </div>

            {/* 유저 데이터를 map으로 렌더링 */}
            {serverData.dtoList.map((user, index) => (
                <div key={index} className="grid grid-cols-6">
                    <div>
                        <input
                            type='checkbox'
                            checked={checked.includes(user.rpno)} // 페이지 이동 시 체크항목 유지
                            onChange={() => handleCheckChange(user.uno)}
                        />
                    </div>
                    <div>{user.CarNum}</div>
                    <div>{user.name}</div>
                    <div>{user.phone}</div>
                    <div>{user.regDate}</div>
                </div>
            ))}
            <PageComponent serverData={serverData} movePage={moveToList} />
        </div>
    );
}

export default RegularListComponent