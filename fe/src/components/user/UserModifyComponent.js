import React, { useEffect, useState } from 'react'
import useCustom from '../hook/useCustom'
import { getOne, putOne } from '../api/userApi'
import { useOutletContext } from 'react-router-dom'
import '../../css/public/public.css'

const initState = {
    dong: 0,
    ho: 0,
    userName: "",
    phone: "",
    pw: "",
    userRoleList: [],
}

const UserModifyComponent = () => {
    const { moveToList } = useCustom()
    const [userData, setUserData] = useState({ ...initState })
    const { checkedUno } = useOutletContext()

    // data 수신
    useEffect(() => {
        getOne(checkedUno[0]).then(data => {
            console.log(data)
            setUserData({
                // null || undefined 일 경우 "" || 0 로 대체 (controlled input 에러)
                ...data,
                userName: data.userName || "",
                phone: data.phone || "",
                pw: data.pw || "",
                dong: data.dong ?? 0,
                ho: data.ho ?? 0,
                userRoleList: data.userRoleList ?? [],
            })
        })
    }, [checkedUno])

    const handleChange = (e) => {
        userData[e.target.name] = e.target.value
        setUserData({ ...userData })
    }

    // 수정 data 전송
    const handleClick = () => {
        console.log("modify uno : " + checkedUno[0])
        putOne(checkedUno[0], userData).then(() => {
            console.log("modify success")
            moveToList()
        })
    }
    return (
        <div className='formContainer'>
            <div className="formGroup">
                <label className="formLabel">이름</label>
                <input className='inputBox'
                    name='userName'
                    placeholder='이름 입력'
                    value={userData.userName}
                    onChange={handleChange} />
            </div>
            <div className="formGroup">
                <label className="formLabel">전화번호</label>
                <input className='inputBox'
                    name='phone'
                    placeholder='전화번호 입력'
                    value={userData.phone}
                    onChange={handleChange} />
            </div>
            <div className="formGroup">
                <label className="formLabel">비밀번호</label>
                <input className='inputBox'
                    type='password'
                    name='pw'
                    placeholder='비밀번호 입력'
                    onChange={handleChange} />
            </div>
            <div className="formGroup">
                <label className="formLabel">비밀번호 확인</label>
                <input className='inputBox'
                    type='password'
                    name='pw'
                    placeholder='비밀번호 입력'
                    onChange={handleChange} />
            </div>
            <div className="formGroup">
                <label className="formLabel">동</label>
                <input className='inputBox'
                    name='dong'
                    placeholder='동 입력'
                    value={userData.dong}
                    onChange={handleChange} />
            </div>
            <div className="formGroup">
                <label className="formLabel">호</label>
                <input className='inputBox'
                    name='ho'
                    placeholder='동 입력'
                    value={userData.ho}
                    onChange={handleChange} />
            </div>
            <div className="buttonGroup">
                <button type='button' className='formButton add'
                    onClick={handleClick}>추가</button>
                <button type='button' className='formButton cancel'
                    onClick={moveToList}>취소</button>
            </div>
        </div>
    )
}

export default UserModifyComponent