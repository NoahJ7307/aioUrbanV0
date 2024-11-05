import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { applyForProgram, getList, listGym } from '../../api/facilities/gymApi';
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
  const { moveToList } = useCustom()
  //로그인에 따라 다르게 보여주는 속성으로 인한 권한 변수선언
  const role = localStorage.getItem("role")

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
  // const handleProgramClick = (gym, page, size) => {
  //   console.log("handlePraclick :", page, size, gym)
  //   // 예시: 수정 페이지로 이동 시 쿼리 파라미터 포함
  //   navigate(`/facilities/gym/detail/${gym.programId}?page=${page}&size=${size}`, { state: { gym } });
  // };
  const handleProgramClick = async (gym) => {
    if (gym.programState === 'AVAILABLE') {
      try {
        //상태 업데이트 API호출
        await applyForProgram(gym.programId, 'WAITLIST');//상태를 WAITLIST로 업데이트
        //성공 시, 로컬 상태 업데이트
        setServerData((prevData) => ({
          ...prevData,
          dtoList: prevData.dtoList.map((item) =>
            item.programId === gym.programId ? { ...item, programState: 'WAITLIST' } : item
          ),
        }));
      } catch (error) {
        console.error("상태변경에 실패했습니다.", error);
        alert("상태를 변경할 수 없습니다. 다시 시도해 주세요.");
      }
    } else {
      navigate(`/facilities/gym/detail/${gym.programId}?page=${page}&size=${size}`, { state: { gym } });
    }
  };


  return (

    <div>
      <h2>프로그램 신청 목록</h2>
      <div className='flex justify-between mb-4'>
      </div>
      <div>
        {serverData.dtoList.map((gym) => (
          <div key={gym.programId}>
            <h1>{gym.title}</h1>
            <p>{gym.content}</p>
            {gym.programState === 'AVAILABLE' ? (
              <button onClick={() => handleProgramClick(gym)} style={{ marginLeft: '10px' }}>신청하기 </button>
            ): gym.programState === 'WAITLIST' ? (
              <button disabled style={{ marginLeft: '10px' }}>
                대기 중
              </button>
            ) : (
              <button disabled style={{ marginLeft: '10px' }}>
                마감
              </button>
            )}
            <hr />
          </div>
        ))}
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