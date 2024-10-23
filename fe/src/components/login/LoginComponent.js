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
                <div className='mr-3'>Phone</div>
                <input className='border border-solid'
                    name='phone'
                    type='text'
                    value={loginParam.phone}
                    onChange={handleChange}
                />
            </div>
            <div className='flex'>
                <div className='mr-3'>Password</div>
                <input className='border border-solid'
                    name='pw'
                    type='password'
                    value={loginParam.pw}
                    onChange={handleChange}
                />
            </div>
            <div className='flex'>
                <button className='bg-gray-300'
                    onClick={handleClick}>Login</button>
            </div>
        </div>
    )
}

export default LoginComponent