import React, { useEffect, useState } from 'react'
import { myPageStudyReservations } from '../../api/facilities/studyApi';

const StudyMyList = ({ uno, page, size }) => {
    const [studyReservations, setStudyReservations] = useState({
        dtoList: [],
        pageNumList: [],
        prev: false,
        next: false,
        totalCount: 0,
        current: 0
    });

    useEffect(() => {
        const fetchStudyReservations = async () => {
            if (!uno) return;
            try {
                const golfData = await myPageStudyReservations(uno, page, size);
                setStudyReservations(golfData);
            } catch (err) {
                console.error('골프 예약 정보를 가져오는 데 실패했습니다:', err);
            }
        };
        fetchStudyReservations();
    }, [uno, page, size]);
    return (
        <div>
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
            <div className="overflow-y-auto max-h-96">
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
            </div>
        </div>
    )
}

export default StudyMyList