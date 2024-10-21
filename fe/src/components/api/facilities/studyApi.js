import axios from 'axios';


export const API_SERVER_HOST = "http://localhost:8080"
const host = `${API_SERVER_HOST}/api/facilities/study`

//reserve 정상동작 확인완료
export const reserveStudy = (reservationData) => {
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    }; 
    
    return axios.post(`${host}/reserve`, reservationData,config);
};

//list 정상동작 확인완료
export const listStudy = async (pageParam) => {
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
};

export const modifyStudy = (reservationId, reservationData) => {
    return axios.put(`${host}/modify/${reservationId}`, reservationData);
};

export const cancelStudy = (reservationId) => {
    return axios.delete(`${host}/cancel/${reservationId}`);
};

// export const processPayment = (paymentDetails) => {
//     return axios.post(`${host}/payment`, paymentDetails);
// };