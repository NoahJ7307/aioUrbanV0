import React, { useEffect, useState } from 'react';
import { myPageGolfReservations } from '../api/facilities/golfApi';
import { myPageStudyReservations } from '../api/facilities/studyApi';
import { myPageGymReservations } from '../api/facilities/gymApi';
import PageComponent from '../common/PageComponent';

const MyFacilitiesComponent = ({ page, size }) => {
  // const userName = localStorage.getItem("userName")
  const [uno, setUno] = useState(); // 로그인한 사용자 uno
  const [golfReservations, setGolfReservations] = useState({
    dtoList: [],
    pageNumList: [],
    prev: false,
    next: false,
    totalCount: 0,
    current: 0
  });
  const [studyReservations, setStudyReservations] = useState({
    dtoList: [],
    pageNumList: [],
    prev: false,
    next: false,
    totalCount: 0,
    current: 0
  });
  const [gymReservations, setGymReservations] = useState({
    dtoList: [],
    pageNumList: [],
    prev: false,
    next: false,
    totalCount: 0,
    current: 0
  });

  // uno 초기화
  useEffect(() => {
    const storedUno = localStorage.getItem('uno');
    if (storedUno) {
      setUno(Number(storedUno));
    } else {
      console.error('로그인 정보가 없습니다.');
    }
  }, []);

  // 예약 정보 조회
  const fetchMyReservations = async () => {
    try {
      if (!uno) return; // uno가 초기화되기 전에 API 호출 방지

      // 골프 예약 정보 가져오기
      const golfData = await myPageGolfReservations(uno, page, size);
      setGolfReservations(golfData);

      // 독서실 예약 정보 가져오기
      const studyData = await myPageStudyReservations(uno, page, size);
      setStudyReservations(studyData);

      // 헬스장 프로그램 예약 정보 가져오기
      const gymData = await myPageGymReservations(uno);
      setGymReservations(gymData);

    } catch (err) {
      console.error('예약 정보를 가져오는 데 실패했습니다:', err);
      alert('예약 정보를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    fetchMyReservations();
  }, [uno, page, size]);

  // 페이지 이동 함수
  const movePage = (newPage) => {
    console.log(`페이지 이동: ${newPage}`);
    // 페이지 이동 로직 구현
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">나의 골프 예약 현황</h2>

      <div className="grid grid-cols-7 gap-4 font-semibold text-sm text-gray-700 bg-gray-100 p-2 rounded-lg">
        <div>예약번호</div>
        <div>날짜</div>
        <div>사용시작</div>
        <div>사용종료</div>
        <div>예약구역</div>
        <div>예약자</div>
        {/* <div>연락처</div> */}
      </div>

      {golfReservations.dtoList.length > 0 ? (
        golfReservations.dtoList.map((golf) => (
          <div key={golf.reservationId} className="grid grid-cols-7 gap-4 items-center border-t py-4">
            <div className="text-sm">{golf.reservationId}</div>
            <div className="text-sm">{golf.date}</div>
            <div className="text-sm">{golf.startTime}</div>
            <div className="text-sm">{golf.endTime}</div>
            <div className="text-sm">{golf.teeBox}</div>
            <div className="text-sm">{golf.userName}</div>
            {/* <div className="text-sm">{golf.phone}</div> */}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 col-span-7">예약 정보가 없습니다.</div>
      )}

      <h2 className="text-2xl font-semibold mb-6">나의 독서실 예약 현황</h2>

      <div className="grid grid-cols-7 gap-4 font-semibold text-sm text-gray-700 bg-gray-100 p-2 rounded-lg">
        <div>예약번호</div>
        <div>날짜</div>
        <div>사용시작</div>
        <div>사용종료</div>
        <div>예약구역</div>
        <div>예약자</div>
        {/* <div>연락처</div> */}
      </div>

      {studyReservations.dtoList.length > 0 ? (
        studyReservations.dtoList.map((study) => (
          <div key={study.reservationId} className="grid grid-cols-7 gap-4 items-center border-t py-4">
            <div className="text-sm">{study.reservationId}</div>
            <div className="text-sm">{study.date}</div>
            <div className="text-sm">{study.startTime}</div>
            <div className="text-sm">{study.endTime}</div>
            <div className="text-sm">{study.seatNum}</div>
            <div className="text-sm">{study.userName}</div>
            {/* <div className="text-sm">{study.phone}</div> */}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 col-span-7">예약 정보가 없습니다.</div>
      )}

      <h2 className="text-2xl font-semibold mb-6">나의 헬스장 프로그램 현황</h2>

      <div className="grid grid-cols-7 gap-4 font-semibold text-sm text-gray-700 bg-gray-100 p-2 rounded-lg">
        <div>프로그램 ID</div>
        <div>시작일</div>
        <div>종료일</div>
        <div>프로그램명</div>
        <div>프로그램 상태</div>
        <div>예약자</div>
        {/* <div>연락처</div> */}
      </div>

      {gymReservations.data && gymReservations.data.length > 0 ? (
        gymReservations.data.map((gym) => (
          <div key={gym.programId} className="grid grid-cols-7 gap-4 items-center border-t py-4">
            <div className="text-sm">{gym.programId}</div>
            <div className="text-sm">{gym.programStartDate}</div>
            <div className="text-sm">{gym.programEndDate}</div>
            <div className="text-sm">{gym.title}</div>
            <div className="text-sm">{gym.programState}</div>

            <div className="text-sm">
              {gym.participants && gym.participants.length > 0 ? (
                gym.participants.map((participant) => (
                  <div key={participant.uno} className='flex flex-col'>
                    <span>{participant.userName}</span>
                    {/* <span>{participant.phone}</span> */}
                  </div>
                ))
              ) : (
                <span>예약자 없음</span>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 col-span-7">예약 정보가 없습니다.</div>
      )}

      {(golfReservations.dtoList.length > 0 || studyReservations.dtoList.length > 0 || gymReservations.dtoList.length > 0) && (
        <PageComponent
          serverData={golfReservations} // 페이지네이션을 골프 예약 데이터로 처리
          movePage={movePage} />
      )}
    </div>
  );
};

export default MyFacilitiesComponent;
