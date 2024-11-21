import React, { useState, useEffect } from 'react';
import GolfMyList from '../facilities/golf/GolfMyList';
import StudyMyList from '../facilities/study/StudyMyList';
import GymMyList from '../facilities/gym/GymMyList';

const MyFacilitiesComponent = () => {
  const [uno, setUno] = useState();
  const [selectedTab, setSelectedTab] = useState('golf'); // 현재 선택된 탭
  const [page, setPage] = useState(1);
  const [size] = useState(10);

  useEffect(() => {
    const storedUno = localStorage.getItem('uno');
    if (storedUno) setUno(Number(storedUno));
  }, []);

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName); // 선택된 탭 변경
    setPage(1); // 탭이 변경될 때 페이지 초기화
  };

  return (
    <div className="p-6">
      {uno && (
        <>
          {/* 버튼으로 탭 변경 */}
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 font-bold rounded ${selectedTab === 'golf' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleTabChange('golf')}
            >
              골프 예약
            </button>
            <button
              className={`px-4 py-2 font-bold rounded ${selectedTab === 'study' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleTabChange('study')}
            >
              독서실 예약
            </button>
            <button
              className={`px-4 py-2 font-bold rounded ${selectedTab === 'gym' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleTabChange('gym')}
            >
              헬스장 예약
            </button>
          </div>

          {/* 선택된 탭에 따라 렌더링 */}
          {selectedTab === 'golf' && <GolfMyList uno={uno} page={page} size={size} />}
          {selectedTab === 'study' && <StudyMyList uno={uno} page={page} size={size} />}
          {selectedTab === 'gym' && <GymMyList uno={uno} />}
        </>
      )}
    </div>
  );
};

export default MyFacilitiesComponent;
