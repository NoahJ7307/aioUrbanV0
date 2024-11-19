import React, { useState } from 'react'
import useCustom from '../hook/useCustom'
import { regularPostAdd } from '../api/parking/regularApi'
import '../../css/public/public.css'

const initState = {
  carNum: '',
  name: '',
  phone: '',
  dong: 0,
  ho: 0,
}
const RegularAddComponent = () => {
  const { page, size, moveToPath } = useCustom()
  const [serverData, setServerData] = useState({ ...initState })

  const handleChange = (e) => {
    serverData[e.target.name] = e.target.value
    setServerData({ ...serverData })
  }
  const handleClick = () => {
    regularPostAdd(serverData).then(data => {
      console.log('success : ' + data)
      moveToPath('/parking/regular', { page, size })
    })
  }
  return (
    <div className="formContainer">
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
      <div className="formGroup">
        <label className="formLabel">전화번호</label>
        <input
          className="inputBox"
          name="phone"
          placeholder="전화번호 입력"
          onChange={handleChange}
        />
      </div>
      <div className="formGroup">
        <label className="formLabel">동</label>
        <input
          className="inputBox"
          name="dong"
          placeholder="동 입력"
          onChange={handleChange}
        />
      </div>
      <div className="formGroup">
        <label className="formLabel">호</label>
        <input
          className="inputBox"
          name="ho"
          placeholder="호 입력"
          onChange={handleChange}
        />
      </div>
      <div className="buttonGroup">
        <button type="button" className="formButton add" onClick={handleClick}>
          추가
        </button>
        <button
          type="button"
          className="formButton cancel"
          onClick={() => moveToPath('/parking/regular', { page, size })}
        >
          취소
        </button>
      </div>
    </div>
  )
}

export default RegularAddComponent