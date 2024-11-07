import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { applyForProgram, applyForWaitlist, cancelParticipant, deletePost, fetchRegisteredUsers, fetchWaitlistUsers, getGymListByProgramId, getRegisteredUsersByProgramId } from '../../api/facilities/gymApi';
import useCustom from '../../hook/useCustom';
import PageComponent from '../../common/PageComponent';
import axios from 'axios';
import { createReducer } from '@reduxjs/toolkit';

const GymProgramDetail = () => {
    const [participants, setParticipants] = useState([]);
    const [waitlist, setWaitlist] = useState([]);// 대기자 유저 
    const [uno, setUno] = useState(); // 로그인한 사용자 uno
    const [userName, setUserName] = useState(); // 로그인한 사용자 name
    const [phone, setPhone] = useState(); // 로그인한 사용자 phone
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    console.log("searchParams", searchParams)
    const { moveToList, page, size } = useCustom()
    // console.log('예약 수정asfda: ', page, size);

    const location = useLocation();
    const { gym } = location.state || { title: '', content: '', target: '', participantLimit: 0, programId: null, currentParticipants: 0, applicationStartDate: '', applicationEndDate: '', price: 0 };
    console.log("detail gym", gym)


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
            fetchRegisteredUsers(gym.programId)
                .then((users) => {
                    setParticipants(users);
                })
                .catch((error) => {
                    console.error("Failed to fetch registered users:", error)
                })
            //대기자 유저 목록 가져오기
            fetchWaitlistUsers(gym.programId)
                .then((users) => {
                    setWaitlist(users);
                })
                .catch((error) => {
                    console.error("Failed to fetch registered users:", error)
                })



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

    //참가 대기자 로직
    const handleWaiting = async () => {

        const waitlistData = {
            uno,
            userName,
            phone,
            programId: gym.programId,
            title: gym.title,
            applicationDate: new Date().toISOString(), // 현재 날짜
            applicationState: '대기 중' // 대기자로 등록할 경우 상태
        };
        // 먼저 확인 창을 띄움
        const confirmed = window.confirm("해당 프로그램을 참가대기하시겠습니까?");
        if (!confirmed) {
            return; // 사용자가 취소를 선택한 경우 함수를 종료합니다.
        }

        try {
            const waitlistResponse = await applyForWaitlist(waitlistData);
            console.log("응답 코드:", waitlistResponse);

            if (waitlistResponse === "B000") {
                alert("이미 정식 접수된 회원입니다.");
            } else if (waitlistResponse === "B001") {
                alert("이미 대기자로 등록된 회원입니다.");
            } else if (waitlistResponse === "B002") {
                alert('대기자로 등록되었습니다.');
            } else {
                alert('대기자 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error("대기자 등록 중 오류 발생: ", error);
            alert('대기자 등록에 실패했습니다. ')
        }
    }


    const getApplicationState = (gym) => {
        return gym.currentParticipants < gym.participantLimit ? '접수 완료' : '대기 중';
    };

    // const handleUserCancel = async () => {
    //     const confirmed = window.confirm("정말 참가를 취소하시겠습니까?");
    //     if (!confirmed) {
    //         return;
    //     }
    //     try {
    //         const response = await cancelParticipant(gym.programId, { uno });
    //         if (response === "C001") {
    //             alert("참가 취소가 완료되었습니다.")
    //             window.location.reload()//페이지 새로고침하여 참가자목록 업데이트
    //         } else if (response === "C002") {
    //             alert("이미 취소된 참가입니다.")
    //         } else if (response === "C003") {
    //             alert("참가 취소가 완료되었습니다.");
    //             window.location.reload(); // 페이지 새로고침
    //         } else {
    //             alert("알 수 없는 오류가 발생했습니다.");
    //         }
    //     } catch (error) {
    //         console.error("참가 취소 중 오류 발생: ", error);
    //         alert("참가 취소 중 오류가 발생했습니다.");
    //     }

    // };

    //참가접수 로직
    const handleApply = async () => {
        const applicationState = getApplicationState(gym);
        const applicationData = {
            uno,
            userName,
            phone,
            programId: gym.programId,
            title: gym.title,
            applicationDate: new Date().toISOString(), // 현재 날짜
            applicationState
        };
        console.log("전송할 신청 데이터:", applicationData);

        // 먼저 확인 창을 띄움
        const confirmed = window.confirm("해당 프로그램을 접수하시겠습니까?");
        if (!confirmed) {
            return; // 사용자가 취소를 선택한 경우 함수 종료
        }

        try {
            // 사용자가 확인을 선택한 경우에만 API 호출
            const response = await applyForProgram(applicationData);
            console.log("응답 코드:", response);

            if (response === "A001") {
                alert('이미 접수된 회원입니다.');
            } else if (response === 'A002') {
                alert(`접수 완료되었습니다.`);
                window.location.reload(); // 접수 후 페이지를 새로고침하여 신청자 명단을 업데이트
            }
        } catch (error) {
            console.error("접수 처리 중 오류 발생: ", error);
            alert('신청에 실패했습니다.');
        }
    };
    
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
                <h2>참가자 명단</h2>
                <ul>
                    {participants.length > 0 ? (
                        participants.map((user, index) => (
                            <li key={`participant-${user.uno}-${index}`}>
                                {user.userName} - {user.phone}
                            </li>
                        ))
                    ) : (
                        <li>등록된 참가자가 없습니다.</li>
                    )}
                </ul>
                <h2>대기자 명단</h2>
                <ul>
                    {waitlist.length > 0 ? (
                        waitlist.map((user, index) => (
                            <li key={`waitlist-${user.uno}-${index}`}>
                                {user.userName} - {user.phone}
                            </li>
                        ))
                    ) : (
                        <li>등록된 대기자가 없습니다.</li>
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
                {/* <button type="button" onClick={handleUserCancel}>참가취소 </button> */}
            </div>

        </>
    )
}

export default GymProgramDetail