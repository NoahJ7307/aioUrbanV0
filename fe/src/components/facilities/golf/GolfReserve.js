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
            startTime : formData.startTime,
            endTime: formData.endTime,
            delFlag: false,
            teeBox: parseInt(formData.teeBox),
        };
        console.log(reservationData)
    

        if ( !formData.date || !formData.startTime || !formData.endTime || !formData.teeBox) {
            alert('모든 필드를 채워 주세요.');
            return;
        }

        try {
            await reserveGolf(reservationData);
            alert('예약에 성공하셨습니다 😃');
            navigate('/facilities/golf/list')
        } catch (error) {
            console.error("error발생 :", error);
            alert('해당 시간대에 이미 예약된 좌석입니다. 다른 시간대를 선택해 주세요 😥 ')

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