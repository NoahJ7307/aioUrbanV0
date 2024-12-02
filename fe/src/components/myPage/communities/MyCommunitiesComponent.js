import React, { useState, useEffect, useCallback } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

const MyCommunitiesComponent = () => {
  const navigate = useNavigate();
  const handleClickBoard = useCallback(() => {
    navigate('/myPage/communities/board');
  }, [navigate]);
  const handleClickAnnounce = useCallback(() => {
    navigate(`/myPage/communities/announce`);
  }, [navigate]);
  const handleClickMarket = useCallback(() => {
    navigate('/myPage/communities/market');
  }, [navigate]);


 
  return (
    <div className="p-6">
      <ul className='flex justify-center space-x-8'>
        <li>
          <button className="button" onClick={handleClickBoard}>게시판 작성 조회 </button>
        </li>
        <li>
          <button className="button" onClick={handleClickAnnounce}>공지사항 작성 조회 </button>
        </li>
        <li>
          <button className="button" onClick={handleClickMarket}>마켓 작성 조회</button>
        </li>
      </ul>

    
      <Outlet />
    </div>
  );
};

export default MyCommunitiesComponent;
