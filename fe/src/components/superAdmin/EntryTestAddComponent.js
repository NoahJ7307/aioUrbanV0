import React, { useState } from 'react'
import useCustom from '../hook/useCustom'
import { entryPost, exitPost } from '../api/parking/entryApi'
import '../../css/public/public.css'

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
        <div className='formContainer superAdminAdd'>
            <div className="formGroup superAdminAdd">
                <label className="formLabel">차량번호</label>
                <input
                    className="inputBox"
                    name='carNum'
                    onChange={handleChange} />
            </div>
            <div className="formGroup superAdminAdd">
                <label className="formLabel">동</label>
                <input
                    className="inputBox"
                    name='dong'
                    onChange={handleChange} />
            </div>
            <div className="formGroup superAdminAdd">
                <label className="formLabel">호</label>
                <input
                    className="inputBox"
                    name='ho'
                    onChange={handleChange} />
            </div>
            <div className="formGroup superAdminAdd">
                <label className="formLabel">입차일</label>
                <input
                    className="inputBox"
                    type='date'
                    name='entryDate'
                    onChange={handleChange} />
            </div>
            <div className="formGroup superAdminAdd">
                <label className="formLabel">출차일</label>
                <input
                    className="inputBox"
                    type='date'
                    name='exitDate'
                    onChange={handleChange} />
            </div>
            <div className="buttonGroup">
                <button type='button' className='formButton add'
                    onClick={handleClickEntry}>입차</button>
                <button type='button' className='formButton cancel'
                    onClick={handleClickExit}>출차</button>
            </div>
        </div>
    )
}

export default EntryTestAddComponent