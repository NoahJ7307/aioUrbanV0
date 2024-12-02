import React, { useEffect, useState } from 'react'
import { listStudy, reserveStudy } from '../../api/facilities/studyApi';
import loadLoginData from '../../hook/useCustomLogin'
import { useNavigate } from 'react-router-dom';
import useFormFields from '../../hook/facilities/useFormFields';

const StudyReserve = () => {
    const [uno, setUno] = useState()
    const navigate = useNavigate()
    const [formData, setFormData] = useFormFields({
        date: '',
        startTime: '',
        endTime: '',
        seatNum: '',
    });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSeatNum, setSelectedSeatNum] = useState(null);

    const images = [
        '/images/s1.png',
        '/images/s2.png',
        '/images/s3.png',
    ];

    useEffect(() => {
        const getUno = localStorage.getItem('uno');
        if (getUno) {
            setUno(Number(getUno));
            console.log("불렸다 UNO : " + getUno)

        } else {
            console.log("로그인 정보가 없습니다.");
        }
    }, []);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newFormData = {
                ...prevData,
                [name]: value,
            };

            if (name === 'seatNum') {
                setSelectedSeatNum(Number(value)); // 셀렉트 박스가 변경되면 해당 티박스를 클릭한 것처럼 처리
            }

            return newFormData;
        });
    };
    const validateReservation = (data) => {
        const selectedDate = new Date(data.date);
        const today = new Date();
        console.log("today:", today, "selectedDate", selectedDate)

        if (selectedDate < today.setHours(0, 0, 0, 0)) {
            alert("선택하신 날짜는 오늘 이후여야 합니다.");
            return false;
        }

        const startTime = new Date(`${data.date}T${data.startTime}`);
        const endTime = new Date(`${data.date}T${data.endTime}`);
        if (startTime >= endTime) {
            alert("시작 시간은 종료 시간보다 이전이어야 합니다.");
            return false;
        }

        if (selectedDate.toDateString() === today.toDateString() && startTime <= today) {
            alert("예약 시작 시간은 현재 시간 이후여야 합니다.");
            return false;
        }

        return true;
    };

    const handleReserve = async () => {
        if (!formData.date || !formData.startTime || !formData.endTime || !formData.seatNum) {
            alert('모든 필드를 채워 주세요.');
            return;
        }

        const reservationData = {
            uno,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
            delFlag: false,
            seatNum: parseInt(formData.seatNum),
        };
        console.log(reservationData)


        if (!validateReservation(reservationData)) {
            return;//유효하지 않으면 중단
        }

        try {
            await reserveStudy(reservationData);
            alert('예약에 성공하셨습니다 😃');
            navigate('/facilities/study/list')
        } catch (error) {
            console.error("error발생 :", error);
            alert('해당 시간대에 이미 예약된 좌석입니다. 다른 시간대를 선택해 주세요 😥 ')

        }
    };
    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleSeatNumClick = (seatNumber) => {
        setSelectedSeatNum(seatNumber);
        setFormData({
            ...formData,
            seatNum: seatNumber,
        });
    };



    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">

            
            <h2 className="text-2xl font-bold text-center mb-6">Reserve Study</h2>
    
            <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">예약 날짜</label>
                <input
                    type="date"
                    name="date"
                    placeholder="예약날짜"
                    value={formData.date}
                    onChange={handleFieldChange}
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
            </div>
    
            <div className="mb-4">
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">사용 시작 시간</label>
                <input
                    type="time"
                    name="startTime"
                    placeholder="사용시작시간"
                    value={formData.startTime}
                    onChange={handleFieldChange}
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
            </div>
    
            <div className="mb-6">
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">사용 종료 시간</label>
                <input
                    type="time"
                    name="endTime"
                    placeholder="사용종료시간"
                    value={formData.endTime}
                    onChange={handleFieldChange}
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
            </div>
    
            {/* 예약구역 선택 */}
            <div className="mb-4">
                <label htmlFor="seatNum" className="block text-sm font-medium text-gray-700">예약 구역</label>
                <select
                    id="seatNum"
                    name="seatNum"
                    value={formData.seatNum}
                    onChange={handleFieldChange}
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                    <option value="">구역을 선택하세요</option>
                    {Array.from({ length: 10 }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
                </select>
            </div>
    
            {/* 예약 버튼 */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleReserve}
                    className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                >
                    예약하기
                </button>
            </div>
        </div>
    );
};

export default StudyReserve