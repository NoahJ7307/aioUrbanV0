const GymProgramState = ({ reservations, isParticipant, handleCancel, listTitle }) => {
    const isPastReservation = (applicationEndDate) => {
        const now = new Date(); // 현재 날짜 및 시간
        const reservationEndDate = new Date(applicationEndDate); // 접수 종료일
        return now > reservationEndDate; // 현재 시간이 종료일을 초과했는지 비교
    };



    // <ul className="list-disc pl-5 space-y-2">
    //     {participants && participants.length > 0 ? (
    //         participants.map((user, index) => (
    //             <li key={`participant-${user.uno}-${index}`} className="text-lg">
    //                 {user.userName} - {user.phone}</li>
    //         ))
    //     ) : (
    //         <li className="text-gray-500">등록된 참가자가 없습니다.</li>
    //     )}
    // </ul>

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mb-5">
            <h2 className="text-2xl font-semibold mb-6">{listTitle}</h2>

            <div className="grid grid-cols-7 gap-4 font-semibold text-sm text-gray-700 bg-gray-100 p-2 rounded-lg">
                <div>NO</div>
                <div>시작일</div>
                <div>종료일</div>
                <div>프로그램명</div>
                <div>프로그램상태</div>
                <div>신청자</div>
                <div>신청취소</div>
            </div>

            <div className="overflow-y-auto max-h-96">
                {reservations && reservations.length > 0 ? (
                    reservations.map((gym) => (
                        <div key={gym.programId} className="grid grid-cols-7 gap-4 items-center border-t py-4">
                            <div className="text-sm">{gym.programId}</div>
                            <div className="text-sm">{gym.programStartDate}</div>
                            <div className="text-sm">{gym.programEndDate}</div>
                            <div className="text-sm">{gym.title}</div>
                            <div className="text-sm">{gym.programState}</div>

                            <div className="text-sm">
                                {gym.participants && gym.participants.length > 0 ? (
                                    gym.participants.map((participant) => (
                                        <div key={participant.uno} className="flex flex-col">
                                            <span>{participant.userName}</span>
                                        </div>
                                    ))
                                ) : (
                                    <span>예약자 없음</span>
                                )}
                            </div>

                            <div className="flex justify-center items-center space-x-4 mt-4">
                                {isParticipant && (
                                    <button
                                        className={`px-4 py-2 rounded-md transition ${isPastReservation(gym.applicationEndDate)
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                            }`}
                                        disabled={isPastReservation(gym.applicationEndDate)} // 버튼 비활성화
                                        title={isPastReservation(gym.applicationEndDate) ? "접수 기간이 지난 참가 취소는 관리자에게 문의하세요." : ""}
                                    >
                                        취소
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
};
export default GymProgramState