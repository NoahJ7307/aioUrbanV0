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




  return (
    <div className="p-6">
      <div >
        <Outlet />
      </div>
    </div>
  );
};

export default MyFacilitiesComponent;
