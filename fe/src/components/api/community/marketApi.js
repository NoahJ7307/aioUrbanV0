import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';
const host = `${API_SERVER_HOST}/api/communities/market`;

// 리스트 가져오기
export const get = async (pageParam) => {
    const { page, size } = pageParam;
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        params: { page, size },
    };
    const res = await axios.get(`${host}/list`, config);
    return res.data;
};



// 상품 추가
export const post = async (formData) => {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            // "Content-Type": "multipart/form-data" 설정하지 않음
        },
    };

    try {
        const res = await axios.post(`${host}/add`, formData, config);
        return res.data;
    } catch (error) {
        console.error("상품 추가 요청 실패:", error);
        throw error; // 에러를 던져서 호출하는 쪽에서 처리하도록 함
    }
};


// 게시물 삭제
export const deleteChecked = async (mno, uno) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("토큰이 존재하지 않습니다.");
        return;
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        params: { uno }  // URL 파라미터로 uno 전달
    };

    try {
        const res = await axios.delete(`${host}/${mno}`, config);  // mno로 수정
        return res.data;
    } catch (error) {
        console.error("삭제 요청 실패", error);
    }
};
export const getModify = async (mno) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("인증 토큰이 존재하지 않습니다.");

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        console.log("Request Config:", config); // 로그 추가

        const res = await axios.get(`${host}/modify/${mno}`, config);
        return res.data;
    } catch (error) {
        console.error("에러 발생", error);
        throw error;
    }
};


export const update = async (data, mno, uno, thumbnail, images) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("인증 토큰이 존재하지 않습니다.");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("price", data.price); // 가격 추가
    formData.append("uno", uno); // uno 추가

    if (thumbnail) {
        formData.append("thumbnail", thumbnail);
    }

    if (images && images.length > 0) {
        images.forEach(image => {
            formData.append("images", image);
        });
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    };

    const response = await axios.put(`${host}/modify/${mno}`, formData, config);
    return response.data; // 반환값 확인
};
