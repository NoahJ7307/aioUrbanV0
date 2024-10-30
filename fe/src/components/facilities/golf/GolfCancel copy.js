// import React from 'react'
// import { cancelGolf } from '../../api/facilities/golfApi';

// const GolfCancel = ({ checkedReservationId, fetchGolfReservations }) => {

//     //체크된 예약 삭제 로직

//         console.log("전송될 예약 ID: ", checkedReservationId);

//         if (checkedReservationId.length > 0) {
//             try {
//                 await cancelGolf(checkedReservationId)
//                 alert(`삭제된 예약 아이디 : ${checkedReservationId.join(",")}`)
//                 fetchGolfReservations();


//             } catch (error) {
//                 console.log("삭제 요청 중 오류 발생 : ", error);
//             }
//         } else {
//             alert("선택된 항목이 없습니다.")
//         }

//     };
//     //항목 단일 삭제 로직
//     const handleCancelWithoutCheck = async () => {
//         const reservationId = setSelectedReservationId(reservationId)
//         if (reservationId) {
//             try {
//                 await cancelGolf([reservationId]);
//                 alert(`삭제되었습니다.`)
//                 fetchGolfReservations();
//             } catch (error) {
//                 console.log("삭제 요청 중 오류 발생 : ", error)
//             }
//         } else {
//             alert("예약 ID를 입력하세요.");
//         }
//     }
//     return (
//         <button className='bg-red-500' onClick={handleCancel}>
//             삭제
//         </button>
//     );
// };

// export default GolfCancel