import React, { useCallback, useEffect, useState } from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import useCustomLogin from '../../components/hook/useCustomLogin'
import RegularListComponent from '../../components/parking/RegularListComponent'
import { deleteChecked } from '../../components/api/userApi'
import { RegularParkingDeleteChecked } from '../../components/api/parking/regularApi'

const RegularPage = () => {
  const navigate = useNavigate()
  const { checkedRpno, setCheckedRpno } = useOutletContext() // 부모에게서 전달된 함수
  const { loadLoginData } = useCustomLogin()

  const handleClickAdd = useCallback(() => { navigate({ pathname: 'add' }) })

  const handleClickModify = useCallback(() => {
    if (checkedRpno.length == 1) {
      navigate({ pathname: `modify/${checkedRpno[0]}` })  // 1개 체크 시
    } else if (checkedRpno.length > 1) {
      alert("하나만 선택해주세요") // 여러개 체크 시
    } else {
      alert("선택된 항목이 없습니다") // 미체크 시
    }
  }, [checkedRpno, navigate])

  const handleClickDelete = async () => {
    if (checkedRpno.length > 0) {
      await RegularParkingDeleteChecked(checkedRpno)
      navigate({ pathname: '/parking/regular' }) // 삭제 후 새로고침 기능 수행
    } else {
      alert("선택된 항목이 없습니다")
      navigate({ pathname: '/parking/regular' })
    }
  }
  return (
    <div>
      {loadLoginData().role !== 'ADMIN' && loadLoginData().role !== 'ROOT' ? 
      <></>:
      <ul className='flex justify-center'>
      <li>
        <button className='bg-gray-300 p-2 mr' onClick={handleClickAdd}>
          등록
        </button>
      </li>
      <li>
        <button className='bg-gray-300 p-2 mr' onClick={handleClickModify}>
          수정
        </button>
      </li>
      <li>
        <button className='bg-gray-300 p-2 mr' onClick={handleClickDelete}>
          삭제
        </button>
      </li>
    </ul>
    }
      <RegularListComponent />
      <Outlet context={{ checkedRpno, setCheckedRpno }} />
    </div>
  )
}

export default RegularPage