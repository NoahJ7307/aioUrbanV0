import React, { useState } from 'react'
import useCustom from '../hook/useCustom'
import { visitPostAdd } from '../api/parking/visitApi'
import useCustomLogin from '../hook/useCustomLogin'
import '../../css/public/public.css'

const initState = {
  carNum: '',
  name: '',
  phone: '',
  dong: 0,
  ho: 0,
  expectedDate: '',
}

const VisitAddComponent = () => {
  const { page, size, moveToPath } = useCustom()
  const [serverData, setServerData] = useState({ ...initState })
  const { loadLoginData } = useCustomLogin()

  const handleChange = (e) => {
    serverData[e.target.name] = e.target.value
    setServerData({ ...serverData })
  }
  const handleClick = () => {
    visitPostAdd(serverData).then(data => {
      console.log('success : ' + data)
      moveToPath('/parking/visit', { page, size })
    })
  }
  return (
    <div className='formContainer'>
      <div className="formGroup">
        <label className="formLabel">차량번호</label>
        <input
          className="inputBox"
          name="carNum"
          placeholder="차량번호 입력"
          onChange={handleChange}
        />
      </div>
      <div className="formGroup">
        <label className="formLabel">이름</label>
        <input
          className="inputBox"
          name="name"
          placeholder="이름 입력"
          onChange={handleChange}
        />
      </div>
      
      {/* 권한 별 분기 - 동/호 선택 여부 */}
      {loadLoginData().role !== 'ADMIN' && loadLoginData().role !== 'ROOT' ?
        <>
          <div className="formGroup">
            <label className="formLabel">동</label>
            <input className="inputBox"
              name='dong'
              value={loadLoginData().dong}
              placeholder="수정 불가"
              readOnly
              onChange={handleChange} />
          </div>
          <div className="formGroup">
            <label className="formLabel">호</label>
            <input className="inputBox"
              name='ho'
              value={loadLoginData().ho}
              placeholder="수정 불가"
              readOnly
              onChange={handleChange} />
          </div>
        </>
        :
        <>
          <div className="formGroup">
            <label className="formLabel">동</label>
            <input className="inputBox"
              name='dong'
              placeholder="동 입력"
              onChange={handleChange} />
          </div>
          <div className="formGroup">
            <label className="formLabel">호</label>
            <input className="inputBox"
              name='ho'
              placeholder="호 입력"
              onChange={handleChange} />
          </div>
        </>
      }
      <div className="formGroup">
        <label className="formLabel">전화번호</label>
        <input
          className="inputBox"
          name="phone"
          placeholder="전화번호 입력"
          onChange={handleChange}
        />
      </div>
      {/* --------------- */}
      <div className="formGroup">
        <label className="formLabel">입차 예상 날짜</label>
        <input className='inputBox'
          type='date'
          name='expectedDate'
          onChange={handleChange} />
      </div>
      <div className="buttonGroup">
        <button type='button' className='formButton add'
          onClick={handleClick}>추가</button>
        <button type='button' className='formButton cancel'
          onClick={(pageParam) => moveToPath('/parking/visit', pageParam)}>취소</button>
      </div>
    </div>

  )
}

export default VisitAddComponent