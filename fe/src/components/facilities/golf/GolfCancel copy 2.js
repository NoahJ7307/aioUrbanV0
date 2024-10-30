import React from 'react'
import { cancelGolf } from '../../api/facilities/golfApi';

export const GolfCancel = ({ checkedReservationId, fetchGolfReservations, reservationId }) => {


    //체크된 예약 삭제 로직
    const handleCheckedCancel  = async (checkedReservationId, fetchGolfReservations) => {

        console.log("전송될 예약 ID: ", checkedReservationId);

        if (checkedReservationId.length > 0) {
            try {
                await cancelGolf(checkedReservationId)
                alert(`삭제된 예약 아이디 : ${checkedReservationId.join(",")}`)
                fetchGolfReservations();


            } catch (error) {
                console.log("삭제 요청 중 오류 발생 : ", error);
            }
        } else {
            alert("선택된 항목이 없습니다.")
        }

    };
    //항목 단일 삭제 로직
    const handleSingleCancel = async (reservationId, fetchGolfReservations) => {
        console.log("전송될 예약 ID: ", reservationId);
        if (reservationId) {
            try {
                await cancelGolf([reservationId]);
                alert(`삭제되었습니다.`)
                fetchGolfReservations();
            } catch (error) {
                console.log("삭제 요청 중 오류 발생 : ", error)
            }
        } else {
            alert("예약 ID를 입력하세요.");
        }
    };
    // // 원하는 로직을 호출하는 방식에 따라 사용가능
    // if (checkedReservationId) {
    //     await handleCheckedCancel();
    // } else if (reservationId) {
    //     await handleSingleCancel();
    // }
};
