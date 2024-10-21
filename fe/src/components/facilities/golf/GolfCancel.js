// import React, { useState } from 'react'
// import { cancelGolf } from '../../api/facilities/golfApi';

// const GolfCancel = () => {
//     const [reservationId, setReservationId] = useState('');

//     const handleCancel = async () => {
//         try {
//             await cancelGolf(reservationId);
//             alert('Reservation cancelled successfully!');

//         } catch (error) {
//             alert('Failed to cancel reservation.');
//         }
//     };
//     return (
//         <div>
//             <h2>Cancel Golf Reservation</h2>
//             <input type="text" placeholder='Reservation ID' 
//                 value={reservationId} onChange={(e) => setReservationId(e.target.value)} />
//             <button onClick = {handleCancel} >Cancel Reservation</button>
//         </div>
//     )
// }

// export default GolfCancel