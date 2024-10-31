// import React, { useEffect, useState } from 'react';
// import { listGolf } from '../../api/facilities/golfApi';
// import useCustom from '../../hook/useCustom';
// import PageComponent from '../../common/PageComponent';
// import GolfDetailModal from './GolfDetailModal'; // 상세 정보를 보여줄 컴포넌트 추가
// //사용자가 다른사용자의 내역 조회시 사용가능한 컴포넌트 수정,삭제 기능없음
// const initState = {
//     dtoList: [],
//     pageNumList: [],
//     pageRequestDTO: null,
//     prev: false,
//     next: false,
//     totalCount: 0,
//     prevPage: 0,
//     nextPage: 0,
//     totalPage: 0,
//     current: 0
// };

// const GolfDetailReadModal = ({ page, size }) => {
//     const [uno, setUno] = useState(); // 로그인한 사용자 uno
//     const [userName, setUserName] = useState(); // 로그인한 사용자 name
//     const [phone, setPhone] = useState(); // 로그인한 사용자 phone
//     const [serverData, setServerData] = useState(initState);
//     const { moveToList } = useCustom();
//     const [selectedReservation, setSelectedReservation] = useState(null); // 선택된 예약 정보
//     const [isDetailOpen, setIsDetailOpen] = useState(false); // 상세 보기 모달 상태

//     // 로그인한 사용자 정보를 불러오는 useEffect
//     useEffect(() => {
//         const getUno = localStorage.getItem('uno');
//         const getUserName = localStorage.getItem('userName');
//         const getPhone = localStorage.getItem('userPhone');

//         if (getUno) setUno(Number(getUno));
//         if (getUserName) setUserName(getUserName);
//         if (getPhone) setPhone(getPhone);
//         if (!getUno && !getUserName && !getPhone) console.log("로그인 정보가 없습니다.");
//     }, []);

//     // 예약 목록을 가져오는 함수
//     const fetchGolfReservations = async () => {
//         try {
//             const data = await listGolf({ page, size });
//             if (data.error) {
//                 throw new Error(data.error);
//             }
//             console.log("Fetched data:", data);
//             setServerData(data);
//         } catch (err) {
//             console.error("데이터를 가져오는데 오류가 발생했습니다 => ", err);
//             alert("예약 정보를 가져오는 데 오류가 발생했습니다. 다시 시도해 주세요.");
//         }
//     };

//     useEffect(() => {
//         fetchGolfReservations();
//     }, [page, size]);

//     // 예약 클릭 시 상세 정보를 표시하는 함수
//     const handleDetail = (reservation) => {
//         setSelectedReservation(reservation); // 선택된 예약 정보 저장
//         setIsDetailOpen(true); // 모달 열기
//     };

//     return (
//         <div>
//             <h2>골프장 예약 현황</h2>
//             <div className='grid grid-cols-9'>
//                 <div>예약번호</div>
//                 <div>날짜</div>
//                 <div>사용시작</div>
//                 <div>사용종료</div>
//                 <div>예약구역</div>
//                 <div>예약자</div>
//                 <div>연락처</div>
//                 <div>상세 보기</div>
//             </div>

//             {/* 예약 리스트 출력 */}
//             {serverData.dtoList && serverData.dtoList.length > 0 ? (
//                 serverData.dtoList.map((golf) => (
//                     <div key={golf.reservationId} className="grid grid-cols-9">
//                         <div>{golf.reservationId}</div>
//                         <div>{golf.date}</div>
//                         <div>{golf.startTime}</div>
//                         <div>{golf.endTime}</div>
//                         <div>{golf.teeBox}</div>
//                         <div>{golf.userName}</div>
//                         <div>{golf.phone}</div>
//                         <div>
//                             <button onClick={() => handleDetail(golf)}>상세 보기</button>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <div>정보없음</div>
//             )}

//             {/* 페이지 컴포넌트 */}
//             {serverData && serverData.dtoList && serverData.dtoList.length > 0 && (
//                 <PageComponent
//                     serverData={serverData}
//                     movePage={(pageParam) => moveToList(pageParam, '/facilities/golf/list')} />
//             )}

//             {/* 상세 정보 모달 */}
//             {isDetailOpen && selectedReservation && (
//                 <GolfDetailModal
//                     reservation={selectedReservation}
//                     closeModal={() => setIsDetailOpen(false)}
//                 />
//             )}
//         </div>
//     );
// };

// export default GolfDetailReadModal;
