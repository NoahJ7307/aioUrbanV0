import React, { useEffect, useState } from 'react'
import useCustom from '../hook/useCustom'
import { getOne, putOne } from '../api/userApi'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { addRole } from '../api/superAdmin/superAdminApi'
import '../../css/public/public.css'

const initState = {
    dong: 0,
    ho: 0,
    userName: '',
    phone: '',
    pw: '',
    userRoleList: [],
    delFlag: [],
}

const roleLabelList = {
    PENDING: '승인대기',
    USER: '일반유저',
    ADMIN: '관리자',
    ROOT: '루트',
}

const UserManageAddRoleComponent = () => {
    const { moveToPath } = useCustom()
    const [userData, setUserData] = useState({ ...initState })
    const { checkedUno } = useOutletContext()
    const [roleData, setRoleData] = useState('')

    // data 수신
    useEffect(() => {
        getOne(checkedUno[0]).then(data => {
            console.log(data)
            setUserData({
                // null || undefined 일 경우 '' || 0 로 대체 (controlled input 에러)
                ...data,
                userName: data.userName || '',
                phone: data.phone || '',
                pw: data.pw || '',
                dong: data.dong ?? 0,
                ho: data.ho ?? 0,
                userRoleList: data.userRoleList ?? [],
                delFlag: data.delFlag,
            })
        })
    }, [checkedUno])

    const handleChange = (e) => {
        let value = e.target.value
        if (e.target.name === 'delFlag') {
            value = value === 'true'
            console.log(value)
        }
        userData[e.target.name] = e.target.value
        setUserData({ ...userData })
    }

    const handleChangeRole = (e) => {
        setRoleData(e.target.value)
    }

    // 수정 data 전송
    const handleClick = async () => {
        console.log('addRole uno : ' + checkedUno[0])
        await putOne(checkedUno[0], userData).then(() => {
            console.log('addRole success')
        })
        await addRole(checkedUno[0], roleData).then(data => {
            console.log('addRole success : ', data)
            moveToPath('/superAdmin/userManage')
        })
    }
    return (
        <div className='formContainer'>
            <div className="formGroup">
                <label className="formLabel">이름</label>
                <input className='inputBox'
                    name='userName'
                    value={userData.userName}
                    placeholder='이름 입력'
                    onChange={handleChange} />
            </div>
            <div className="formGroup">
                <label className="formLabel">전화번호</label>
                <input className='inputBox'
                    name='phone'
                    value={userData.phone}
                    placeholder='전화번호 입력'
                    onChange={handleChange} />
            </div>
            <div className="formGroup">
                <label className="formLabel">비밀번호</label>
                <input className='inputBox'
                    name='pw'
                    placeholder='비밀번호 입력'
                    onChange={handleChange} />
            </div>
            <div className="formGroup">
                <label className="formLabel">비밀번호 확인</label>
                <input className='inputBox'
                    name='pw'
                    placeholder='비밀번호 입력'
                    onChange={handleChange} />
            </div>
            <div className="formGroup">
                <label className="formLabel">동</label>
                <input className='inputBox'
                    name='dong'
                    placeholder='동 입력'
                    value={userData.dong}
                    onChange={handleChange} />
            </div>
            <div className="formGroup">
                <label className="formLabel">호</label>
                <input className='inputBox'
                    name='ho'
                    placeholder='호 입력'
                    value={userData.ho}
                    onChange={handleChange} />
            </div>
            <div className="formGroup">
                <label className="formLabel">권한</label>
                <select className='inputBox'
                    name='userRoleList'
                    onChange={handleChangeRole}>
                    <option value={userData.userRoleList[0]}>
                        {roleLabelList[userData.userRoleList[0]] || '삭제된 유저'}</option>
                    <option value='PENDING'>승인대기</option>
                    <option value='USER'>일반유저</option>
                    <option value='ADMIN'>관리자</option>
                    <option value='ROOT'>루트</option>
                </select>
            </div>
            <div className="formGroup">
                <label className="formLabel">복구</label>
                <select className='inputBox'
                    name='delFlag'
                    onChange={handleChange}>
                    <option value={userData.delFlag}>{userData.delFlag ? '삭제된 유저' : '삭제되지 않은 유저'}</option>
                    <option value='false'>복구</option>
                    <option value='true'>삭제</option>
                </select>
            </div>
            <div className="buttonGroup">
                <button type='button' className='formButton add'
                    onClick={handleClick}>수정</button>
                <button type='button' className='formButton cancel'
                    onClick={() => moveToPath('/superAdmin/userManage')}>취소</button>
            </div>
        </div>
    )
}

export default UserManageAddRoleComponent