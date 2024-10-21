import React, { useState } from 'react'
import { reserveGym } from '../../api/facilities/gymApi';

const GymReserve = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [userId, setUserId] = useState('');

    const handleReserve = async () => {
        const reservationData = {
            userId, date, time
        };
        try {
            await reserveGym(reservationData);
            alert('Reservation Successful!');
        } catch (error) {
            alert('Failed to make reservation.')
        }
    };


    return (
        <div>
            <h2> Reserve Gym</h2>
            <input type="text" placeholder="User Id"
                value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input type="date"
                value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="time"
                value={time} onChange={(e) => setTime(e.target.value)} />
            <button onClick={handleReserve}>Reserve</button>
        </div>
    );
};

export default GymReserve