import axios from 'axios';

// API 서버 주소
export const API_SERVER_HOST = 'http://localhost:8080';
const host = `${API_SERVER_HOST}/api/communities/info/jobs`;  // 수정된 엔드포인트

// 채용공고 목록 조회
export const getJobs = async () => {
    const token = localStorage.getItem("token");  // JWT 토큰 가져오기
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,  // Authorization 헤더 설정
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await axios.get(host, config);  // 채용공고 목록 조회
        return response.data;  // 성공 시 채용공고 목록 반환
    } catch (error) {
        console.error("채용공고 조회 실패", error);
        throw error;  // 에러를 호출한 곳으로 전달
    }
};

// 특정 채용공고 조회
export const getJobById = async (id) => {
    const token = localStorage.getItem("token");  // JWT 토큰 가져오기
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,  // Authorization 헤더 설정
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await axios.get(`${host}/${id}`, config);  // 채용공고 ID로 조회
        return response.data;  // 성공 시 채용공고 데이터 반환
    } catch (error) {
        console.error("채용공고 조회 실패", error);
        throw error;  // 에러를 호출한 곳으로 전달
    }
};

// 채용공고 생성
export const createJob = async (jobData) => {
    const token = localStorage.getItem("token");  // JWT 토큰 가져오기
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,  // Authorization 헤더 설정
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await axios.post(host, jobData, config);  // 채용공고 생성
        return response.data;  // 성공 시 생성된 채용공고 반환
    } catch (error) {
        console.error("채용공고 생성 실패", error);
        throw error;  // 에러를 호출한 곳으로 전달
    }
};
