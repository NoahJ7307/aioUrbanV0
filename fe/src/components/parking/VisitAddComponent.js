import React, { useState } from 'react'
import useCustom from '../hook/useCustom'
import { visitPostAdd } from '../api/parking/visitApi'
import useCustomLogin from '../hook/useCustomLogin'
import '../../css/public/public.css'

const initState = {
  carNum: '',
  name: '',
  phone: '',
  dong: '',
  ho: '',
  expectedDate: '',
}

const VisitAddComponent = () => {
  const { page, size, moveToPath } = useCustom()
  const [serverData, setServerData] = useState({ ...initState })
  const { loadLoginData } = useCustomLogin()
  const [errors, setErrors] = useState({})
  const initDong = loadLoginData().dong
  const initHo = loadLoginData().ho

  const handleChange = (e) => {
    serverData[e.target.name] = e.target.value
    setServerData({ ...serverData })
    if (loadLoginData().role === 'USER') {
      setServerData({ ...serverData, dong: initDong, ho: initHo })
      console.log(serverData)
    }
  }
  const handleClick = () => {
    // 입력 예외처리
    const fieldLabels = {
      carNum: '차량번호',
      name: '이름',
      phone: '전화번호',
      dong: '동',
      ho: '호',
      expectedDate: '입차 예상 날짜',
    }
    const errorMsg = [] // 인풋 에러 메세지
    const newErrors = {} // 인풋 에러 상태
    for (const [key, value] of Object.entries(serverData)) {
      if (!value) {
        console.log(key, value)
        errorMsg.push(`[${fieldLabels[key]}]`)
        newErrors[key] = true
      }
    }

    setErrors(newErrors)

    if (errorMsg.length > 0) {
      alert(errorMsg.join(' ') + ' 입력값이 없습니다')
      return
    }

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
          className={`inputBox ${errors.carNum && 'error'}`}
          name="carNum"
          placeholder="차량번호 입력"
          onChange={handleChange}
        />
      </div>
      <div className="formGroup">
        <label className="formLabel">이름</label>
        <input
          className={`inputBox ${errors.name && 'error'}`}
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
            <input
              className={`inputBox ${errors.dong && 'error'}`}
              name='dong'
              value={initDong}
              placeholder="수정 불가"
              readOnly
              onChange={handleChange} />
          </div>
          <div className="formGroup">
            <label className="formLabel">호</label>
            <input
              className={`inputBox ${errors.ho && 'error'}`}
              name='ho'
              value={initHo}
              placeholder="수정 불가"
              readOnly
              onChange={handleChange} />
          </div>
        </>
        :
        <>
          <div className="formGroup">
            <label className="formLabel">동</label>
            <input
              className={`inputBox ${errors.dong && 'error'}`}
              name='dong'
              placeholder="동 입력"
              onChange={handleChange} />
          </div>
          <div className="formGroup">
            <label className="formLabel">호</label>
            <input
              className={`inputBox ${errors.ho && 'error'}`}
              name='ho'
              placeholder="호 입력"
              onChange={handleChange} />
          </div>
        </>
      }
      <div className="formGroup">
        <label className="formLabel">전화번호</label>
        <input
          className={`inputBox ${errors.phone && 'error'}`}
          name="phone"
          placeholder="전화번호 입력"
          onChange={handleChange}
        />
      </div>
      {/* --------------- */}
      <div className="formGroup">
        <label className="formLabel">입차 예상 날짜</label>
        <input
          className={`inputBox ${errors.expectedDate && 'error'}`}
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