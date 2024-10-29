import React, { useState } from 'react'
import useCustom from '../hook/useCustom'
import { RegularPostAdd } from '../api/parking/regularApi'
import { useNavigate } from 'react-router-dom'

const initState = {
  carNum: "",
  name: "",
  phone: "",
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
    RegularPostAdd(serverData).then(data => {
      console.log("success : " + data)
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
            onClick={(pageParam) => moveToPath('/parking/regular', pageParam)}>취소</button>
        </div>
      </div>
    </div>
  )
}

export default RegularAddComponent