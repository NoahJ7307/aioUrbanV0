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

    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    }
    const res = await axios.post(`${host}/add?uno=${uno}`, JSON.stringify(data,uno), config); // 쿼리 파라미터로 uno 추가
    return res.data;
}




export const deleteChecked = async (pno, uno) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("토큰이 존재하지 않습니다.");
        return;
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`, // Bearer 토큰 제대로 설정
            "Content-Type": "application/json",
        },
    };

    try {
        const res = await axios.delete(`${host}/${pno}?uno=${uno}`,config); // data는 DELETE 요청에서는 보통 사용되지 않음
        return res.data;
    } catch (error) {
        console.error("삭제 요청 실패", error);
    }
};