import React, { useState } from 'react'
import useCustom from '../hook/useCustom'
import { postAdd } from '../api/userApi'
import '../../css/public/public.css'

const initState = {
  dong: 0,
  ho: 0,
  userName: "",
  phone: "",
  pw: "",
  userRoleList: [],
}
const UserAddComponent = () => {
  const { moveToList } = useCustom()
  const [userData, setUserData] = useState({ ...initState })

  const handleChange = (e) => {
    userData[e.target.name] = e.target.value
    setUserData({ ...userData })
  }
  const handleClick = () => {
    const updateData = { ...userData, userRoleList: ['USER'] }
    postAdd(updateData).then(data => {
      console.log("success : " + data)
      moveToList()
    })
  }
  return (
    <div className='formContainer'>
      <div className="formGroup">
        <label className="formLabel">이름</label>
        <input className='inputBox'
          name='userName'
          placeholder="이름 입력"
          onChange={handleChange} />
      </div>
      <div className="formGroup">
        <label className="formLabel">전화번호</label>
        <input className='inputBox'
          name='phone'
          placeholder="전화번호 입력"
          onChange={handleChange} />
      </div>
      <div className="formGroup">
        <label className="formLabel">비밀번호</label>
        <input className='inputBox'
          name='pw'
          type='password'
          placeholder="비밀번호 입력"
          onChange={handleChange} />
      </div>
      <div className="formGroup">
        <label className="formLabel">동</label>
        <input className='inputBox'
          name='dong'
          placeholder="동 입력"
          onChange={handleChange} />
      </div>
      <div className="formGroup">
        <label className="formLabel">호</label>
        <input className='inputBox'
          name='ho'
          placeholder="호 입력"
          onChange={handleChange} />
      </div>
      <div className="buttonGroup">
        <button type='button' className='formButton add'
          onClick={handleClick}>추가</button>
        <button type='button' className='formButton cancel'
          onClick={moveToList}>취소</button>
      </div>
    </div>
  )
}

export default UserAddComponent