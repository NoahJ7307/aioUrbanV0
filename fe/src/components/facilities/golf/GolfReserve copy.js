import React, { useEffect, useState } from 'react';
import { reserveGolf } from '../../api/facilities/golfApi';
import { useNavigate } from 'react-router-dom';
import '../common/css/facilityLayout.css';
import GolfSeatMap from './GolfSeatMap';
import useReservationValidation from '../../hook/facilities/useReservationValidation';

const GolfReserve = () => {
    
    const { validateReservation } = useReservationValidation();
    const [uno, setUno] = useState();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        startTime: '',
        endTime: '',
        teeBox: '',
    });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedTeeBox, setSelectedTeeBox] = useState(null);

    const images = [
        '/images/g1.png',
        '/images/g2.png',
        '/images/g3.png',
    ];

    useEffect(() => {
        const getUno = localStorage.getItem('uno');
        if (getUno) {
            setUno(Number(getUno));
            console.log('불렸다 UNO : ' + getUno);
        } else {
            console.log('로그인 정보가 없습니다.');
        }
    }, []);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newFormData = {
                ...prevData,
                [name]: value,
            };

            if (name === 'teeBox') {
                setSelectedTeeBox(Number(value)); // 셀렉트 박스가 변경되면 해당 티박스를 클릭한 것처럼 처리
            }

            return newFormData;
        });
    };


    const handleReserve = async () => {
        if (!formData.date || !formData.startTime || !formData.endTime || !formData.teeBox) {
            alert('모든 필드를 채워 주세요.');
            return;
        }

        const reservationData = {
            uno,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
            delFlag: false,
            teeBox: parseInt(formData.teeBox),
        };

        if (!validateReservation(reservationData)) {
            return;
        }

        try {
            await reserveGolf(reservationData);
            alert('예약에 성공하셨습니다 😃');
            navigate('/facilities/golf/list');
        } catch (error) {
            console.error('error발생 :', error);
            alert('해당 시간대에 이미 예약된 좌석입니다. 다른 시간대를 선택해 주세요 😥 ');
        }
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleTeeBoxClick = (teeBoxNumber) => {
        setSelectedTeeBox(teeBoxNumber);
        setFormData({
            ...formData,
            teeBox: teeBoxNumber,
        });
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className='layout'>
                <div className="banner"
                    style={{
                        backgroundImage: `url('/images/g0.jpg')`,
                    
                    }}>
                    <div className="banner-overlay">
                        <h1 className="banner-text">골프장 예약하기</h1>
                    </div>
                </div>

                <div className="facility-section">
                    <div className="mb-6 text-center">
                        <div className="facility-pagination">
                            <div className="flex justify-between items-center mb-10 relative">
                                <button onClick={handlePrevImage} className="arrow-btn left-arrow">
                                    ◀
                                </button>
                                <div className="image-container">
                                    <img
                                        src={images[currentImageIndex]}
                                        alt={`골프장 이미지 ${currentImageIndex + 1}`}
                                        className="facility-image"
                                    />
                                </div>
                                <button onClick={handleNextImage} className="arrow-btn right-arrow">
                                    ▶
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="reservation-section">
                    <div className="reservation-form">
                        <form>
                            <label style={{ display: "block", textAlign: "center", marginBottom: "1rem" }}>
                                예약 날짜 선택하기
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleFieldChange}
                                min={new Date().toISOString().split('T')[0]} // 오늘 날짜를 최소값으로 설정

                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600"
                            />
                            <h2 htmlFor="startTime">이용 시간</h2>
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleFieldChange}
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600"
                            />
                            <h2 htmlFor="endTime">이용 종료 시간</h2>
                            <input
                                type="time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleFieldChange}
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600"
                            />
                            <h htmlFor="teeBox">예약 구역</h>
                            <select
                                id="teeBox"
                                name="teeBox"
                                value={formData.teeBox}
                                onChange={handleFieldChange}
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600"
                            >
                                <option value="">구역을 선택하세요</option>
                                {Array.from({ length: 10 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={handleReserve}
                                className="w-full py-2 px-4 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                            >
                                예약하기
                            </button>
                        </form>
                    </div>

                    <GolfSeatMap selectedTeeBox={selectedTeeBox} onTeeBoxClick={handleTeeBoxClick} />
                </div>
            </div>
        </div>
    );
};
export default GolfReserve;