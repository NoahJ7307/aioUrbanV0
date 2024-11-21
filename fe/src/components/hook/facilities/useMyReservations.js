// useMyReservations.js (공통 훅)
import { useState, useEffect } from 'react';
import { myPageGolfReservations } from '../../api/facilities/golfApi';
import { myPageStudyReservations } from '../../api/facilities/studyApi';

const useMyReservations = (uno, page, size) => {
  const [golfReservations, setGolfReservations] = useState([]);
  const [studyReservations, setStudyReservations] = useState([]);
  const [loading, setLoading] = useState(true);  // 로딩 상태 추가
  const [error, setError] = useState(null); // 오류 처리

  useEffect(() => {
    if (!uno) {
      setLoading(false); // uno가 없으면 로딩 종료
      return;
    }

    const fetchReservations = async () => {
      try {
        setLoading(true); // 데이터 로딩 시작
        const golfData = await myPageGolfReservations(uno, page, size);
        setGolfReservations(golfData.dtoList || []);

        const studyData = await myPageStudyReservations(uno, page, size);
        setStudyReservations(studyData.dtoList || []);
      } catch (error) {
        setError(error); // 오류 발생 시 처리
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false); // 데이터 로딩 종료
      }
    };

    fetchReservations();
  }, [uno, page, size]);

  return { golfReservations, studyReservations, loading, error };
};

export default useMyReservations;

