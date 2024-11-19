import React, { useEffect, useState } from 'react'
import useCustom from '../hook/useCustom'
import { useOutletContext } from 'react-router-dom'
import { visitGetOne, visitPutOne } from '../api/parking/visitApi'
import useCustomLogin from '../hook/useCustomLogin'
import '../../css/public/public.css'

const initState = {
    carNum: '',
    name: '',
    phone: '',
    dong: 0,
    ho: 0,
    expectedDate: '',
}

const VisitModifyComponent = () => {
    const { moveToPath, page, size } = useCustom()
    const [serverData, setServerData] = useState({ ...initState })
    const { checkedVpno } = useOutletContext()
    const { loadLoginData } = useCustomLogin()

    // data 수신
    useEffect(() => {
        visitGetOne(checkedVpno[0]).then(data => {
            console.log(data)
            setServerData({
                // null || undefined 일 경우 '' || 0 로 대체 (controlled input 에러)
                ...data,
                carNum: data.carNum || '',
                name: data.name || '',
                phone: data.phone || '',
                dong: data.household.householdPK.dong ?? 0,
                ho: data.household.householdPK.ho ?? 0,
                expectedDate: data.expectedDate ?? '',
            })
        })
    }, [checkedVpno])

    const handleChange = (e) => {
        serverData[e.target.name] = e.target.value
        setServerData({ ...serverData })
    }

    const handleClick = () => {
        visitPutOne(checkedVpno[0], serverData).then(() => {
            moveToPath('/parking/visit', { page, size })
        })
    }
    return (
        <div className='formContainer'>
            <div className="formGroup">
                <label className="formLabel">차량번호</label>
                <input
                    className="inputBox"
                    name="carNum"
                    placeholder='차량번호 입력'
                    value={serverData.carNum}
                    onChange={handleChange}
                />
            </div>
            <div className="formGroup">
                <label className="formLabel">이름</label>
                <input
                    className="inputBox"
                    name="name"
                    placeholder='이름 입력'
                    value={serverData.name}
                    onChange={handleChange}
                />
            </div>
            {/* 권한 별 분기 - 동/호 선택 여부 */}
            {loadLoginData().role !== 'ADMIN' && loadLoginData().role !== 'ROOT' ?
                <>
                    <div className="formGroup">
                        <label className="formLabel">동</label>
                        <input className="inputBox"
                            name='dong'
                            value={loadLoginData().ho}
                            disabled
                            onChange={handleChange} />
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">호</label>
                        <input className="inputBox"
                            name='ho'
                            value={loadLoginData().ho}
                            disabled
                            onChange={handleChange} />
                    </div>
                </>
                :
                <>
                    <div className="formGroup">
                        <label className="formLabel">동</label>
                        <input className="inputBox"
                            name='dong'
                            placeholder="동 입력"
                            value={loadLoginData().dong}
                            onChange={handleChange} />
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">호</label>
                        <input className="inputBox"
                            name='ho'
                            placeholder="호 입력"
                            value={loadLoginData().ho}
                            onChange={handleChange} />
                    </div>
                </>
            }
            {/* --------------- */}

            <div className="formGroup">
                <label className="formLabel">전화번호</label>
                <input
                    className="inputBox"
                    name="phone"
                    placeholder='전화번호 입력'
                    value={serverData.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="formGroup">
                <label className="formLabel">입차 예상 날짜</label>
                <input className='inputBox'
                    type='date'
                    name='expectedDate'
                    onChange={handleChange} />
            </div>
            <div className="buttonGroup">
                <button type='button' className='formButton add'
                    onClick={handleClick}>수정</button>
                <button type='button' className='formButton cancel'
                    onClick={(pageParam) => moveToPath('/parking/visit', pageParam)}>취소</button>
            </div>
        </div>
    )
}

export default VisitModifyComponent