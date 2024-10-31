import React, { useCallback, useEffect, useState } from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import useCustomLogin from '../../components/hook/useCustomLogin'
import RegularListComponent from '../../components/parking/RegularListComponent'
import { deleteChecked } from '../../components/api/userApi'
import { getRegularSearchList, RegularParkingDeleteChecked } from '../../components/api/parking/regularApi'
import useCustom from '../../components/hook/useCustom'

const initStateSearchData = {
  searchCategory: '',
  searchValue: '',
}

const initStateSearchDateData = {
  regDateStart: '1800-1-1',
  regDateEnd: '2200-12-31',
}

const initStateServerData = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0
}

const RegularPage = () => {
  const navigate = useNavigate()
  const { checkedRpno, setCheckedRpno } = useOutletContext() // 부모에게서 전달된 함수
  const { loadLoginData } = useCustomLogin()
  const [searchData, setSearchData] = useState(initStateSearchData)
  const [searchDateData, setSearchDateData] = useState(initStateSearchDateData)
  const { page, size } = useCustom()
  const [pageServerData, setPageServerData] = useState(initStateServerData)

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

  // ------- 검색 -------
  const handleChangeSearchDateStartValue = (e) => {
    setSearchDateData(prevData => ({ ...prevData, regDateStart: e.target.value }))
    setSearchData(prevData => ({ ...prevData, searchValue: { ...searchData.searchValue, searchDateData } }))
    console.log(searchData)
  }
  const handleChangeSearchDateEndValue = (e) => {
    setSearchDateData(prevData => ({ ...prevData, regDateEnd: e.target.value }))
    setSearchData(prevData => ({ ...prevData, searchValue: { ...searchData.searchValue, searchDateData } }))
    console.log(searchData)
  }
  const handleChangeSearchValue = (e) => {
    setSearchData(prevData => ({ ...prevData, searchValue: e.target.value }))
  }
  const handleChangeSearchCategory = (e) => {
    setSearchData(prevData => ({ ...prevData, searchCategory: e.target.value }))
  }
  const handleClickSearch = () => {
    const pageParam = { page, size }
    getRegularSearchList(pageParam, searchData).then(data => {
      setPageServerData(data)
    })
  }
  const handleClickClear = () => {
    setPageServerData(initStateServerData)
  }
  // --------------------
  return (
    <div>
      {loadLoginData().role !== 'ADMIN' && loadLoginData().role !== 'ROOT' ?
        <></> :
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
          {/* // ------- 검색 ------- */}
          <li>
            <select className=''
              name='searchCategory'
              onChange={handleChangeSearchCategory}>
              <option value=''>검색 필터</option>
              <option value="dong-ho">동-호</option>
              <option value="dong">동</option>
              <option value="ho">호</option>
              <option value="name">이름</option>
              <option value="carNum">차량번호</option>
              <option value="phone">전화번호</option>
              <option value="regDate">등록일자</option>
            </select>
          </li>
          {searchData.searchCategory === 'regDate' ?
            <li>
              <input className=''
                type='date'
                name='regDateStart'
                onChange={handleChangeSearchDateStartValue}
              />
              ~
              <input className=''
                type='date'
                name='regDateEnd'
                onChange={handleChangeSearchDateEndValue}
              />
            </li>
            :
            <li>
              <input className=''
                name='searchValue'
                onChange={handleChangeSearchValue}
              />
            </li>
          }
          <li>
            <button className='bg-gray-300 p-2 mr' onClick={handleClickSearch}>
              검색
            </button>
          </li>
          <li>
            <button className='bg-gray-300 p-2 mr' onClick={handleClickClear}>
              검색 초기화
            </button>
          </li>
          {/* // -------------------- */}
        </ul>
      }
      <RegularListComponent />
      <Outlet context={{ checkedRpno, setCheckedRpno }} />
    </div>
  )
}

export default RegularPage