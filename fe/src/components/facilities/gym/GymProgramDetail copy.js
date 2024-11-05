import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { applyForProgram, deletePost, getGymListByProgramId, getRegisteredUsersByProgramId } from '../../api/facilities/gymApi';
import useCustom from '../../hook/useCustom';
import PageComponent from '../../common/PageComponent';

const GymProgramDetail = () => {

    const [uno, setUno] = useState(); // 로그인한 사용자 uno
    const [userName, setUserName] = useState(); // 로그인한 사용자 name
    const [phone, setPhone] = useState(); // 로그인한 사용자 phone
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [applicationData, setApplicationData] = useState(null); // 신청 데이터 상태 추가
    useEffect(() => {
        const getUno = localStorage.getItem('uno');
        const getUserName = localStorage.getItem('userName');
        const getPhone = localStorage.getItem('phone');
        console.log("로컬 스토리지에서 가져온 데이터:", { getUno, getUserName, getPhone }); // 추가: 로컬 스토리지 데이터 확인

        if (getUno) setUno(Number(getUno));
        if (getUserName) setUserName(getUserName);
        if (getPhone) setPhone(getPhone);
        if (!getUno && !getUserName && !getPhone) console.log("로그인 정보가 없습니다.");

    }, [])
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    console.log("searchParams", searchParams)
    const { moveToList, page, size } = useCustom()
    // console.log('예약 수정asfda: ', page, size);

    const location = useLocation();
    const { gym } = location.state || { title: '', content: '', target: '', participantLimit: 0, programId: null, currentParticipants: 0, applicationStartDate: '', applicationEndDate: '', price: 0 };
    console.log("detail gym", gym)

    //userID 숫자안뜸 콘솔엔 찍힘
    //그리고 실제 가져올때 UNO말고 유저이름이랑 전화번호 ? 가져올것으로 수정할거임 등록일자도 추가하려면 추가하기
    //1105이어서 하기 

    useEffect(() => {
        if (gym.programId) {
            console.log('예약 수정: ', page, size, gym);
            //기존예약정보가져오기 (예약 ID로 API 호출하여 데이터 가져옴)
            getGymListByProgramId({ programId: gym.programId })
                .then((data) => {
                    // console.log(data)
                }).catch((error) => {
                    console.error(error);
                });
            // 등록된 유저 목록 가져오기
            getRegisteredUsersByProgramId(gym.programId)
                .then((users) => {
                    setRegisteredUsers(users); // 등록된 사용자 목록 업데이트
                    console.log("확인확인 1222", users)
                }).catch((error) => {
                    console.error("등록된 사용자 목록 가져오기 오류:", error);
                });

        }
    }, [gym.programId]);

    const handleModify = () => {
        console.log("수정버튼 눌림")
        navigate(`/facilities/gym/detail/modify/${gym.programId}?page=${page}&size=${size}`, { state: { gym } });
    }

    const handleDelete = async () => {
        // const { gym } = location.state || {};
        console.log("전송될 프로그램 ID: ", gym.programId);
        if (gym.programId) {
            try {
                await deletePost(gym.programId);
                alert(`삭제되었습니다.`)
                navigate(`/facilities/gym/list?page=${page}&size=${size}`, { state: { gym } });

            } catch (error) {
                console.log("삭제 요청 중 오류 발생 : ", error)
            }
        }

    };
    const determineButtonState = (gym) => {
        console.log("프로그램 상태 :", gym)
        switch (gym.programState) {
            case 'NOT_STARTED':
                return { text: '접수 전', disabled: true };
            case 'AVAILABLE':
                return { text: '접수중', disabled: false, onClick: () => handleApply(gym) };
            case 'WAITLIST':
                return { text: '대기', disabled: false, onClick: () => handleWaiting(gym) };
            case 'CLOSED':
                return { text: '접수종료', disabled: true };
            default:
                return { text: '', disabled: false };
        }
    }

    // JSX 부분에서 버튼 렌더링
    const buttonState = determineButtonState(gym);


    const handleWaiting = async () => {

    }
    const handleApply = async () => {
        const applicationState = gym.currentParticipants < gym.participantLimit ? '접수 완료' : '대기 중';
        const applicationDate = {
            uno,
            userName,
            phone,
            programId: gym.programId,
            title: gym.title,
            // appilcationId: appilcationId,
            applicationDate: new Date().toISOString(), //현재날짜
            applicationState: applicationState
        };
        console.log("전송할 신청 데이터:", applicationDate);

        try {
            const response = await applyForProgram(applicationDate);
            console.log("01010:", response)
            // applicationData 상태 업데이트
            setApplicationData(applicationDate);
            if (response === "A001") {
                alert('이미 접수된 회원입니다.');
            } else if (response === 'A002') {
                if (window.confirm("해당 프로그램을 접수하시겠습니까? ")) {
                    alert(`접수 완료되었습니다.`);
                    //새로고침해서 신청자 명단에 적용되게끔만들기
                } 
            } else {
                if (window.confirm("모집 정원이 모두 찼습니다. 대기자로 등록하시겠습니까?")) {
                    // 대기자로 등록하는 로직추가
                } 
            }
        } catch (error) {
            console.error("접수 중 오류 발생: ", error);
            alert('신청에 실패했습니다.');
        }


    }

    const handleBackToList = () => {
        navigate(`/facilities/gym/list?page=${page}&size=${size}`, { state: { gym } });
    };
    return (
        <>
            <div>
                <h2>프로그램 세부정보</h2>
                <h3>프로그램 명: {gym.title}</h3>
                <p>세부내용: {gym.content}</p>
                <p>대상: {gym.target}</p>
                <p>모집 인원: {gym.participantLimit}명</p>
                <p>진행 기간: {gym.programStartDate} ~ {gym.programEndDate} </p>
                <p>진행 시간 : {gym.programStartTime} ~ {gym.programEndTime}</p>
                <p>접수 기간: {gym.applicationStartDate} ~ {gym.applicationEndDate}</p>
                <p>금액(마일리지,포인트중에 결정하고 마저 구현할것) : {gym.price}</p>
                <p>현재 모집 현황 : {gym.currentParticipants}/{gym.participantLimit}</p>
            </div>
          

            <div>
                <h2>접수된 유저 목록</h2>
                <ul>
                    {Array.isArray(registeredUsers) && registeredUsers.length > 0 ? (
                        registeredUsers.map(user => (
                            <li key={user.uno}>
                                {userName} - {phone}
                            </li>
                        ))
                    ) : (
                        <li>등록된 유저가 없습니다.</li> // 유저가 없을 때 표시할 메시지
                    )}
                </ul>
            </div>

            <div>
                <button type="button" onClick={handleModify}> 수정 </button>
                <button type="button" onClick={handleDelete}> 삭제 </button>
                <button type="button" onClick={buttonState.onClick} disabled={buttonState.disabled} style={{ backgroundColor: 'orange' }}>
                    {buttonState.text}
                </button>
                <button type="button" onClick={handleBackToList}>목록</button>
            </div>

        </>
    )
}

export default GymProgramDetail