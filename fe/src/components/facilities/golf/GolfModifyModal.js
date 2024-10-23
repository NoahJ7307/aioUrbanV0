import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const GolfModifyModal = ({isOpen, onClose, uno}) => {
    const [reservations, setReservations] = useState([]);
 

    useEffect(() => {
        if (isOpen) {
            axios.get(`/api/reservation/${uno}`)
                .then(response => setReservations(response.data))
                .catch(error => console.error(error));
        }
    }, [isOpen, uno])

    const handleModify = (reservationId) => {
        
    }
    return (
        <>
            
        </>
    )
}

export default GolfModifyModal