import React from 'react';
import '../common/css/seatMap.css';  // CSS 파일 import
import golfImage from '../../../images/golf.svg'

const GolfSeatMap = ({ selectedTeeBox, onTeeBoxClick }) => {

    return (
        <div className="seat-map" style={{ position: 'relative' }}>
            <h2>좌석 선택</h2>
            <div
                style={{
                    width: '100%',
                    height: 'auto',
                    backgroundImage: `url(${golfImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 3960 2700"
                    style={{ width: '100%', height: 'auto' }}
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

                        {/* 1번~6번 */}
                        <rect
                            className={`seat-box ${selectedTeeBox === 1 ? 'selected' : 'available'}`}
                            x="1835"
                            y="800"
                            width="450"
                            height="850"
                            onClick={() => onTeeBoxClick(1)}
                        
                        />
                        <rect
                            className={`seat-box ${selectedTeeBox === 2 ? 'selected' : 'available'}`}
                            x="2390"
                            y="800"
                            width="450"
                            height="850"
                            onClick={() => onTeeBoxClick(2)}
                        />
                        <rect
                            className={`seat-box ${selectedTeeBox === 3 ? 'selected' : 'available'}`}
                            x="2935"
                            y="800"
                            width="450"
                            height="850"
                            onClick={() => onTeeBoxClick(3)}
                        />
                        <rect
                            className={`seat-box ${selectedTeeBox === 4 ? 'selected' : 'available'}`}
                            x="3525"
                            y="800"
                            width="450"
                            height="850"
                            onClick={() => onTeeBoxClick(4)}
                        />
                        <rect
                            className={`seat-box ${selectedTeeBox === 5 ? 'selected' : 'available'}`}
                            x="4070"
                            y="800"
                            width="450"
                            height="850"
                            onClick={() => onTeeBoxClick(5)}
                        />
                        <rect
                            className={`seat-box ${selectedTeeBox === 6 ? 'selected' : 'available'}`}
                            x="4620"
                            y="800"
                            width="450"
                            height="850"
                            onClick={() => onTeeBoxClick(6)}
                        />

                            {/* 7번~10번 */}
                        <rect
                            className={`seat-box ${selectedTeeBox === 7 ? 'selected' : 'available'}`}
                            x="1650"
                            y="1820"
                            width="820"
                            height="450"
                            onClick={() => onTeeBoxClick(7)}
                        />
                        <rect
                            className={`seat-box ${selectedTeeBox === 8 ? 'selected' : 'available'}`}
                            x="4050"
                            y="1820"
                            width="820"
                            height="450"
                            onClick={() => onTeeBoxClick(8)}
                        />
                        <rect
                            className={`seat-box ${selectedTeeBox === 9 ? 'selected' : 'available'}`}
                            x="1685"
                            y="2560"
                            width="810"
                            height="450"
                            onClick={() => onTeeBoxClick(9)}
                        />
                        <rect
                            className={`seat-box ${selectedTeeBox === 10 ? 'selected' : 'available'}`}
                            x="4050"
                            y="2615"
                            width="810"
                            height="450"
                            onClick={() => onTeeBoxClick(10)}
                        />
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default GolfSeatMap;
