import React, { useEffect, useState } from 'react';
import { reserveGolf } from '../../api/facilities/golfApi';
import { useNavigate } from 'react-router-dom';
import './1.css'
import TeeBox1 from './TeeBox1';
import TeeBox2 from './TeeBox2';
const GolfReserve = () => {
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
    // const handleFieldChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    const validateReservation = (data) => {
        const selectedDate = new Date(data.date);
        const today = new Date();
        if (selectedDate < today.setHours(0, 0, 0, 0)) {
            alert('선택하신 날짜는 오늘 이후여야 합니다.');
            return false;
        }

        const startTime = new Date(`${data.date}T${data.startTime}`);
        const endTime = new Date(`${data.date}T${data.endTime}`);
        if (startTime >= endTime) {
            alert('시작 시간은 종료 시간보다 이전이어야 합니다.');
            return false;
        }

        if (selectedDate.toDateString() === today.toDateString() && startTime <= today) {
            alert('예약 시작 시간은 현재 시간 이후여야 합니다.');
            return false;
        }

        return true;
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
            {/* 1번: 상단 배너 */}

            <div className='layout'>
                <div className="banner"
                    style={{
                        backgroundImage: `url('/images/g0.jpg')`, // JSX에서만 배경 이미지 설정
                    }}>
                    <div className="banner-overlay">
                        <h1 className="banner-text">골프장 예약하기</h1>
                    </div>
                </div>

                {/* 2번: 중앙 시설 이미지 */}
                <div className="facility-section">
                    <div className="mb-6 text-center">
                        <div className="facility-pagination">
                            {/* 페이지네이션으로 슬라이드 가능한 부분 */}
                            <div className="flex justify-between items-center mb-10 relative">

                                {/* <div className="w-[30%] relative"> */}
                                {/* 좌측 화살표 */}
                                <button
                                    onClick={handlePrevImage}
                                    className="arrow-btn left-arrow"
                                // className="p-2 bg-gray-300 rounded-md text-xl absolute left-0 top-1/2 transform -translate-y-1/2"
                                >
                                    ◀
                                </button>

                                {/* 이미지 표시 */}
                                <div className="image-container">

                                    <img
                                        src={images[currentImageIndex]}
                                        alt={`골프장 이미지 ${currentImageIndex + 1}`}
                                        className="facility-image"
                                    // className="w-full h-auto object-cover rounded-lg"
                                    />
                                </div>

                                {/* 우측 화살표 */}
                                <button
                                    onClick={handleNextImage}
                                    className="arrow-btn right-arrow"
                                // className="p-2 bg-gray-300 rounded-md text-xl absolute right-0 top-1/2 transform -translate-y-1/2"
                                >
                                    ▶
                                </button>
                                {/* </div> */}

                            </div>

                        </div>
                    </div>
                </div>

                {/* 3번: 예약 폼과 좌석 배치도 */}
                <div className="reservation-section">

                    {/* 예약 폼 */}
                    <div className="reservation-form">
                        <form>
                            {/* 날짜 선택 */}

                            <label
                                style={{
                                    display: "block",
                                    textAlign: "center",
                                    marginBottom: "1rem",
                                }}
                            >
                                예약 날짜 선택하기
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleFieldChange}
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600"
                            />


                            {/* 시간 선택 */}

                            <h2 htmlFor="startTime" >이용 시간</h2>
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


                            {/* 구역 선택 */}

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
                    {/* 구역 배치도 (우측 배치) */}
                    <div className="seat-map" style={{ position: "relative" }}>
                        <h2>좌석 배치도 </h2>
                        <img src="/images/golf.png" alt="Golf Course Layout" />
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <TeeBox1
                                key={i}
                                handle={i}
                                isSelected={selectedTeeBox === i}
                                onClick = {handleTeeBoxClick}
                            />
                        ))}
                        {[7,8,9,10].map(i => (
                            <TeeBox2
                                key={i}
                                handle={i}
                                isSelected={selectedTeeBox === i}
                                onClick = {() => handleTeeBoxClick(i)}
                            />
                        ))}
                    </div>


                </div>

            </div>
        </div>

    );
};

export default GolfReserve;
