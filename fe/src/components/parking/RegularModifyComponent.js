import React, { useEffect, useState } from 'react'
import useCustom from '../hook/useCustom'
import { regularGetOne, regularPutOne } from '../api/parking/regularApi'
import { useOutletContext } from 'react-router-dom'
import useCustomLogin from '../hook/useCustomLogin'

const initState = {
    carNum: "",
    name: "",
    phone: "",
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
                // null || undefined 일 경우 "" || 0 로 대체 (controlled input 에러)
                ...data,
                carNum: data.carNum || "",
                name: data.name || "",
                phone: data.phone || "",
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
        <div className='flex p-2'>
            <div className='p-2'>
                <div>
                    <div>
                        차량번호
                    </div>
                    <div>
                        이름
                    </div>
                    <div>
                        전화번호
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
                            name='carNum'
                            value={serverData.carNum}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            name='name'
                            value={serverData.name}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            name='phone'
                            value={serverData.phone}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            name='dong'
                            value={serverData.dong}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            name='ho'
                            value={serverData.ho}
                            onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <button type='button' className='bg-blue-400 p-2'
                        onClick={handleClick}>수정</button>
                    <button type='button' className='bg-red-400 p-2'
                        onClick={(pageParam) => moveToPath('/parking/regular', pageParam)}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default RegularModifyComponent