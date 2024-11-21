import React, { useEffect, useState } from 'react'
import { cancelParticipant, myPageGymMembership, myPageGymReservations } from '../../api/facilities/gymApi';
import { useLocation } from 'react-router-dom';

const GymMyList = ({ uno, page, size }) => {
    const location = useLocation();
    const { gym } = location.state || { title: '', content: '', target: '', participantLimit: 0, programId: null, currentParticipants: 0, applicationStartDate: '', applicationEndDate: '', price: 0 };
    const [isParticipant, setIsParticipant] = useState(true);
    const [gymMembership, setGymMembership] = useState({
        dtoList: [],
        pageNumList: [],
        prev: false,
        next: false,
        totalCount: 0,
        current: 0
    })
    const [gymReservations, setGymReservations] = useState({
        dtoList: [],
        pageNumList: [],
        prev: false,
        next: false,
        totalCount: 0,
        current: 0
    });
    useEffect(() => {
        const fetchGolfReservations = async () => {

            if (!uno) {
                console.error("UNO 값이 없습니다.");
                return;
            }
            try {
                const gymData = await myPageGymReservations(uno, page, size);
                setGymReservations(gymData);
                const gymMembershipData = await myPageGymMembership(uno, page, size);
                setGymMembership(gymMembershipData);
            } catch (err) {
                console.error('멤버십 및 예약 정보를 가져오는 데 실패했습니다:', err);
            }
        };
        fetchGolfReservations();
    }, [uno, page, size]);

    //참가취소!!!
    const handleUserCancel = async () => {
        const confirmed = window.confirm("정말 참가를 취소하시겠습니까?");
        if (!confirmed) {
            return;
        }
        try {
            const response = await cancelParticipant(gym.programId, { uno });
            if (response === "C001") {
                alert("참가 취소가 완료되었습니다.")
                window.location.reload()//페이지 새로고침하여 참가자목록 업데이트
            } else if (response === "C002") {
                alert("참가 취소가 완료되었습니다.")
            } else if (response === "C003") {
                alert("참가 취소가 완료되었습니다."); //해당프로그램에 대기자명단이있을시 참가 취소 하고 대기자 명단 참가자로 등록하는 로직임
                window.location.reload(); // 페이지 새로고침
            } else {
                alert("알 수 없는 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("참가 취소 중 오류 발생: ", error);
            alert("참가 취소 중 오류가 발생했습니다.");
        }

    };
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">나의 이용권 </h2>
            <div className="grid grid-cols-7 gap-4 font-semibold text-sm text-gray-700 bg-gray-100 p-2 rounded-lg">
                <div>이용권 번호</div>
                <div>이용권 종류</div>
                <div>시작일</div>
                <div>종료일</div>

            </div>
            <div className="overflow-y-auto max-h-13">
                {gymMembership.data && gymMembership.data.length > 0 ? (
                    gymMembership.data.map((membership) => (
                        <div key={membership.membershipId} className="grid grid-cols-7 gap-4 items-center border-t py-4">
                            <div className="text-sm">{membership.membershipId}</div>
                            <div className="text-sm">{membership.membershipType}</div>
                            <div className="text-sm">{membership.startDate}</div>
                            <div className="text-sm">{membership.endDate}</div>

                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 col-span-7">예약 정보가 없습니다.</div>
                )}
            </div>

            <h2 className="text-2xl font-semibold mb-6">나의 프로그램 현황</h2>

            <div className="grid grid-cols-7 gap-4 font-semibold text-sm text-gray-700 bg-gray-100 p-2 rounded-lg">
                <div>프로그램번호</div>
                <div>시작일</div>
                <div>종료일</div>
                <div>프로그램명</div>
                <div>프로그램상태</div>
                <div>신청자</div>
                <div>참가취소</div>

                {/* <div>연락처</div> */}
            </div>
            <div className="overflow-y-auto max-h-96">
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
                            <div className="flex justify-center space-x-4 mt-4">
                                {isParticipant && (
                                    <button
                                        type="button"
                                        onClick={handleUserCancel}
                                        className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                    >
                                        참가 취소
                                    </button>
                                )}

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 col-span-7">신청 정보가 없습니다.</div>
                )}
            </div>



        </div>
    );
}

export default GymMyList