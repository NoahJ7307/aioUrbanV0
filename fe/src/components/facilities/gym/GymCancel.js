// import React, { useState } from 'react'
// import { cancelGym } from '../../api/facilities/gymApi';

// const GymCancel = () => {
//     const [reservationId, setReservationId] = useState('');

//     const handleCancel = async () => {
//         try {
//             await cancelGym(reservationId);
//             alert('Reservation cancelled successfully!');

//         } catch (error) {
//             alert('Failed to cancel reservation.');
//         }
//     };
//     return (
//         <div>
//             <h2>Cancel Gym Reservation</h2>
//             <input type="text" placeholder='Reservation ID' 
//                 value={reservationId} onChange={(e) => setReservationId(e.target.value)} />
//             <button onClick = {handleCancel} >Cancel Reservation</button>
//         </div>
//     )
// }

// export default GymCancel