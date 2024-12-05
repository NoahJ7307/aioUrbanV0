
const useReservationValidation = () => {
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

        const now = new Date();
        if (startTime <= now) {
            alert('예약 시작 시간은 현재 시간 이후여야 합니다.');
            return false;
        }

        return true;
    };

    return { validateReservation };
};

export default useReservationValidation;