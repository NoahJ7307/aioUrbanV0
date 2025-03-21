import React, { useState } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom';
import StudyDetailReadModal from '../../../components/facilities/study/StudyDetailReadModal';


const StudyDetailReadPage = () => {
    const [checkedReservationId, setCheckedReservationId] = useState([]);
    const [searchParams] = useSearchParams();// useSearchParams 훅 사용
    const page = searchParams.get('page'); // URL 쿼리에서 page 가져오기
    const size = searchParams.get('size'); // URL 쿼리에서 size 가져오기
    console.log("눌렸다",page, size); // 확인용
    return (
        <>
            <StudyDetailReadModal setCheckedReservationId={setCheckedReservationId} page={page} size={size} />

            <Outlet context={{ setCheckedReservationId }} />
        </>
    )
}

export default StudyDetailReadPage