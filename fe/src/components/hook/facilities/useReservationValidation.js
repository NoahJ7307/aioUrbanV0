import { useState, useEffect, useCallback } from "react";
import { listSchedule } from "../../api/facilities/facilityApi";

const useReservationValidation = (facilityKeywords) => {
    const [facilitySchedule, setFacilitySchedule] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await listSchedule();
                const schedule = response.data.find(
                    schedule => facilityKeywords.some(keyword =>
                        schedule.facilityName.toLowerCase().includes(keyword.toLowerCase())
                    )
                );
                setFacilitySchedule(schedule);
            } catch (error) {
                console.error('스케줄 조회 중 오류 발생: ', error);
                setError(error);
            }
        };
        fetchSchedule();
    }, [facilityKeywords]);

    const validateTime = useCallback((startTime, endTime) => {
        if (!facilitySchedule) return false;

        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        const [scheduleStartHours, scheduleStartMinutes] = facilitySchedule.startTime.split(':').map(Number);
        const [scheduleEndHours, scheduleEndMinutes] = facilitySchedule.endTime.split(':').map(Number);

        const startTimeInMinutes = startHours * 60 + startMinutes;
        const endTimeInMinutes = endHours * 60 + endMinutes;
        const scheduleStartInMinutes = scheduleStartHours * 60 + scheduleStartMinutes;
        const scheduleEndInMinutes = scheduleEndHours * 60 + scheduleEndMinutes;

        if (startTimeInMinutes < scheduleStartInMinutes || endTimeInMinutes > scheduleEndInMinutes) {
            alert(`해당시설 이용가능 시간은 ${facilitySchedule.startTime}부터 ${facilitySchedule.endTime}까지입니다.`);
            return false;
        }

        if (startTimeInMinutes >= endTimeInMinutes) {
            alert('종료 시간은 시작 시간 이후여야 합니다.');
            return false;
        }

        return true;
    }, [facilitySchedule]);


    const validateReservation = useCallback((data) => {
        const selectedDate = new Date(data.date);
        const today = new Date();
        if (selectedDate < today.setHours(0, 0, 0, 0)) {
            alert('선택하신 날짜는 오늘 이후여야 합니다.');
            return false;
        }

        const now = new Date();
        const startTime = new Date(`${data.date}T${data.startTime}`);
        if (startTime <= now) {
            alert('예약 시작 시간은 현재 시간 이후여야 합니다.');
            return false;
        }


        return validateTime(data.startTime, data.endTime);
    }, [validateTime]);

    return {
        facilitySchedule,
        error,
        validateReservation,
        validateTime
    };
};

export default useReservationValidation;