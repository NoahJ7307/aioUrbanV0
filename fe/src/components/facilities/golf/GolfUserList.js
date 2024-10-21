import React, { useEffect, useState } from 'react'
import useCustom from '../../hook/useCustom';
import PageComponent from '../../common/PageComponent';
import { listUserGolf } from '../../api/facilities/golfApi';
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

const GolfUserList = ({uno}) => {
    const [serverData, setServerData] = useState(initState);
    const { page, size, moveToList } = useCustom();
    // const uno = 3;

    useEffect(() => {
        const fetchGolfUserReservations = async () => {
            try {
                const data = await listUserGolf({ uno, page, size });
                setServerData(data);
            } catch (err) {
                console.error("예약목록을 가져오는데 오류가 발생했습니다 => ", err)
            }

        };
        fetchGolfUserReservations();
    }, [page, size, uno]);

    const handleModify = (reservationId) => {
        //수정로직구현하기
        console.log(`수정 예약아이디 :  ${reservationId}`);

    }
    const handleCancel = async (reservationId) => {
        //취소 로직구현하기
        console.log(`취소 예약아이디 :  ${reservationId}`)
    }
    return (
        <div>
            <h2>내 예약 현황</h2>
            <div className='grid grid-cols-7'>
                <div>No</div>
                <div>날짜</div>
                <div>사용시작</div>
                <div>사용종료</div>
                <div>예약구역</div>
                <div>예약자</div>
                <div>예약 변경 및 취소</div>
            </div>
            {serverData.dtoList.map((golf, index) => (
                <div key={index} className='grid grid-cols-7'>
                    <div>{golf.reservationId}</div>
                    <div>{golf.date}</div>
                    <div>{golf.startTime}</div>
                    <div>{golf.endTime}</div>
                    <div>{golf.teeBox}</div>
                    <div>{golf.userName}</div>
                    <div>
                        <button onClick={() =>  handleModify(golf.reservationId)}>수정</button>
                        <button onClick={() =>  handleCancel(golf.reservationId)}>취소</button>
                    </div>

                </div>
            ))}
            <PageComponent serverData={serverData} movePage={(pageParam) => moveToList(pageParam, `/facilities/golf/${uno}/userlist`) }/>

        </div>
    )
}

export default GolfUserList