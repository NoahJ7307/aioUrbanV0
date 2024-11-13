import React, { useState } from 'react'

const initState = {
    dong: 0,
    ho: 0,
    userName: "",
    phone: "",
    pw: "",
    userRoleList: [],
}

const MyInfoComponent = () => {
    const [userData, setUserData] = useState({ ...initState })

    const handleChange = (e) => {
        userData[e.target.name] = e.target.value
        setUserData({ ...userData })
    }
    const handleClick = () => {
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
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            name='phone'
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            name='pw'
                            type='password'
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            name='dong'
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            name='ho'
                            onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <button type='button' className='bg-blue-400 p-2'
                        onClick={handleClick}>수정</button>
                    <button type='button' className='bg-red-400 p-2'
                        onClick={handleClick}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default MyInfoComponent