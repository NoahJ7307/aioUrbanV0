import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getList, listGym } from '../../api/facilities/gymApi';
import FetchingModal from '../common/FetchingModal';
import useCustom from '../../hook/useCustom';
import GymProgramDetail from './GymProgramDetail';
import PageComponent from '../../common/PageComponent';

const initState = {
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

const GymList = ({ page, size }) => {
  const navigate = useNavigate();
  const [serverData, setServerData] = useState(initState)
  const { moveToList, moveToPath } = useCustom()
  const [checked, setChecked] = useState([])
  const [checkedProgramId, setCheckedProgramId] = useState([])
  //로그인에 따라 다르게 보여주는 속성으로 인한 권한 변수선언
  const role = localStorage.getItem("role")
  //모달 상태 및 선택된 예약 id관리
  const [isModalOpen, setIsModalOpen] = useState(false); //모달 열림상태
  // const [selectedProgramId, setSelectedProgramId] = useState(null); //선택된 예약 id


  const handleCheckChange = (programId) => {
    setChecked((prevChecked) => {
      const isChecked = prevChecked.includes(programId);
      const updatedChecked = isChecked
        ? prevChecked.filter(item => item !== programId)
        : [...prevChecked, programId];
      setCheckedProgramId(updatedChecked);
      return updatedChecked;
    });
  };

  const fetchGymProgramList = async () => {
    try {
      const data = await listGym({ page, size });
      if (data.error) {
        throw new Error(data.error);
      }
      console.log("Fetched data: ", data);
      setServerData(data);
    } catch (err) {
      console.error("데이터를 가져오는데 오류가 발생했습니다 => ", err);
      alert("프로그램 정보를 가져오는 데 오류가 발생했습니다. 다시 시도해주세요 ");
    }
  };

  useEffect(() => {
    console.log(page, size)
    fetchGymProgramList();
  }, [page, size])

  const handeClickAdd = useCallback(() => {
    navigate('/facilities/gym/add');

  }, [navigate]);
  const handleProgramClick = (gym, page, size) => {
    console.log("handlePraclick :", page, size, gym)
    // 예시: 수정 페이지로 이동 시 쿼리 파라미터 포함
    navigate(`/facilities/gym/detail/${gym.programId}?page=${page}&size=${size}`, { state: { gym } });



  };
  return (

    <div>
      <h2>프로그램 신청 목록</h2>
      <div className='flex justify-between mb-4'>
        {/* {role === 'ADMIN' && (
                    <div>
                        <button onClick={handleDelete}> 선택 삭제 </button>
                    </div>
                )} */}
      </div>
      <div>
        {serverData.dtoList.map((gym) => (
          <div key={gym.programId} onClick={() => handleProgramClick(gym, page, size)} >
            <h1>{gym.title}</h1>
            <p>{gym.content}</p>
            <button onClick={() => handleProgramClick(gym, page, size)} style={{ marginLeft: '10px' }}>신청하기 </button>

            <hr />
          </div>

        ))}
        {/* {selectedProgramId && <GymProgramDetail gym={selectedProgramId} />} */}
      </div>
      {role === 'ADMIN' && (
        <div>
          <button onClick={handeClickAdd}>프로그램 등록</button>
        </div>
      )}
      {serverData && serverData.dtoList && serverData.dtoList.length > 0 && (
        <PageComponent
          serverData={serverData}
          movePage={(pageParam) => moveToList(pageParam, '/facilities/gym/list')} />
      )}
    </div>


  )
}

export default GymList