import React, { useEffect, useState } from 'react'
import useCustom from '../hook/useCustom'
import { getOne, putOne } from '../api/userApi'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { addRole } from '../api/superAdmin/superAdminApi'

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
                    <div>
                        권한
                    </div>
                    <div>
                        복구
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
                    <div>
                        <select className=''
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
                    <div>
                        <select className=''
                            name='delFlag'
                            onChange={handleChange}>
                            <option value={userData.delFlag}>{userData.delFlag ? '삭제된 유저' : '삭제되지 않은 유저'}</option>
                            <option value='false'>복구</option>
                            <option value='true'>삭제</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type='button' className='bg-blue-400 p-2'
                        onClick={handleClick}>수정</button>
                    <button type='button' className='bg-red-400 p-2'
                        onClick={() => moveToPath('/superAdmin/userManage')}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default UserManageAddRoleComponent