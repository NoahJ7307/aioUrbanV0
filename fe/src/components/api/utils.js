import axios from "axios";


//  ===================날짜를 한국 시간으로 포맷팅하는 함수
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

//  ===================숫자를 미국식 콤마 형식으로 포맷팅하는 함수
export const formatNumber = (number) => {
    return number.toLocaleString('en-US');
};




// ===================기본 url
let backendHost;
const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
    backendHost = "http://localhost:8080";
} else {
    // 혜미 서버
    // backendHost = "http://13.209.236.187:8080";
}

export const API_BASE_URL = backendHost;


// =================== axios call 함수
export async function apiCall(url, method, requestData) {
    // 최신 토큰을 localStorage에서 가져오기
    const token = localStorage.getItem('token');

    let headers = '';
    if (token) { // 토큰이 있을 때만 Authorization 설정
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
    } else {
        headers = { 'Content-Type': 'application/json' };
    }

    let options = {
        url: API_BASE_URL + url,
        method: method,
        headers: headers,
    };

    // GET 요청일 때는 params, 그 외에는 data로 설정
    if (requestData) {
        if (method === 'GET') {
            options.params = requestData;  // GET 요청의 경우 params에 할당
        } else {
            options.data = requestData;    // POST, PUT 등의 요청의 경우 data에 할당
        }
    }

    return axios(options)
        .then(response => {
            return response;
        }).catch(err => {
            console.error(`** apiCall Error status=${err.response?.status}, message=${err.message}`);
            return Promise.reject(err.response);
        });
}


// =============JSON 형식인지 확인하는 함수
export const isJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

// =================안전하게 JSON 파싱을 시도하는 함수
export const getParsedItem = (key) => {
    const item = localStorage.getItem(key);
    return item && item !== "undefined" && isJSON(item) ? JSON.parse(item) : item;
};