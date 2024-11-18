import React, { useEffect, useState } from 'react'
import useCustom from '../hook/useCustom'
import { regularGetOne, regularPutOne } from '../api/parking/regularApi'
import { useOutletContext } from 'react-router-dom'
import useCustomLogin from '../hook/useCustomLogin'
import '../../css/public/public.css'

const initState = {
    carNum: '',
    name: '',
    phone: '',
    dong: 0,
    ho: 0,
}

const RegularModifyComponent = () => {
    const { moveToPath, page, size } = useCustom()
    const [serverData, setServerData] = useState({ ...initState })
    const { checkedRpno } = useOutletContext()
    const { loadLoginData } = useCustomLogin()

    // data 수신
    useEffect(() => {
        regularGetOne(checkedRpno[0]).then(data => {
            console.log(data)
            setServerData({
                // null || undefined 일 경우 '' || 0 로 대체 (controlled input 에러)
                ...data,
                carNum: data.carNum || '',
                name: data.name || '',
                phone: data.phone || '',
                dong: data.household.householdPK.dong ?? 0,
                ho: data.household.householdPK.ho ?? 0,
            })
        })
    }, [checkedRpno])

    const handleChange = (e) => {
        serverData[e.target.name] = e.target.value
        setServerData({ ...serverData })
    }

    const handleClick = () => {
        regularPutOne(checkedRpno[0], serverData).then(() => {
            moveToPath('/parking/regular', { page, size })
        })
    }
    return (
        <div className="formContainer">
            <div className="formGroup">
                <label className="formLabel">차량번호</label>
                <input
                    className="inputBox"
                    name="carNum"
                    value={serverData.carNum}
                    onChange={handleChange}
                />
            </div>
            <div className="formGroup">
                <label className="formLabel">이름</label>
                <input
                    className="inputBox"
                    name="name"
                    value={serverData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="formGroup">
                <label className="formLabel">전화번호</label>
                <input
                    className="inputBox"
                    name="phone"
                    value={serverData.phone}
                    onChange={handleChange}
                />
            </div>
            {loadLoginData().role !== 'ADMIN' && loadLoginData().role !== 'ROOT' ? (
                <>
                    <div className="formGroup">
                        <label className="formLabel">동</label>
                        <input className="inputBox" value={loadLoginData().dong} readOnly />
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">호</label>
                        <input className="inputBox" value={loadLoginData().ho} readOnly />
                    </div>
                </>
            ) : (
                <>
                    <div className="formGroup">
                        <label className="formLabel">동</label>
                        <input
                            className="inputBox"
                            name="dong"
                            value={serverData.dong}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">호</label>
                        <input
                            className="inputBox"
                            name="ho"
                            value={serverData.ho}
                            onChange={handleChange}
                        />
                    </div>
                </>
            )}
            <div className="buttonGroup">
                <button type="button" className="formButton add" onClick={handleClick}>
                    수정
                </button>
                <button
                    type="button"
                    className="formButton cancel"
                    onClick={() => moveToPath('/parking/regular', { page, size })}
                >
                    취소
                </button>
            </div>
        </div>
    )
}

export default RegularModifyComponent