import React, { useState } from 'react'
import { listGym } from '../../api/facilities/gymApi';

const GymList = () => {
    const [reservationId, setReservationId] = useState('');
    const [reservationData, setReservationData] = useState(null);

    const handleList = async () => {
        try {
            const response = await listGym(reservationId);
            setReservationData(response.data);
        } catch (error) {
            alert('Failed to retrieve reservation');
        }
    };

    return (
        <div>
            <h2>List Gym Reservation</h2>
            <input type="text" placeholder="Reservation Id"
                value={reservationId} onChange={(e) => setReservationId(e.target.value)} />
            <button onClick={handleList}>List Reservation</button>
            {reservationData && (
                <div>
                    <p>Date: {reservationData.date}</p>
                    <p>Time: {reservationData.time}</p>
                    <p>Status: {reservationData.status}</p>
                    {/* 추가 예약 정보를 여기에 표시 */}
                </div>
            )}

        </div>
    );
};

export default GymList