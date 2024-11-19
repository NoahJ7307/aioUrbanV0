import React, { useState } from 'react'
import useCustomLogin from '../hook/useCustomLogin'
import { register } from '../api/mainApi'
import '../../css/public/public.css'

const initState = {
    dong: 0,
    ho: 0,
    userName: "",
    phone: "",
    pw: "",
    userRoleList: [],
}

const JoinComponent = () => {
    const { moveToPath } = useCustomLogin()
    const [userData, setUserData] = useState({ ...initState })

    const handleChange = (e) => {
        userData[e.target.name] = e.target.value
        setUserData({ ...userData })
    }

    const handleClick = () => {
        const updateData = { ...userData, userRoleList: ['PENDING'] }
        register(updateData)
        alert("가입 신청이 완료되었습니다.")
        moveToPath('/')
    }
    return (
        <div className='formContainer'>
            <div className='formGroup'>
                <label className='formLabel'>이름</label>
                <input className='inputBox'
                    name='userName'
                    placeholder='이름 입력'
                    onChange={handleChange} />
            </div>
            <div className='formGroup'>
                <div className='flex justify-end mt-6'>
                    <button type='button' className='formButton add'
                        onClick={handleClick}>인증번호 전송</button>
                    <button type='button' className='formButton add'
                        onClick={handleClick}>인증 확인</button>
                </div>
            </div>
            <div className='formGroup'>
                <label className='formLabel'>전화번호</label>
                <input className='inputBox'
                    name='phone'
                    placeholder='전화번호 입력'
                    onChange={handleChange} />
            </div>
            <div className='formGroup'>
                <label className='formLabel'>인증번호</label>
                <input className='inputBox'
                    name='phone'
                    placeholder='전화번호 입력'
                    onChange={handleChange} />
            </div>
            <div className='formGroup'>
                <label className='formLabel'>비밀번호</label>
                <input className='inputBox'
                    type='password'
                    name='pw'
                    placeholder='비밀번호 입력'
                    onChange={handleChange} />
            </div>
            <div className='formGroup'>
                <label className='formLabel'>비밀번호 확인</label>
                <input className='inputBox'
                    type='password'
                    name='pw'
                    placeholder='비밀번호 입력'
                    onChange={handleChange} />
            </div>
            <div className='formGroup'>
                <label className='formLabel'>동</label>
                <input className='inputBox'
                    name='dong'
                    placeholder='동 입력'
                    onChange={handleChange} />
            </div>
            <div className='formGroup'>
                <label className='formLabel'>호</label>
                <input className='inputBox'
                    name='ho'
                    placeholder='호 입력'
                    onChange={handleChange} />
            </div>
            <div className='buttonGroup'>
                <button type='button' className='formButton add'
                    onClick={handleClick}>회원가입</button>
                <button type='button' className='formButton cancel'
                    onClick={() => moveToPath('/')}>취소</button>
            </div>
        </div>
    )
}

export default JoinComponent