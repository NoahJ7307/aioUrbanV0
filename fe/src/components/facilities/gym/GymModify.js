import React, { useState } from 'react'
import {  listGym} from '../../api/facilities/gymApi';
import { modifyGym } from '../../api/facilities/gymApi';

const GymModify = () => {
    const [reservationId, setReservationId] = useState('');
    const [reservationData, setReservationData] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleList = async () => {
        try {
            const response = await
            listGym(reservationId);

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
            await modifyGym(reservationId, updatedData);
            alert('Reservation modified successfully!');
        } catch (error) {
            alert('Failed to modify reservation.');
        }
    };
    return (
        <div>
            <h2>Modify Gym Reservation</h2>
            <input type="text" placeholder="Reservation ID"
                value={reservationId} onChange={(e) => setReservationId(e.target.value)} />
            <button onClick={handleList}>Load Reservation</button>
            {reservationData && (<div>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                <button onClick={handleModify}>Modify Reservation</button>
            </div>
            )}
        </div>
    );
};

export default GymModify