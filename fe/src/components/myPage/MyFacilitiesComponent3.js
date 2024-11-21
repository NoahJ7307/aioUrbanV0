import React, { useEffect, useState } from 'react';
import useMyReservations from '../hook/facilities/useMyReservations';
import StudyMyReservationList from '../facilities/study/StudyMyReservationList';
import GolfMyReservationList from '../facilities/golf/GolfMyReservationList';

const MyFacilitiesComponent = ({ page, size }) => {
  const [uno, setUno] = useState(); // 로그인한 사용자 uno

  // uno 초기화
  useEffect(() => {
    const storedUno = localStorage.getItem('uno');
    if (storedUno) {
      setUno(Number(storedUno));
    } else {
      console.error('로그인 정보가 없습니다.');
    }
  }, []);

  const { golfReservations, studyReservations, loading, error } = useMyReservations(uno, page, size);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중 표시
  }

  if (error) {
    return <div>예약 데이터를 불러오는 데 문제가 발생했습니다.</div>; // 오류 처리
  }

  return (
    <div>
      {/* 골프 예약 현황 페이지 */}
      <GolfMyReservationList golfReservations={golfReservations} />

      {/* 스터디 예약 현황 페이지 */}
      <StudyMyReservationList studyReservations={studyReservations} />
    </div>
  );
};

export default MyFacilitiesComponent;
