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
  regDateStart: '',
  regDateEnd: '',
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
  // Category 변경 시 value 값 초기화
  const handleChangeSearchCategory = (e) => {
    setSearchData(prevData => ({
      ...prevData,
      searchCategory: e.target.value,
      searchValue: '',
      regDateStart: '',
      regDateEnd: '',
    }))
  }

  const handleChangeSearchValue = (e) => {
    setSearchData((prev) => ({
      ...prev,
      searchValue: e.target.value,
    }))
  }

  // handleChangeSearchDate 를 사용하는 start/end 각각의 name을 SearchData의 key값에 주입 
  // category 변경 시 value값이 초기화 되므로 prevData는 초기화 되어있으므로
  // Date 값 설정 시 regDateStart/End 값만 들어가게 됨
  const handleChangeSearchDate = (e) => {
    const { name, value } = e.target

    setSearchData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleClickSearch = () => {
    // 검색 범위 예외처리
    if (searchData.searchCategory == 'regDate') {
      if (searchData.regDateStart == "" || searchData.regDateEnd == "") {
        alert("검색 범위가 잘못되었습니다")
        return
      }
      if (searchData.regDateStart > searchData.regDateEnd) {
        alert("검색 범위가 잘못되었습니다")
        return
      }
    }
    const pageParam = { page, size }
    getRegularSearchList(pageParam, searchData).then(data => {
      setPageServerData(data)
      if (!data.dtoList || data.dtoList.length === 0) {
        alert("검색 결과가 없습니다")
      }
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
                value={searchData.regDateStart}
                onChange={handleChangeSearchDate}
              />
              ~
              <input className=''
                type='date'
                name='regDateEnd'
                value={searchData.regDateEnd}
                onChange={handleChangeSearchDate}
              />
            </li>
            :
            <li>
              <input className=''
                name='searchValue'
                value={searchData.searchValue}
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
      <RegularListComponent pageServerData={pageServerData} />
      <Outlet context={{ checkedRpno, setCheckedRpno }} />
    </div>
  )
}

export default RegularPage