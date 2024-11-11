import React, { useEffect, useState } from 'react';
import { getJobs } from '../../api/community/JobAPi';

const InfoMainComponents = () => {
    const [selectedData, setSelectedData] = useState({
        title: '위치를 클릭해주세요',
        companyName: '',
        location: '',
        salary: '',
        applyUrl: '',
        employmentType: '',
        experienceRequired: '',
        workHours: '',
        jobLevel: '',
        postedDate: '',
        closingDate: '',
    });
    const [jobData, setJobData] = useState([]);  // API에서 받아올 데이터

    // 스크립트 로드 함수
    const new_script = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.addEventListener('load', () => resolve());
            script.addEventListener('error', (e) => reject(e));
            document.head.appendChild(script);
        });
    };

    // jobapi에서 데이터 가져오기
    const fetchJobData = async () => {
        try {
            const data = await getJobs();  // jobapi에서 채용공고 목록 조회
            setJobData(data);  // API에서 받은 데이터를 상태에 저장
            console.log("Fetched job data:", data);  // 가져온 데이터 확인
        } catch (error) {
            console.error('Error fetching job data:', error);
        }
    };

    useEffect(() => {
        fetchJobData();  // jobapi에서 데이터 가져오기
    }, []);  // 빈 배열로 설정하여 한 번만 실행되도록 함

    useEffect(() => {
        if (jobData.length > 0) {  // jobData가 비어있지 않으면 마커 추가
            const loadMap = async () => {
                try {
                    // 카카오맵 스크립트 로드
                    await new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=62a5ebaa7bf330889cd506d7bb11d35d');
                    console.log('Script loaded successfully!');

                    const kakao = window.kakao;  // 카카오 객체 접근

                    // #map 요소가 존재하는지 확인
                    const mapContainer = document.getElementById('map');
                    if (mapContainer) {
                        // 카카오맵 설정
                        kakao.maps.load(() => {
                            const options = {
                                center: new kakao.maps.LatLng(37.34971482603377, 127.10699487749385), // 초기 좌표 설정
                                level: 3  // 맵의 확대 레벨 설정
                            };
                            const map = new kakao.maps.Map(mapContainer, options); // 카카오맵 객체 생성

                            // API에서 받은 데이터로 마커 추가
                            jobData.forEach(job => {
                                const { latitude, longitude, title, companyName, location, salary, applyUrl, employmentType, experienceRequired, workHours, jobLevel, postedDate, closingDate } = job;
                                const markerPosition = new kakao.maps.LatLng(latitude, longitude); // 마커의 위치 설정
                                const marker = new kakao.maps.Marker({
                                    position: markerPosition
                                });
                                marker.setMap(map);  // 맵에 마커 추가

                                // 마커 클릭 이벤트
                                kakao.maps.event.addListener(marker, 'click', () => {
                                    const data = {
                                        title: title,  // 마커에 설정된 데이터
                                        companyName: companyName,
                                        location: location,
                                        salary: salary,
                                        applyUrl: applyUrl,
                                        employmentType: employmentType,
                                        experienceRequired: experienceRequired,
                                        workHours: workHours,
                                        jobLevel: jobLevel,
                                        postedDate: postedDate,
                                        closingDate: closingDate
                                    };
                                    setSelectedData(data);  // 클릭한 위치에 맞는 데이터 설정
                                });
                            });
                        });
                    } else {
                        console.error('Map container not found');
                    }
                } catch (error) {
                    console.error('Error loading the script:', error);
                }
            };

            loadMap(); // 맵 로드 함수 실행
        }
    }, [jobData]);  // jobData가 변경될 때마다 맵을 업데이트

    return (
        <div className="flex flex-wrap">
            {/* 지도 영역 (왼쪽) */}
            <div id="map" className="h-[500px] w-full md:w-1/2 p-2 mt-6" />  {/* 지도 높이를 늘리고, 위쪽 여백 추가 */}

            {/* 데이터 영역 (오른쪽) */}
            <div className="p-5 w-full md:w-1/2 overflow-y-auto">
                {/* 공고 제목 카드 추가 */}
                <div className="bg-blue-500 text-white p-4 rounded-lg mb-6">
                    <h3 className="text-2xl font-semibold">{selectedData.title}</h3>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-100 p-4 rounded-lg shadow-md">
                            <p className="text-lg text-green-600 font-bold">회사명</p>
                            <p className="text-gray-800">{selectedData.companyName}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg shadow-md">
                            <p className="text-lg text-green-600 font-bold">위치</p>
                            <p className="text-gray-800">{selectedData.location}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg shadow-md">
                            <p className="text-lg text-green-600 font-bold">연봉</p>
                            <p className="text-gray-800">{selectedData.salary}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg shadow-md">
                            <p className="text-lg text-green-600 font-bold">근무 형태</p>
                            <p className="text-gray-800">{selectedData.employmentType}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg shadow-md">
                            <p className="text-lg text-green-600 font-bold">경력 요구 사항</p>
                            <p className="text-gray-800">{selectedData.experienceRequired}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg shadow-md">
                            <p className="text-lg text-green-600 font-bold">근무 시간</p>
                            <p className="text-gray-800">{selectedData.workHours}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg shadow-md">
                            <p className="text-lg text-green-600 font-bold">직급</p>
                            <p className="text-gray-800">{selectedData.jobLevel}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg shadow-md">
                            <p className="text-lg text-green-600 font-bold">게시일</p>
                            <p className="text-gray-800">{selectedData.postedDate}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg shadow-md">
                            <p className="text-lg text-green-600 font-bold">마감일</p>
                            <p className="text-gray-800">{selectedData.closingDate}</p>
                        </div>
                    </div>
                    <a href={selectedData.applyUrl} className="mt-6 inline-block bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all" target="_blank" rel="noopener noreferrer">지원하기</a>
                </div>
            </div>
        </div>
    );
};

export default InfoMainComponents;
