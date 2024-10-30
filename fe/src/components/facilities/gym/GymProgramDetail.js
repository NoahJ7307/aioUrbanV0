import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { getGymListByProgramId } from '../../api/facilities/gymApi';

const GymProgramDetail = ({ state }) => {
    const location = useLocation();
    const { gym } = location.state || {}; // 전달된 객체가 없으면 undefined로 설정
    //console.log("programId", obj.programId)
    useEffect(() => {
        if (gym.programId) {
            console.log('예약 수정: ', 1, 10, gym);
            //기존예약정보가져오기 (예약 ID로 API 호출하여 데이터 가져옴)
            getGymListByProgramId({ programId: gym.programId, page: 1, size: 10 })
                .then((data) => {
                    console.log(data)
                }).catch((error) => {

                });
        }
    }, [gym.programId]);

    return (
        <div>

            <h2>프로그램 세부정보</h2>
            <h3>프로그램 명: {gym.title}</h3>
            <p>세부내용: {gym.content}</p>
            <p>대상: {gym.target}</p>
            <p>진행 기간: {gym.programStartDate} ~ {gym.programEndDate} </p>
            <p>진행 시간 : {gym.programStartTime} ~ {gym.programEndTime}</p>
            <p>접수 기간: {gym.applicationStartDate} ~ {gym.applicationEndDate}</p>
            <p>금액 : {gym.price}</p>

        </div>
    )
}

export default GymProgramDetail