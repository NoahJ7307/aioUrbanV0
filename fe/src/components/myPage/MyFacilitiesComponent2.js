import React, { useState, useEffect, useCallback } from 'react';
import GolfMyList from '../facilities/golf/GolfMyList';
import StudyMyList from '../facilities/study/StudyMyList';
import GymMyList from '../facilities/gym/GymMyList';
import { Outlet, useNavigate } from 'react-router-dom';

const MyFacilitiesComponent = () => {
  const navigate = useNavigate();
  const handleClickGym = useCallback(() => {
    navigate('/myPage/facilities/gym');
  }, [navigate]);
  const handleClickGolf = useCallback(() => {
    navigate(`/myPage/facilities/golf`);
  }, [navigate]);
  const handleClickStudy = useCallback(() => {
    navigate('/myPage/facilities/study');
  }, [navigate]);


  // useEffect(() => {
  //   const storedUno = localStorage.getItem('uno');
  //   if (storedUno) setUno(Number(storedUno));
  // }, []);

  // const handleTabChange = (tabName) => {
  //   setSelectedTab(tabName); // 선택된 탭 변경
  //   setPage(1); // 탭이 변경될 때 페이지 초기화
  // };

  return (
    <div className="flex">
      <div className='facilitySidebar'>
        <h2>나의 예약</h2>
        <ul>
          <li>
            <button
              className="facilitySidebar-button"
              onClick={handleClickGolf}
            >
              골프 예약 조회
            </button>
          </li>
          <li>
            <button
              className="facilitySidebar-button"
              onClick={handleClickStudy}
            >
              스터디룸 예약 조회
            </button>
          </li>
          <li>
            <button
              className="facilitySidebar-button"
              onClick={handleClickGym}
            >
              헬스장 신청&이용권 조회
            </button>
          </li>
        </ul>
      </div>
      <div className="facilityMain-content">
        <Outlet />
      </div>
    </div>
  );
};

export default MyFacilitiesComponent;