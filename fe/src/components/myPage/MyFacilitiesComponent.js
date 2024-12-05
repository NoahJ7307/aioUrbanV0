import React, { useState, useEffect, useCallback } from 'react';
import GolfMyList from '../facilities/golf/GolfMyList';
import StudyMyList from '../facilities/study/StudyMyList';
import GymMyList from '../facilities/gym/GymMyList';
import { Outlet, useNavigate } from 'react-router-dom';

const MyFacilitiesComponent = () => {

  return (
    <div className="p-6">
      <div >
        <Outlet />
      </div>
    </div>
  );
};

export default MyFacilitiesComponent;
