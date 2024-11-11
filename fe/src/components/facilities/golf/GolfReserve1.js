import React, { useEffect, useState } from 'react'
import { reserveGolf } from '../../api/facilities/golfApi';
import loadLoginData from '../../hook/useCustomLogin'
import { useNavigate } from 'react-router-dom';
import useFormFields from '../../hook/facilities/useFormFields';

const GolfReserve = () => {
    const [uno, setUno] = useState()
    const navigate = useNavigate()
    const [formData, handleFieldChange] = useFormFields({
        date: '',
        startTime: '',
        endTime: '',
        teeBox: '',
    });

    useEffect(() => {
        const getUno = localStorage.getItem('uno');
        if (getUno) {
            setUno(Number(getUno));
            console.log("불렸다 UNO : " + getUno)

        } else {
            console.log("로그인 정보가 없습니다.");
        }
    }, []);

    const handleReserve = async () => {
     
        const reservationData = {
            uno,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
            delFlag: false,
            teeBox: formData.teeBox ? parseInt(formData.teeBox) : null,
        };
        console.log(reservationData)


        if (!formData.date || !formData.startTime || !formData.endTime || !formData.teeBox) {
            alert('모든 필드를 채워 주세요.');
            return;
        }
        try {
            const response = await reserveGolf(reservationData);
            if (response.status === 200) {
                alert('예약에 성공하셨습니다 😃');
                navigate('/facilities/golf/list')
            }

        } catch (error) {
            console.error("error 발생 : ", error);
            if (error.response) {
                const errorMessage = error.response.data.message; 
                if(errorMessage === "이미 예약된 시간입니다. 다른 시간을 선택해주세요.") {
                alert('해당 시간대에 이미 예약된 좌석입니다. 다른 시간대를 선택해 주세요 😥');
            } else if (errorMessage === "예약 가능한 시간이 아닙니다.") {
                alert('유효하지 않은 시간입니다. 다시 확인 후 선택해 주세요.');
            } else {
                alert('예약 처리 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
            }
        } else {
            // 네트워크 오류 등
            alert('서버와의 연결에 문제가 발생했습니다. 다시 시도해 주세요.');
        }

        }
    
    };


    return (
        <div>
            <h2> Reserve Golf</h2>


            <input
                type="date"
                name="date"
                placeholder="예약날짜"
                value={formData.date}
                onChange={handleFieldChange}
            />
            <input
                type="time"
                name="startTime"
                placeholder="사용시작시간"
                value={formData.startTime}
                onChange={handleFieldChange}
            />
            <input
                type="time"
                name="endTime"
                placeholder="사용종료시간"
                value={formData.endTime}
                onChange={handleFieldChange}
            />
            <input
                type="number"
                name="teeBox"
                placeholder="예약구역"
                value={formData.teeBox}
                onChange={handleFieldChange}
            />
            <button onClick={handleReserve}>Reserve</button>
        </div>
    );
};

export default GolfReserve