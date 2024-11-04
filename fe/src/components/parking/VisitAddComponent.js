import React, { useState } from 'react'
import useCustom from '../hook/useCustom'
import { visitPostAdd } from '../api/parking/visitApi'
import useCustomLogin from '../hook/useCustomLogin'

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
          <div>
            입차 예상 날짜
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
          {/* 권한 별 분기 - 동/호 선택 여부 */}
          {loadLoginData().role !== 'ADMIN' && loadLoginData().role !== 'ROOT' ?
            <>
              <div>
                <input className='border'
                  name='dong'
                  value={loadLoginData().dong}
                  readOnly
                  onChange={handleChange} />
              </div>
              <div>
                <input className='border'
                  name='ho'
                  value={loadLoginData().ho}
                  readOnly
                  onChange={handleChange} />
              </div>
            </>
            :
            <>
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
            </>
          }
          {/* --------------- */}
          <div>
            <input className='border'
              type='date'
              name='expectedDate'
              onChange={handleChange} />
          </div>
        </div>
        <div>
          <button type='button' className='bg-blue-400 p-2'
            onClick={handleClick}>추가</button>
          <button type='button' className='bg-red-400 p-2'
            onClick={(pageParam) => moveToPath('/parking/visit', pageParam)}>취소</button>
        </div>
      </div>
    </div>
  )
}

export default VisitAddComponent