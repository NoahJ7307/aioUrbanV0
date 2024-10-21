import React, { useState } from 'react'
import { reserveGolf } from '../../api/facilities/golfApi';

const GolfReserve = () => {

    const [userName, setUserName] = useState('');
    const [reservationDate, setReservationDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [teeBox, setTeeBox] = useState('');
    // const {uno, setUno} =useState(3)

    const handleReserve = async () => {
        const reservationData = {
            // uno,
            userName,
            date: reservationDate,
            startTime,
            endTime,
            delFlag: false,
            teeBox: parseInt(teeBox)
        };
        console.log(reservationData)
    

        if (!userName || !reservationDate || !startTime || !endTime || !teeBox) {
            alert('모든 필드를 채워 주세요.');
            return;
        }

        

        try {
            await reserveGolf(reservationData);
            alert('예약에 성공하셨습니다 😃');

        } catch (error) {
            console.error("error발생 :", error);
            alert('해당 시간대에 이미 예약된 좌석입니다. 다른 시간대를 선택해 주세요. ')
            
        }
    };


    return (
        <div>
            <h2> Reserve Golf</h2>

            {/* <input type="text" placeholder="예약자"
                value={uno} onChange={(e) => setUno(e.target.value)} /> */}
            <input type="text" placeholder="예약자"
                value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input type="date" placeholder="예약날짜"
                value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
            <input type="time" placeholder="사용시작시간"
                value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <input type="time" placeholder="사용종료시간"
                value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <input type="number" placeholder="예약구역"
                value={teeBox} onChange={(e) => setTeeBox(e.target.value)} />
            <button onClick={handleReserve}>Reserve</button>
        </div>
    );
};

export default GolfReserve