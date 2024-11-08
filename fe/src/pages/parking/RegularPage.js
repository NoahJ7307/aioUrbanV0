import React, { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import useCustomLogin from '../../components/hook/useCustomLogin'
import RegularListComponent from '../../components/parking/RegularListComponent'
import { regularGetList, regularGetSearchList, regularParkingDeleteChecked } from '../../components/api/parking/regularApi'
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
  const [pageServerData, setPageServerData] = useState(initStateServerData)
  const [inputTitle, setInputTitle] = useState('')
  const location = useLocation()

  const handleClickAdd = useCallback(() => { navigate({ pathname: 'add' }) })

  const handleClickModify = useCallback(() => {
    if (checkedRpno.length === 1) {
      navigate({ pathname: `modify/${checkedRpno[0]}` })  // 1개 체크 시
    } else if (checkedRpno.length > 1) {
      alert('하나만 선택해주세요') // 여러개 체크 시
    } else {
      alert('선택된 항목이 없습니다') // 미체크 시
    }
  }, [checkedRpno, navigate])

  const handleClickDelete = async () => {
    if (checkedRpno.length > 0) {
      await regularParkingDeleteChecked(checkedRpno)
      setPageServerData(initStateServerData) // 삭제 후 새로고침 기능 수행
      navigate('/parking/regular')
    } else {
      alert('선택된 항목이 없습니다')
      navigate('/parking/regular')
    }
  }

  // ------- 검색 -------
  // Category 변경 시 value 값 초기화
  const handleChangeSearchCategory = (e) => {
    // select option(category) title 가져와서 input(value) placeholder 에 설정
    setInputTitle(e.target.options[e.target.selectedIndex].getAttribute('title'))
    setSearchData(prevData => ({
      ...prevData,
      searchCategory: e.target.value,
      searchValue: '',
      regDateStart: '',
      regDateEnd: '',
    }))
  }

  // normal value onChange 설정
  const handleChangeSearchValue = (e) => {
    setSearchData((prev) => ({
      ...prev,
      searchValue: e.target.value,
    }))
  }

  // regDateStart/End onChange 설정
  const handleChangeSearchDate = (e) => {
    const { name, value } = e.target

    setSearchData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleClickSearch = () => {
    // 검색 범위 예외처리
    if (searchData.searchCategory === 'regDate') {
      if (searchData.regDateStart === '' || searchData.regDateEnd === '') {
        alert('검색 범위가 잘못되었습니다')
        return
      }
      if (searchData.regDateStart > searchData.regDateEnd) {
        alert('검색 범위가 잘못되었습니다')
        return
      }
    }

    // queryParameter 생성
    const searchParams = new URLSearchParams()
    searchParams.set('page', 1)
    searchParams.set('size', 10)

    if (searchData.searchCategory) {
      searchParams.set('searchCategory', searchData.searchCategory)
    }
    if (searchData.searchValue) {
      searchParams.set('searchValue', searchData.searchValue)
    }
    if (searchData.regDateStart) {
      searchParams.set('regDateStart', searchData.regDateStart)
    }
    if (searchData.regDateEnd) {
      searchParams.set('regDateEnd', searchData.regDateEnd)
    }

    // queryParameter 경로 설정
    navigate(`/parking/regular?${searchParams.toString()}`)
  }

  useEffect(() => {
    // queryParameter 설정
    const queryParams = new URLSearchParams(location.search)
    const page = parseInt(queryParams.get('page')) || 1
    const size = parseInt(queryParams.get('size')) || 10

    const newSearchData = {
      searchCategory: queryParams.get('searchCategory') || '',
      searchValue: queryParams.get('searchValue') || '',
      expectedDateStart: queryParams.get('expectedDateStart') || '',
      expectedDateEnd: queryParams.get('expectedDateEnd') || '',
    }
    setSearchData(newSearchData)

    const pageParam = { page, size }

    if (newSearchData.searchCategory) {
      regularGetSearchList(pageParam, newSearchData).then(data => {
        setPageServerData(data)
        // 결과 예외 처리
        if (!data.dtoList || data.dtoList.length === 0) {
          alert('검색 결과가 없습니다')
        }
      })
    } else {
      setPageServerData(initStateServerData)
    }
  }, [location.search])


  const handleClickClear = () => {
    setPageServerData(initStateServerData)
    navigate('/parking/regular')
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
              <option value='dong-ho' title='예시) 101-101'>동-호</option>
              <option value='dong' title='예시) 101'>동</option>
              <option value='ho' title='예시) 101'>호</option>
              <option value='name' title='예시) 김어반'>이름</option>
              <option value='carNum' title='예시) 00반0000'>차량번호</option>
              <option value='phone' title='예시) 01012345678'>전화번호</option>
              <option value='regDate'>등록일자</option>
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
                placeholder={inputTitle}
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
      <RegularListComponent pageServerData={pageServerData} searchData={searchData} />
      <Outlet context={{ checkedRpno, setCheckedRpno }} />
    </div>
  )
}

export default RegularPage