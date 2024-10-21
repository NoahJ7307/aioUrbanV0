import axios from 'axios';

export const API_SERVER_HOST = "http://localhost:8080"
const host = `${API_SERVER_HOST}/api/facilities/golf`

//공통 config설정 : 권한관련/ 변수로 설정하여 코드의 중복을 줄인다.
const getConfig = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
};


//reserve 정상동작 확인완료
export const reserveGolf = (reservationData) => {
    const config = getConfig();
    return axios.post(`${host}/reserve`, reservationData, config);
};

//list 정상동작 확인완료
export const listGolf = async (pageParam) => {
    const { page, size } = pageParam
    const config = {
        ...getConfig(),
        params: { page, size },
    }
    const res = await axios.get(`${host}/list`, config)
    return res.data
}
export const listUserGolf = async ({ uno, page, size }) => {
    const res = await axios.get(`${host}/userlist/${uno}`, { params: { page, size } })
    return res.data
}

export const modifyGolf = (reservationId, reservationData) => {
    const config = getConfig();
    return axios.put(`${host}/modify/${reservationId}`, reservationData, config);
};


export const cancelGolf = async (checkedReservationId) => {
    const config = getConfig(); 
    return axios.post(`${host}/delete`, checkedReservationId, config);
}

// export const cancelGolf = (checkedReservationId) => {
//     console.log("전송되라")
//     const config = getConfig();
//     return axios.delete(`${host}/delete`,{data: checkedReservationId }, config);
// };

// export const processPayment = (paymentDetails) => {
//     return axios.post(`${API_URL}/payment`, paymentDetails);
// };