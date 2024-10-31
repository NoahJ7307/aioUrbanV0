// import React, { useState } from 'react'
// import { modifyGolf, listGolf } from '../../api/facilities/golfApi';

// const GolfModify = () => {
//     const [reservationId, setReservationId] = useState('');
//     const [reservationData, setReservationData] = useState(null);
//     const [date, setDate] = useState('');
//     const [time, setTime] = useState('');

//     const handleList = async () => {
//         try {
//             const response = await
//             listGolf(reservationId);

//             setReservationData(response.data);
//             setDate(response.data.date);
//             setTime(response.data.time);
//         } catch (error) {
//             alert('Failed to retrieve reservation.');
//         }
//     };
//     const handleModify = async () => {
//         try {
//             const updatedData = {
//                 ...reservationData, date, time
//             };
//             await modifyGolf(reservationId, updatedData);
//             alert('Reservation modified successfully!');
//         } catch (error) {
//             alert('Failed to modify reservation.');
//         }
//     };
//     return 
// };

// export default GolfModify