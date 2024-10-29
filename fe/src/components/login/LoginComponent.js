import React, { useEffect, useState } from 'react'
import useCustomLogin from '../hook/useCustomLogin'

const initState = {
    phone: '',
    pw: '',
}
const LoginComponent = () => {
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
        <div className='border'>
            <div className='flex'>
                <div className='mr-3'>전화번호</div>
                <input className='border border-solid'
                    name='phone'
                    type='text'
                    value={loginParam.phone}
                    onChange={handleChange}
                />
            </div>
            <div className='flex'>
                <div className='mr-3'>비밀번호</div>
                <input className='border border-solid'
                    name='pw'
                    type='password'
                    value={loginParam.pw}
                    onChange={handleChange}
                />
            </div>
            <div className='flex'>
                <button className='bg-gray-300'
                    onClick={handleClick}>로그인</button>
            </div>
        </div>
    )
}

export default LoginComponent