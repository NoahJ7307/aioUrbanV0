import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listGym, listSearchGym } from '../../api/facilities/gymApi';
import useCustom from '../../hook/useCustom';
import PageComponent from '../../common/PageComponent';

const GymList = ({ page, size }) => {
  const navigate = useNavigate();
  const [serverData, setServerData] = useState({ dtoList: [], totalPage: 0 });
  const [searchType, setSearchType] = useState('title');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { moveToList } = useCustom();
  const role = localStorage.getItem("role");

  const fetchGymProgramList = async () => {
    try {
      const data = await listGym({ page, size });
      if (data.error) throw new Error(data.error);
      setServerData(data);
    } catch (err) {
      console.error("데이터를 가져오는데 오류가 발생했습니다 => ", err);
      alert("프로그램 정보를 가져오는 데 오류가 발생했습니다. 다시 시도해주세요 ");
    }
  };


  const fetchGymListSearch = async () => {
    try {
      const data = await listSearchGym({ page, size }, searchType, searchKeyword);
      console.log(data);
      if (data.error) throw new Error(data.error);
      setServerData(data);
    } catch (err) {
      console.error("데이터를 가져오는데 오류가 발생했습니다 => ", err);
      alert("프로그램 정보를 가져오는 데 오류가 발생했습니다. 다시 시도해주세요 ");
    }
  };
  useEffect(() => {
    fetchGymProgramList();
  }, [page, size]);

  const handleProgramClick = (gym) => {
    navigate(`/facilities/gym/detail/${gym.programId}?page=${page}&size=${size}`, { state: { gym } });
  };

  const determineButtonState = (gym) => {
    switch (gym.programState) {
      case 'NOT_STARTED':
        return <button onClick={() => handleProgramClick(gym)}>접수 전</button>;
      case 'AVAILABLE':
        return <button onClick={() => handleProgramClick(gym)}>접수 중</button>;
      case 'WAITLIST':
        return <button onClick={() => handleProgramClick(gym)}>대기 가능</button>;
      case 'CLOSED':
        return <button onClick={() => handleProgramClick(gym)}>마감</button>;
      default:
        return null;
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  }
  const handleSearch = (e) => {
    console.log("검색 버튼이 클릭되었습니다.");
    fetchGymListSearch();
  };

  return (
    <div>
      <h2>프로그램 신청 목록</h2>

      <div>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="title">프로그램 제목</option>
          <option value="content">내용</option>
          <option value="target">대상</option>
        </select>

        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchInputChange}
          placeholder='검색어를 입력해 주세요'
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>

            <th style={{ border: '1px solid black', padding: '10px' }}>no</th>
            <th style={{ border: '1px solid black', padding: '10px' }} onClick={handleProgramClick}>프로그램</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>모집현황</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>접수 버튼</th>
          </tr>

        </thead>
        <tbody>
          {serverData.dtoList.map((gym) => (
            <tr key={gym.programId}>
              <td>{gym.programId}</td>
              <td onClick={() => handleProgramClick(gym)}>
                <h1>{gym.title}</h1>
                <p>{gym.content}</p>
                <p>프로그램 진행 기간 : {gym.programStartDate}~{gym.programEndDate}</p>
              </td>
              <td>{gym.currentParticipants}/{gym.participantLimit}</td>
              <td>{determineButtonState(gym)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {role === 'ADMIN' && (
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => navigate('/facilities/gym/add')}>프로그램 등록</button>
        </div>
      )}
      {serverData.dtoList.length > 0 && (
        <PageComponent
          serverData={serverData}
          movePage={(pageParam) => moveToList(pageParam, '/facilities/gym/list')}
        />
      )}
    </div>
  );
};

export default GymList;
