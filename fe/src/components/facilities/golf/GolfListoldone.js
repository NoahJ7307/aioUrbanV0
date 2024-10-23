import React, { useEffect, useState } from 'react';
import { cancelGolf, listGolf } from '../../api/facilities/golfApi';
import useCustom from '../../hook/useCustom';
import PageComponent from '../../common/PageComponent';
import { useOutletContext } from 'react-router-dom';
import loadLoginData from '../../hook/useCustomLogin';

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



const GolfList = ({ setCheckedReservationId }) => {
    const [serverData, setServerData] = useState(initState)
    const { page, size, moveToList } = useCustom()
    const [checked, setChecked] = useState([])
    // const outletContext = useOutletContext();
    // const { setCheckedReservationId } = outletContext || {};
    const role = localStorage.getItem("role")

    const handleCheckChange = (reservationId) => {
        setChecked(checkedItem => {
            if (checkedItem.includes(reservationId)) {
                return checkedItem.filter(item => item !== reservationId)

            } else {
                return [...checkedItem, reservationId];
            }
        })
    }



    useEffect(() => {
        if (checked.length > 0) {
            setCheckedReservationId(checked);
            console.log("checked: " + checked)
        } else {
            setCheckedReservationId([]);
        }
    }, [checked, setCheckedReservationId])

    useEffect(() => {
        const fetchGolfReservations = async () => {
            try {
                const data = await listGolf({ page, size });
                console.log(data)
                setServerData(data);
            } catch (err) {
                console.error("데이터를 가져오는데 오류가 발생했습니다 => ", err)
            }

        };
        fetchGolfReservations();

    }, [page, size])
    //수정로직구현하기
    const handleModify = (reservationId) => {
        // axios.post(`/api/`)
        console.log(`수정 예약아이디 :  ${reservationId}`);

    }
    //취소 로직구현하기
    const handleCancel = async () => {
        if (checked.length === 0) {
            alert("삭제할 항목을 선택해주세요.");
            return;
        }
        try {
            for (const reservationId of checked) {
                await cancelGolf(reservationId);

            }
            console.log(`취소 예약아이디 :  ${reservationId} 번 예약 삭제`)
        } catch (error) {
            console.error("예약삭제중 오류발생 : ", error);
        }
    }
    //체크까지는 완료 수정,삭제문제 해결할것

    return (
        <div>
            <h2>골프장 예약 현황</h2>
            <div className='flex justify-between mb-4'>
                {role === 'ADMIN' && (
                    <div>

                        <button className='bg-green-500' onClick={handleModify} >수정</button>
                        <button className='bg-red-500' onClick={handleCancel} >삭제</button>
                    </div>
                )}
            </div>

            <div className='grid grid-cols-7'>
                <div>  {role === 'ADMIN' && <div>선택</div>}</div>
                <div>예약번호</div>
                <div>날짜</div>
                <div>사용시작</div>
                <div>사용종료</div>
                <div>예약구역</div>
                <div>예약자</div>


            </div>
            {serverData && serverData.dtoList.map((golf, index) => (
                <div key={index} className="grid grid-cols-7">

                    <div>
                        {role === 'ADMIN' && (
                            <input
                                type='checkbox'
                                checked={checked.includes(golf.reservationId)}
                                onChange={() => handleCheckChange(golf.reservationId)}
                            />
                        )}
                    </div>
                    <div>{golf.reservationId}</div>
                    <div>{golf.date}</div>
                    <div>{golf.startTime}</div>
                    <div>{golf.endTime}</div>
                    <div>{golf.teeBox}</div>
                    {/* <div>{golf.userName}</div> */}



                </div>


            ))}
            {serverData && <PageComponent serverData={serverData} movePage={(pageParam) => moveToList(pageParam, '/facilities/golf/list')} />}
        </div>

    );
};

export default GolfList;
