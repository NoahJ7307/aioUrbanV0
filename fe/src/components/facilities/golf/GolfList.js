import React, { useEffect, useState } from 'react';
import { listGolf } from '../../api/facilities/golfApi';
import useCustom from '../../hook/useCustom';
import PageComponent from '../../common/PageComponent';
import { handleCheckedCancel } from './GolfCancel';
import GolfDetailModifyModal from './GolfDetailModifyModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
};

const GolfList = ({ page, size }) => {
    const [checkedReservationId, setCheckedReservationId] = useState([]);
    const [serverData, setServerData] = useState(initState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReservationId, setSelectedReservationId] = useState(null);
    const [groupedData, setGroupedData] = useState({});
    const [selectedTeeBox, setSelectedTeeBox] = useState(''); // 선택된 구역 상태
    const [groupedDataDate, setGroupedDataDate] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜
    const { moveToList } = useCustom();

    const role = localStorage.getItem("role");


    const handleCheckChange = (reservationId) => {
        setCheckedReservationId((prevChecked) => {
            const isChecked = prevChecked.includes(reservationId);
            const updatedChecked = isChecked
                ? prevChecked.filter(item => item !== reservationId)
                : [...prevChecked, reservationId];
            return updatedChecked;
        });
    };

    const fetchGolfReservations = async () => {
        try {
            const data = await listGolf({ page, size });
            if (data.error) throw new Error(data.error);
            setServerData(data);
        } catch (err) {
            console.error("데이터를 가져오는데 오류가 발생했습니다 => ", err);
            alert("예약 정보를 가져오는 데 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    useEffect(() => {
        fetchGolfReservations();
    }, [page, size]);


    const handleModify = (reservationId) => {
        setSelectedReservationId(reservationId);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        await handleCheckedCancel(checkedReservationId, fetchGolfReservations);
    };
    //이름 암호화
    const privacyUserName = (userName) => {
        if (!userName || userName.length < 2) return userName;
        const firstChar = userName.charAt(0);
        const maskedPart = '*'.repeat(userName.length - 1);
        return firstChar + maskedPart;
    };

    const groupReservationsByTeeBox = (reservations) => {
        return reservations.reduce((acc, reservation) => {
            const { teeBox } = reservation;
            if (!teeBox) return acc; // teeBox가 없으면 해당 예약은 제외
            if (!acc[teeBox]) acc[teeBox] = [];
            acc[teeBox].push(reservation);
            return acc;
        }, {});
    };
    const groupReservationsByDate = (reservations) => {
        return reservations.reduce((acc, reservation) => {
            const { date } = reservation;
            if (!date) return acc;
            if (!acc[date]) acc[date] = [];
            acc[date].push(reservation);
            return acc;
        }, {});
    };

    useEffect(() => {
        if (serverData.dtoList && serverData.dtoList.length > 0) {
            setGroupedData(groupReservationsByTeeBox(serverData.dtoList));
            setGroupedDataDate(groupReservationsByDate(serverData.dtoList));
        }
    }, [serverData]);




    // const filteredData = (groupedData[String(selectedTeeBox)] || Object.values(groupedData).flat())
    //     .filter((golf) =>
    //         groupedDataDate[selectedDate.toISOString().split('T')[0]]?.some(
    //             (dateGolf) => dateGolf.reservationId === golf.reservationId
    //         )
    //     );
    const filteredData = (selectedTeeBox === '' ?
        Object.values(groupedData).flat() :
        groupedData[String(selectedTeeBox)] || []
    ).filter((golf) =>
        groupedDataDate[selectedDate.toISOString().split('T')[0]]?.some(
            (dateGolf) => dateGolf.reservationId === golf.reservationId
        )
    );

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-semibold">골프장 예약 현황</h2>
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center mr-4">
                    <label htmlFor="teeBoxSelect" className="mr-2">구역별로 조회하기:</label>
                    <select
                        id="teeBoxSelect"
                        value={selectedTeeBox}
                        onChange={(e) => setSelectedTeeBox(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">전체</option>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((teeBox) => (
                            <option key={teeBox} value={teeBox}>
                                {teeBox}번
                            </option>
                        ))}
                    </select>

                </div>
                {/* 구역 선택 셀렉트 박스 추가 */}
                {((role === 'ADMIN' || role === 'ROOT') || role === 'ROOT') && (

                    <button
                        onClick={handleDelete}
                        className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                        선택 삭제
                    </button>

                )}
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center mr-4">
                    <label htmlFor="dateSelect" className="mr-2">날짜별로 조회하기:</label>
                    <DatePicker
                        id="dateSelect"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)} // 선택한 날짜를 Date 객체로 업데이트
                        // className="p-2 border rounded-md"
                        dateFormat="yyyy-MM-dd" // 날짜 형식
                        className="p-2 border rounded-md"
                        isClearable={false}
                        placeholderText="날짜를 선택하세요"
                    />


                </div>

            </div>



            <div className={`grid ${(role === 'ADMIN' || role === 'ROOT') ? 'grid-cols-9' : 'grid-cols-6'} gap-4 font-semibold text-sm text-gray-700 bg-gray-100 p-2 rounded-lg`}>
                <div className="text-center">예약번호</div>
                <div className="text-center">날짜</div>
                <div className="text-center">사용시작</div>
                <div className="text-center">사용종료</div>
                <div className="text-center">예약구역</div>
                <div className="text-center">예약자</div>
                {(role === 'ADMIN' || role === 'ROOT') && <div className="text-center">연락처</div>}
                {(role === 'ADMIN' || role === 'ROOT') && <div className="text-center">예약 변경</div>}
                {(role === 'ADMIN' || role === 'ROOT') && <div className="text-center">선택</div>}
            </div>
            {/* 

            {filteredData.length > 0 && filteredData.map((golf) => ( */}
            {filteredData.length > 0 ? (
                filteredData.map((golf) => (
                    <div key={golf.reservationId} className={`grid ${(role === 'ADMIN' || role === 'ROOT') ? 'grid-cols-9' : 'grid-cols-6'} gap-4 items-center border-t py-4`}>
                        <div className="text-sm text-center">{golf.reservationId}</div>
                        <div className="text-sm text-center">{golf.date}</div>
                        <div className="text-sm text-center">{golf.startTime}</div>
                        <div className="text-sm text-center">{golf.endTime}</div>
                        <div className="text-sm text-center">{golf.teeBox}</div>
                        <div className="text-sm text-center">{(role === 'ADMIN' || role === 'ROOT') ? golf.userName : privacyUserName(golf.userName)}</div>
                        {(role === 'ADMIN' || role === 'ROOT') && <div className="text-sm text-center">{golf.phone}</div>}
                        {(role === 'ADMIN' || role === 'ROOT') && (
                            <div className="text-center">
                                <button
                                    onClick={() => handleModify(golf.reservationId)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                >
                                    수정
                                </button>
                            </div>
                        )}
                        {(role === 'ADMIN' || role === 'ROOT') && (
                            <div className="text-center">
                                <input
                                    type="checkbox"
                                    checked={checkedReservationId.includes(golf.reservationId)}
                                    onChange={() => handleCheckChange(golf.reservationId)}
                                    className="w-5 h-5"
                                />
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="text-center text-red-500 mt-4">예약 정보가 없습니다.</div>

            )
            }

            {
                serverData && serverData.dtoList && serverData.dtoList.length > 0 && (
                    <PageComponent
                        serverData={serverData}
                        movePage={(pageParam) => moveToList(pageParam, '/facilities/golf/list')}
                    />
                )
            }

            {
                isModalOpen && (
                    <GolfDetailModifyModal
                        reservationId={selectedReservationId}
                        closeModal={() => setIsModalOpen(false)}
                        refreshList={fetchGolfReservations}
                    />
                )
            }
        </div >
    );
};

export default GolfList;
