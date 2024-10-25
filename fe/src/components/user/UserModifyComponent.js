import React, { useEffect, useState } from 'react'
import useCustom from '../hook/useCustom'
import { getOne, putOne } from '../api/userApi'
import { useOutletContext } from 'react-router-dom'
import useCustomLogin from '../hook/useCustomLogin'

const initState = {
    dong: 0,
    ho: 0,
    userName: "",
    phone: "",
    pw: "",
}

const UserModifyComponent = () => {
    const { moveToList } = useCustom()
    const [userData, setUserData] = useState({ ...initState })
    const { checkedUno } = useOutletContext()

    // data 수신
    useEffect(() => {
        getOne(checkedUno[0]).then(data => {
            setUserData({
                // null || undefined 일 경우 "" || 0 로 대체 (controlled input 에러)
                ...data,
                userName: data.userName || "",
                phone: data.phone || "",
                pw: data.pw || "",
                dong: data.dong ?? 0,
                ho: data.ho ?? 0,
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
        putOne(checkedUno[0], userData)
        console.log("modify success")
        moveToList()
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
                            value={userData.userName}
                            placeholder={userData.userName}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            name='phone'
                            value={userData.phone}
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
                            value={userData.dong}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            name='ho'
                            value={userData.ho}
                            onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <button type='button' className='bg-blue-400 p-2'
                        onClick={handleClick}>추가</button>
                    <button type='button' className='bg-red-400 p-2'
                        onClick={moveToList}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default UserModifyComponent