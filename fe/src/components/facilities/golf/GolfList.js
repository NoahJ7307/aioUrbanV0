import React, { useEffect, useState } from 'react';
import { cancelGolf, listGolf } from '../../api/facilities/golfApi';
import useCustom from '../../hook/useCustom';
import PageComponent from '../../common/PageComponent';
import { useNavigate, useOutletContext } from 'react-router-dom';
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



const GolfList = () => {
    const [uno, setUno] = useState(); // 로그인한 사용자 uno
    const [userName, setUserName] = useState(); // 로그인한 사용자 name
    const [phone, setPhone] = useState(); // 로그인한 사용자 phone
    const navigate = useNavigate()
    const [checkedReservationId, setCheckedReservationId] = useState([])
    const [serverData, setServerData] = useState(initState)
    const { page, size, moveToList } = useCustom()
    const [checked, setChecked] = useState([])

    const role = localStorage.getItem("role")
    //user uno 불러오기
    useEffect(() => {
        const getUno = localStorage.getItem('uno');
        if (getUno) {
            setUno(Number(getUno));
            console.log(serverData.dtoList)
        } else {
            console.log("로그인 정보가 없습니다.");
        }
    }, []);
    //user name 불러오기 
    useEffect(() => {
        const getUserName = localStorage.getItem('userName');
        if (getUserName) {
            setUserName(getUserName);
            console.log(serverData.dtoList)
        } else {
            console.log("로그인 정보가 없습니다.");
        }
    }, []);
    //user phone 불러오기 
    useEffect(() => {
        const getPhone = localStorage.getItem('userPhone');
        if (getPhone) {
            setPhone(getPhone);
            console.log(serverData.dtoList)
        } else {
            console.log("로그인 정보가 없습니다.");
        }
    }, []);
    

    const handleCheckChange = (reservationId) => {
        setChecked((prevChecked) => {
            const isChecked = prevChecked.includes(reservationId);
            const updatedChecked = isChecked
                ? prevChecked.filter(item => item !== reservationId)
                : [...prevChecked, reservationId];
            setCheckedReservationId(updatedChecked);
            return updatedChecked;

        });
    };
    // const fetchGolfReservations = async () => {
    //     try {
    //         const data = await listGolf({ page, size });
    //         console.log("Fetched data:", data); // 데이터 구조를 확인
    //         setServerData(data);
    //     } catch (err) {
    //         console.error("데이터를 가져오는데 오류가 발생했습니다 => ", err);
    //     }
    // };
    const fetchGolfReservations = async () => {
        try {
            const data = await listGolf({ page, size });
            if (data.error) {
                throw new Error(data.error);
            }
            console.log("Fetched data:", data);
            setServerData(data);
        } catch (err) {
            console.error("데이터를 가져오는데 오류가 발생했습니다 => ", err);
            alert("예약 정보를 가져오는 데 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };
    
    
    useEffect(() => {

        fetchGolfReservations();

    }, [page, size]);

    //수정로직구현하기
    const handleModify = (reservationId) => {
        // axios.post(`/api/`)
        console.log(`수정 예약아이디 :  ${reservationId}`);

    }
    //취소 로직구현하기
    const handleCancel = async () => {
        console.log("전송될 예약 ID: ", checkedReservationId);

        if (checkedReservationId.length > 0) {
            try {
                await cancelGolf(checkedReservationId)
                alert(`삭제된 예약 아이디 : ${checkedReservationId.join(",")}`)
                fetchGolfReservations();
                // navigate({ pathname: '/facilities/golf/list' })


            } catch (error) {
                console.log("삭제 요청 중 오류 발생 : ", error);
            }
        } else {
            alert("선택된 항목이 없습니다.")
        }



    }


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

            <div className='grid grid-cols-8'>
                <div>  {role === 'ADMIN' && <div>선택</div>}</div>
                <div>예약번호</div>
                <div>날짜</div>
                <div>사용시작</div>
                <div>사용종료</div>
                <div>예약구역</div>
                <div>uno</div>


            </div>
            {serverData.dtoList && serverData.dtoList.length > 0 ? (
                serverData.dtoList.map((golf) => (
                    <div key={golf.reservationId} className="grid grid-cols-8">
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
                        <div>{golf.phone}</div> {/* uno 값을 확인 */}
                    </div>
                ))
            ) : (
                <div>정보없음</div>
            )}
            {serverData && serverData.dtoList && serverData.dtoList.length > 0 && (
    <PageComponent
        serverData={serverData}
        movePage={(pageParam) => moveToList(pageParam, '/facilities/golf/list')} />)}
        </div>

    );
};

export default GolfList;
