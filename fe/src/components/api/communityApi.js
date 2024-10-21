import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';
const host = `${API_SERVER_HOST}/api/community`;

export const get = async (pageParam) => {
    const { page, size } = pageParam
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        params: { page, size },
    }
    const res = await axios.get(`${host}/list`, config)
    return res.data
}

// 새 게시물 생성
export const post = async (data, uno) => {
    const res = await axios.post(`${host}/add?uno=${uno}`, data); // 쿼리 파라미터로 uno 추가
    return res.data;
}
