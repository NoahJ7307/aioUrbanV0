import React, { useState } from 'react'
import useCustomLogin from '../hook/useCustomLogin'
import { register } from '../api/mainApi'
import '../../css/public/public.css'

const initState = {
    dong: 0,
    ho: 0,
    userName: '',
    phone: '',
    pw: '',
    verifyPw: '',
    userRoleList: [],
}

const JoinComponent = () => {
    const { moveToPath } = useCustomLogin()
    const [userData, setUserData] = useState({ ...initState })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        userData[e.target.name] = e.target.value
        setUserData({ ...userData })
    }

    const handleClick = () => {
        // 입력 예외처리
        const fieldLabels = {
            userName: '이름',
            phone: '전화번호',
            pw: '비밀번호',
            verifyPw: '비밀번호확인',
            dong: '동',
            ho: '호',
        }
        const errorMsg = [] // 인풋 에러 메세지
        const newErrors = {} // 인풋 에러 상태
        for (const [key, value] of Object.entries(userData)) {
            if (key === 'delFlag') continue
            if (key === 'userRoleList') continue
            if (!value) {
                console.log(key, value)
                errorMsg.push(`[${fieldLabels[key]}]`)
                newErrors[key] = true
            }
        }

        setErrors(newErrors)

        if (errorMsg.length > 0) {
            alert(errorMsg.join(' ') + ' 입력값이 없습니다')
            return
        }

        if (!(userData.pw === userData.verifyPw)) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다')
            setErrors({ pw: true, verifyPw: true })
            return
        }

        const updateData = { ...userData, userRoleList: ['PENDING'] }
        register(updateData)
        alert('가입 신청이 완료되었습니다.')
        moveToPath('/login')
    }
    return (
        <div className='formContainer'>
            <div className='formGroup'>
                <label className='formLabel'>이름</label>
                <input className={`inputBox ${errors.userName ? 'error' : ''}`}
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
                <input className={`inputBox ${errors.phone ? 'error' : ''}`}
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
                <input className={`inputBox ${errors.pw ? 'error' : ''}`}
                    type='password'
                    name='pw'
                    placeholder='비밀번호 입력'
                    onChange={handleChange} />
            </div>
            <div className='formGroup'>
                <label className='formLabel'>비밀번호 확인</label>
                <input className={`inputBox ${errors.verifyPw ? 'error' : ''}`}
                    type='password'
                    name='verifyPw'
                    placeholder='비밀번호 입력'
                    onChange={handleChange} />
            </div>
            <div className='formGroup'>
                <label className='formLabel'>동</label>
                <input className={`inputBox ${errors.dong ? 'error' : ''}`}
                    name='dong'
                    placeholder='동 입력'
                    onChange={handleChange} />
            </div>
            <div className='formGroup'>
                <label className='formLabel'>호</label>
                <input className={`inputBox ${errors.ho ? 'error' : ''}`}
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