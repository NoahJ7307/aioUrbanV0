// 날짜를 한국 시간으로 포맷팅하는 함수
export const formatToKoreanTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

// 숫자를 미국식 콤마 형식으로 포맷팅하는 함수
export const formatNumber = (number) => {
    return number.toLocaleString('en-US');
};

let backendHost;
const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
    backendHost = "http://localhost:8080";
} else {
    // 혜미 서버
    // backendHost = "http://13.209.236.187:8080";
}

// API 기본 URL
export const API_BASE_URL = backendHost;