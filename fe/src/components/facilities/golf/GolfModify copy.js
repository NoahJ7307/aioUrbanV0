import React, { useState } from 'react'
import { modifyGolf, viewGolf } from '../../api/facilities/golfApi';

const GolfModify = () => {
    const [reservationId, setReservationId] = useState('');
    const [reservationData, setReservationData] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleView = async () => {
        try {
            const response = await
            viewGolf(reservationId);

            setReservationData(response.data);
            setDate(response.data.date);
            setTime(response.data.time);
        } catch (error) {
            alert('Failed to retrieve reservation.');
        }
    };
    const handleModify = async () => {
        try {
            const updatedData = {
                ...reservationData, date, time
            };
            await modifyGolf(reservationId, updatedData);
            alert('Reservation modified successfully!');
        } catch (error) {
            alert('Failed to modify reservation.');
        }
    };
    return (
        <div>
            <h2>Modify Golf Reservation</h2>
            <input type="text" placeholder="Reservation ID"
                value={reservationId} onChange={(e) => setReservationId(e.target.value)} />
            <button onClick={handleView}>Load Reservation</button>
            {reservationData && (<div>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                <button onClick={handleModify}>Modify Reservation</button>
            </div>
            )}
        </div>
    );
};

export default GolfModify