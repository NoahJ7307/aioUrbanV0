import React, { useEffect } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { deletePost, getGymListByProgramId } from '../../api/facilities/gymApi';

const GymProgramDetail = ({ gym, page, size}) => {

    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');// page가 없을 경우 기본값 1 설정
    const size = searchParams.get('size'); // size가 없을 경우 기본값 6 설정

    const location = useLocation();
    const { gym } = location.state || {}; // 전달된 객체가 없으면 undefined로 설정
    //console.log("programId", obj.programId)
    useEffect(() => {
        if (gym.programId) {
            console.log('예약 수정: ', page, size, gym);
            //기존예약정보가져오기 (예약 ID로 API 호출하여 데이터 가져옴)
            getGymListByProgramId({ programId: gym.programId, page, size })
                .then((data) => {
                    console.log(data)
                }).catch((error) => {

                });
        }
    }, [gym.programId]);


    const handleDelete = async ({ state }) => {
        const { gym } = location.state || {};
        console.log("전송될 프로그램 ID: ", gym.programId);
        if (gym.programId) {
            try {
                await deletePost(gym.programId);
                alert(`삭제되었습니다.`)
            } catch (error) {
                console.log("삭제 요청 중 오류 발생 : ", error)
            }
        }

    };
    return (
        <>
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
            <button type = "button" onClick={handleDelete}> 삭제 </button>
        
        
        </>
    )
}

export default GymProgramDetail