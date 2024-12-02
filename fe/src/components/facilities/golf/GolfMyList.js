import React, { useEffect, useState } from 'react'
import { myPageGolfReservations } from '../../api/facilities/golfApi';
import GolfDetailModifyModal from './GolfDetailModifyModal';
import { handleCheckedCancel } from './GolfCancel';

const GolfMyList = ({ uno, page, size }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); //모달 열림상태
    const [selectedReservationId, setSelectedReservationId] = useState(null); //선택된 예약 id

    const [golfReservations, setGolfReservations] = useState({
        dtoList: [],
        pageNumList: [],
        prev: false,
        next: false,
        totalCount: 0,
        current: 0
    });

    useEffect(() => {
        fetchGolfReservations();
    }, [uno, page, size]);

    const fetchGolfReservations = async () => {
        if (!uno) return;
        try {

            const golfData = await myPageGolfReservations(uno, page, size);
            setGolfReservations(golfData);
        } catch (err) {
            console.error('골프 예약 정보를 가져오는 데 실패했습니다:', err);
        }
    };


    const handleModify = (reservationId) => {
        console.log("수정 버튼이 눌렸어요", reservationId)
        setSelectedReservationId(reservationId);
        setIsModalOpen(true);

    };
    const isPastReservation = (reservationDate, startTime) => {
        const now = new Date(); // 현재 날짜 및 시간
        const reservationDateTime = new Date(`${reservationDate}T${startTime}`); // 예약 날짜 및 시간
        return now >= reservationDateTime; // 현재 시간과 예약 시간을 비교
    };

   

    return (
        <div>
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-semibold">골프장 이용 내역 조회</h2>
                </div>

            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">나의 예약 현황</h2>

                <div className="grid grid-cols-7 gap-4 font-semibold text-sm text-gray-700 bg-gray-100 p-2 rounded-lg">
                    <div>NO</div>
                    <div>날짜</div>
                    <div>사용시작</div>
                    <div>사용종료</div>
                    <div>예약구역</div>
                    <div>예약자</div>
                    <div>예약 변경</div>
                </div>
                {/* 스크롤 가능한 표 영역 */}
                <div className="overflow-y-auto max-h-96">  {/* max-h-96은 최대 높이를 설정하는 부분 */}
                    {golfReservations.dtoList.length > 0 ? (
                        golfReservations.dtoList.map((golf) => (
                            <div key={golf.reservationId} className="grid grid-cols-7 gap-4 items-center border-t py-4">
                                <div className="text-sm">{golf.reservationId}</div>
                                <div className="text-sm">{golf.date}</div>
                                <div className="text-sm">{golf.startTime}</div>
                                <div className="text-sm">{golf.endTime}</div>
                                <div className="text-sm">{golf.teeBox}</div>
                                <div className="text-sm">{golf.userName}</div>
                                <div>
                                    <button
                                        onClick={() => handleModify(golf.reservationId)}
                                        className={`px-4 py-2 rounded-md transition ${isPastReservation(golf.date, golf.startTime)
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                            }`}
                                        disabled={isPastReservation(golf.date, golf.startTime)} // 버튼 비활성화
                                    >
                                        예약변경 및 취소
                                    </button>
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 col-span-7">예약 정보가 없습니다.</div>
                    )}
                </div>


                {/* 모달 렌더링 */}
                {isModalOpen && (
                    <GolfDetailModifyModal
                        reservationId={selectedReservationId}
                        closeModal={() => setIsModalOpen(false)}
                        refreshList={fetchGolfReservations}
                    />
                )}
            </div>
        </div>
    );
};

export default GolfMyList