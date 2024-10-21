import React, { useEffect, useState } from 'react'
import { listStudy } from '../../api/facilities/studyApi';
import useCustom from '../../hook/useCustom';
import PageComponent from '../../common/PageComponent';

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
}

const StudyList = () => {
    const [serverData, setServerData] = useState(initState)
    const {page, size, moveToList} = useCustom()
    
    // const [reservationId, setReservationId] = useState();
    // const [reservationData, setReservationData] = useState(null);
    useEffect(() => {
        const fetchStudyReservations = async () => {
            try {
                const data = await listStudy({page, size});
                setServerData(data);
            } catch (err) {
                console.error("데이터를 가져오는데 오류가 발생했습니다 => " , err)
            }
        };
        fetchStudyReservations();

    }, [page, size])
    useEffect(() => {
        listStudy({ page, size }).then(data => {
            setServerData(data)
        }).catch(err => {
            console.log("Axios error: ", err)
        })
    }, [page, size])

    return (
        <div>
        <h2>독서실 예약 현황 </h2>
        <div className='grid grid-cols-6'>
            <div>No</div>
            <div>날짜</div>
            <div>사용시작</div>
            <div>사용종료</div>
            <div>예약구역</div>
            <div>예약자</div>
        </div>
    {serverData.dtoList.map((study, index) => (
        <div key={index} className="grid grid-cols-6">

            <div>{study.reservationId}</div>
            <div>{study.date}</div>
            <div>{study.startTime}</div>
            <div>{study.endTime}</div>
            <div>{study.seatNum}</div>
            <div>{study.userName}</div>
            <div>
            </div>
        </div>

    ))}
    <PageComponent serverData={serverData} movePage={(pageParam) => moveToList(pageParam, '/facilities/study/list')} />
</div>

    );
};

export default StudyList