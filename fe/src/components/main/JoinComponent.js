import React, { useState } from 'react'
import useCustomLogin from '../hook/useCustomLogin'
import { register } from '../api/mainApi'

const initState = {
    dong: 0,
    ho: 0,
    userName: "",
    phone: "",
    pw: "",
}

const JoinComponent = () => {
    const { moveToPath } = useCustomLogin()
    const [userData, setUserData] = useState({ ...initState })

    const handleChange = (e) => {
        userData[e.target.name] = e.target.value
        setUserData({ ...userData })
    }

    // 수정 data 전송
    const handleClick = () => {
        register(userData)
        alert("join success")
        moveToPath('/')
    }
    return (
        <div className='flex p-2'>
            <div className='p-2'>
                <div>
                    <div>
                        이름
                    </div>
                    <div>
                        전화번호
                    </div>
                    <div>
                        비밀번호
                    </div>
                    <div>
                        동
                    </div>
                    <div>
                        호
                    </div>
                </div>
            </div>
            <div>
                <div className='p-2'>
                    <div>
                        <input className='border'
                            name='userName'
                            placeholder='Insert your Name'
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            name='phone'
                            placeholder='Insert your phone Number'
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            type='password'
                            name='pw'
                            placeholder='Insert your password'
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            name='dong'
                            placeholder='Insert your dong'
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            name='ho'
                            placeholder='Insert your ho'
                            onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <button type='button' className='bg-blue-400 p-2'
                        onClick={handleClick}>회원가입</button>
                    <button type='button' className='bg-red-400 p-2'
                        onClick={() => moveToPath('/')}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default JoinComponent