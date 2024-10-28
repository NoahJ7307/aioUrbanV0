import React, { useState } from 'react'
import useCustom from '../hook/useCustom'
import { RegularPostAdd } from '../api/parking/regularApi'

const initState = {
  carNum: "",
  name: "",
  phone: "",
  dong: 0,
  ho: 0,
}
const RegularAddComponent = () => {
  const { moveToList } = useCustom()
  const [userData, setUserData] = useState({ ...initState })

  const handleChange = (e) => {
    userData[e.target.name] = e.target.value
    setUserData({ ...userData })
  }
  const handleClick = () => {
    RegularPostAdd(userData).then(data => {
      console.log("success : " + data)
      // moveToList()
    })
  }
  return (
    <div className='flex p-2'>
      <div className='p-2'>
        <div>
          <div>
            차번호
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
              onChange={handleChange} />
          </div>
          <div>
            <input className='border'
              name='name'
              onChange={handleChange} />
          </div>
          <div>
            <input className='border'
              name='phone'
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

export default RegularAddComponent