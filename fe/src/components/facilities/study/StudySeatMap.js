import React from 'react';
import '../common/css/seatMap.css';  // CSS 파일 import
import studyImage from '../../../images/study.svg'

const StudySeatMap = ({ selectedSeatNum, onSeatNumClick }) => {

    return (
        <div className="seat-map" style={{ position: 'relative' }}>
            <h2>좌석 선택</h2>
            <div
                style={{
                    width: '100%',
                    height: 'auto',
                    backgroundImage: `url(${studyImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 3960 2700"
                    style={{ width: '170%', height: 'auto' }}
                >
                    <g clipPath="url(#clip0)" transform="translate(-1389 -599)">
                        <g clipPath="url(#clip1)" transform="matrix(0.000360892 0 0 0.000360892 1389 599)">
                            <g clipPath="url(#clip3)" transform="matrix(1 0 0 1 -0.15028 -0.0402388)">
                                <use
                                    width="100%"
                                    height="100%"
                                    xlinkHref="#img2"
                                    transform="scale(2770.91 2770.91)"
                                ></use>
                            </g>
                        </g>

                        {/* 1번~20번*/}
                        <rect
                            className={`seat-box ${selectedSeatNum === 1 ? 'selected' : 'available'}`}
                            x="1720"
                            y="1100"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(1)}

                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 2 ? 'selected' : 'available'}`}
                            x="1900"
                            y="1100"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(2)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 3 ? 'selected' : 'available'}`}
                            x="1730"
                            y="1200"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(3)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 4 ? 'selected' : 'available'}`}
                            x="1900"
                            y="1210"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(4)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 5 ? 'selected' : 'available'}`}
                            x="2158"
                            y="1090"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(5)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 6 ? 'selected' : 'available'}`}
                            x="2338"
                            y="1090"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(6)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 7 ? 'selected' : 'available'}`}
                            x="2505"
                            y="1080"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(7)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 8 ? 'selected' : 'available'}`}
                            x="2158"
                            y="1190"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(8)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 9 ? 'selected' : 'available'}`}
                            x="2338"
                            y="1190"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(9)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 10 ? 'selected' : 'available'}`}
                            x="2508"
                            y="1190"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(10)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 11 ? 'selected' : 'available'}`}
                            x="1735"
                            y="1550"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(11)}

                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 12 ? 'selected' : 'available'}`}
                            x="1910"
                            y="1550"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(12)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 13 ? 'selected' : 'available'}`}
                            x="1740"
                            y="1670"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(13)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 14 ? 'selected' : 'available'}`}
                            x="1915"
                            y="1650"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(14)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 15 ? 'selected' : 'available'}`}
                            x="2178"
                            y="1540"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(15)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 16 ? 'selected' : 'available'}`}
                            x="2348"
                            y="1540"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(16)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 17 ? 'selected' : 'available'}`}
                            x="2515"
                            y="1540"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(17)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 18 ? 'selected' : 'available'}`}
                            x="2178"
                            y="1640"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(18)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 19 ? 'selected' : 'available'}`}
                            x="2338"
                            y="1640"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(19)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 20 ? 'selected' : 'available'}`}
                            x="2508"
                            y="1640"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(20)}
                        />

                        {/* 21번~32번 */}
                        <rect
                            className={`seat-box ${selectedSeatNum === 21 ? 'selected' : 'available'}`}
                            x="2830"
                            y="1080"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(21)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 22 ? 'selected' : 'available'}`}
                            x="3000"
                            y="1080"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(22)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 23 ? 'selected' : 'available'}`}
                            x="2830"
                            y="1390"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(23)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 24 ? 'selected' : 'available'}`}
                            x="3000"
                            y="1390"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(24)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 25 ? 'selected' : 'available'}`}
                            x="2830"
                            y="1700"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(25)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 26 ? 'selected' : 'available'}`}
                            x="3000"
                            y="1700"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(26)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 27 ? 'selected' : 'available'}`}
                            x="2850"
                            y="2000"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(27)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 28 ? 'selected' : 'available'}`}
                            x="3010"
                            y="2000"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(28)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 29 ? 'selected' : 'available'}`}
                            x="2850"
                            y="2310"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(29)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 30 ? 'selected' : 'available'}`}
                            x="3010"
                            y="2310"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(30)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 31 ? 'selected' : 'available'}`}
                            x="2850"
                            y="2610"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(31)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 32 ? 'selected' : 'available'}`}
                            x="3012"
                            y="2610"
                            width="165"
                            height="120"
                            onClick={() => onSeatNumClick(32)}
                        />
                        {/* 33번~37번 */}
                        <rect
                            className={`seat-box ${selectedSeatNum === 33 ? 'selected' : 'available'}`}
                            x="3380"
                            y="825"
                            width="160"
                            height="380"
                            onClick={() => onSeatNumClick(33)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 34 ? 'selected' : 'available'}`}
                            x="3380"
                            y="1300"
                            width="160"
                            height="380"
                            onClick={() => onSeatNumClick(34)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 35 ? 'selected' : 'available'}`}
                            x="3385"
                            y="1770"
                            width="160"
                            height="380"
                            onClick={() => onSeatNumClick(35)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 36 ? 'selected' : 'available'}`}
                            x="3390"
                            y="2235"
                            width="160"
                            height="380"
                            onClick={() => onSeatNumClick(36)}
                        />
                        <rect
                            className={`seat-box ${selectedSeatNum === 37 ? 'selected' : 'available'}`}
                            x="3390"
                            y="2680"
                            width="160"
                            height="380"
                            onClick={() => onSeatNumClick(37)}
                        />


                    </g>
                </svg>
            </div>
        </div>
    );
};

export default StudySeatMap;
