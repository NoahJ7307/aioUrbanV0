import axios from "axios";
import { useParams } from "react-router-dom";

export const API_SERVER_HOST = 'http://localhost:8080';
const host = `${API_SERVER_HOST}/api/communities/market`;

export const get = async (pageParam) => {

    const { page, size, } = pageParam
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
export const getModify = async (mno) => {
    try {

        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },

        }
        const res = await axios.get(`${host}/modify/${mno}`, config)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.error("에러에러", error);
        throw error;
    }


}


// 새 게시물 생성
export const post = async (data, uno) => {

    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Content-Type":"mutipart/form-data"
        },
    }
    const res = await axios.post(`${host}/add?uno=${uno}`, JSON.stringify(data, uno), config); // 쿼리 파라미터로 uno 추가
    return res.data;
}



export const update = async (data, pno, uno) => {
    console.log("update")
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    }
    const response = await axios.put(`${host}/modify/${pno}?uno=${uno}`, JSON.stringify(data, uno), config); // 쿼리 파라미터로 uno 추가
    return response;
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
        const res = await axios.delete(`${host}/${pno}?uno=${uno}`, config); // data는 DELETE 요청에서는 보통 사용되지 않음
        return res.data;
    } catch (error) {
        console.error("삭제 요청 실패", error);
    }
};
