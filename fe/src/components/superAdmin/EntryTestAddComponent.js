import React, { useState } from 'react'
import useCustom from '../hook/useCustom'
import { entryPost, exitPost } from '../api/parking/entryApi'

const initState = {
    carNum: '',
    name: '',
    phone: '',
    dong: 0,
    ho: 0,
    entryDate: '',
    exitDate: '',
}

const EntryTestAddComponent = () => {
    const [serverData, setServerData] = useState({ ...initState })

    const handleChange = (e) => {
        serverData[e.target.name] = e.target.value
        setServerData({ ...serverData })
    }

    const handleClickEntry = () => {
        entryPost(serverData)
        window.location.reload()

    }

    const handleClickExit = () => {
        exitPost(serverData)
        window.location.reload()

    }
    return (
        <div className='flex p-2'>
            <div className='p-2'>
                <div>
                    <div>
                        차량번호
                    </div>
                    <div>
                        동
                    </div>
                    <div>
                        호
                    </div>
                    <div>
                        입차일
                    </div>
                    <div>
                        출차일
                    </div>
                </div>
            </div>
            <div>
                <div className='p-2'>
                    <div>
                        <input className='border'
                            name='carNum'
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
                    <div>
                        <input className='border'
                            type='date'
                            name='entryDate'
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input className='border'
                            type='date'
                            name='exitDate'
                            onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <button type='button' className='bg-blue-400 p-2'
                        onClick={handleClickEntry}>입차 추가</button>
                    <button type='button' className='bg-red-400 p-2'
                        onClick={handleClickExit}>출차 추가</button>
                </div>
            </div>
        </div>
    )
}

export default EntryTestAddComponent