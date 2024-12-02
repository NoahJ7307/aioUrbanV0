import React, { useEffect, useState } from 'react';
import { deleteSchedule, listSchedule, saveSchedule, updateSchedule } from '../api/facilities/facilityApi';
import { useNavigate } from 'react-router-dom';

const FacilitySchedule = () => {
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState({
        facilityName: "",
        startTime: "",
        endTime: "",
        link: "",
    });
    const [scheduleList, setScheduleList] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const role = localStorage.getItem("role");

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await listSchedule();
                setScheduleList(response.data);
            } catch (error) {
                console.error('스케줄 조회 중 오류 발생: ', error);
            }
        };
        fetchSchedule();
    }, []);

    const handleSave = async () => {
        try {
            if (editMode) {
                await updateSchedule({ id: editMode.id, ...schedule });
                alert("시설별 이용시간이 수정되었습니다.");
            } else {
                await saveSchedule(schedule);
                alert("입력하신 시설별 이용시간이 저장되었습니다!");
            }
            setSchedule({ facilityName: "", startTime: "", endTime: "", link: "" });
            setEditMode(null);
            const response = await listSchedule();
            setScheduleList(response.data);
        } catch (error) {
            console.error("스케줄 저장 중 오류 발생:", error);
            alert("스케줄 저장에 실패했습니다.");
        }
    };

    const handleEdit = (item) => {
        setEditMode(item);
        setSchedule({
            facilityName: item.facilityName,
            startTime: item.startTime,
            endTime: item.endTime,
            link: item.link,
            id: item.id
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                await deleteSchedule(id);
                alert("시설별 이용시간이 삭제되었습니다.");
                const response = await listSchedule();
                setScheduleList(response.data);
            } catch (error) {
                console.error("스케줄 삭제 중 오류 발생: ", error);
                alert("스케줄 삭제에 실패했습니다.");
            }
        }
    };

    // 카드 클릭 시 링크로 이동
    const handleBookingClick = (link) => {
        if (link) {
            window.location.href = link;

        }
    };

    return (
        <div style={{
            padding: '20px', fontFamily: 'GmarketSansMedium'
        }}>
            {role === 'ADMIN' && (
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <h1 style={{ marginBottom: '10px' }}>시설별 이용시간 공지 등록</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            placeholder="시설명"
                            value={schedule.facilityName}
                            onChange={(e) => setSchedule({ ...schedule, facilityName: e.target.value })}
                            style={{
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                width: '200px',
                            }}
                        />
                        <input
                            type="time"
                            value={schedule.startTime}
                            onChange={(e) => setSchedule({ ...schedule, startTime: e.target.value })}
                            style={{
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                width: '150px',
                            }}
                        />
                        <input
                            type="time"
                            value={schedule.endTime}
                            onChange={(e) => setSchedule({ ...schedule, endTime: e.target.value })}
                            style={{
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                width: '150px',
                            }}
                        />
                        <input
                            type="url"
                            placeholder="연결링크(전체 URL을 입력하세요)"
                            value={schedule.link}
                            onChange={(e) => setSchedule({ ...schedule, link: e.target.value })}
                            style={{
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                width: '250px',
                            }}
                        />
                        <button
                            onClick={handleSave}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: editMode ? '#2196F3' : '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            {editMode ? '수정' : '저장'}
                        </button>
                    </div>
                </div>
            )}
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-semibold">시설별 이용시간 안내</h2>
            </div>
            
            {scheduleList.length > 0 ? (
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '80px',
                        justifyContent: 'center',

                    }}
                >
                    {scheduleList.map((item) => (
                        <div
                            key={item.id}
                            style={{

                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                padding: '50px',
                                width: '300px',
                                height: '300px',
                                textAlign: 'center',
                                backgroundColor: '#f9f9f9',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                transition: 'transform 0.3s ease', // Adding smooth scaling transition
                            }}
                            // Hover effect to scale the card
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <h3 style={{ marginBottom: '10px', color: '#333', fontSize: '33px', fontWeight: 'bold' }}>{item.facilityName}</h3>
                            <p style={{ marginBottom: '5px', color: '#555' }}>
                                <strong>시작:</strong> {item.startTime}
                            </p>
                            <p style={{ marginBottom: '10px', color: '#555' }}>
                                <strong>종료:</strong> {item.endTime}
                            </p>
                            {role === 'ADMIN' && (
                                <div style={{ marginTop: '10px' }}>
                                    <button
                                        onClick={() => handleEdit(item)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#2196F3',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            marginRight: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#f44336',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        삭제
                                    </button>
                                </div>
                            )}
                            {/* 예약하러 가기 버튼 */}
                            {item.link && (
                                <div style={{ marginTop: '40px' }}>
                                    <button
                                        onClick={() => handleBookingClick(item.link)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {item.facilityName} 이용하기
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: 'center', color: '#888' }}>등록된 시간이 없습니다.</p>
            )}
        </div>
    );
};

export default FacilitySchedule;
