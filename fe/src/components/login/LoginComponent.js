import React, { useCallback, useState } from 'react'
import useCustomLogin from '../hook/useCustomLogin'
import '../../css/public/public.css'
import { Outlet, useNavigate } from 'react-router-dom'
import FindPwComponent from './FindPwComponent'

const initState = {
    phone: '',
    pw: '',
}
const LoginComponent = () => {
    const navigate = useNavigate()
    const [loginParam, setLoginParam] = useState(initState)
    const { doLogin } = useCustomLogin()

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value
        setLoginParam({ ...loginParam })
    }
    const handleClick = () => {
        doLogin(loginParam)
        setLoginParam(initState)
    }

    return (
        <div>
            <div className='outlet'>
                <Outlet />
            </div>
            <div className='formContainer'>
                <div className='formGroup'>
                    <label className='formLabel'>전화번호</label>
                    <input className='inputBox'
                        name='phone'
                        placeholder='전화번호 입력'
                        type='text'
                        value={loginParam.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className='formGroup'>
                    <label className='formLabel'>비밀번호</label>
                    <input className='inputBox'
                        name='pw'
                        type='password'
                        placeholder='비밀번호 입력'
                        value={loginParam.pw}
                        onChange={handleChange}
                    />
                </div>
                <div className='buttonGroup'>
                    <button type='button' className='formButton add'
                        onClick={() => navigate('findPw')}>비밀번호 찾기</button>
                    <button type='button' className='formButton add'
                        onClick={handleClick}>로그인</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent