import axios from 'axios';

export const API_SERVER_HOST = "http://localhost:8080"
const host = `${API_SERVER_HOST}/api/facilities/gym`

export const reserveGym = (reservationData) => {
    return axios.post(`${host}/reserve`, reservationData);
};
export const listGym = (reservationId) => {
    return axios.get(`${host}/list/${reservationId}`);
};
export const modifyGym = (reservationId, reservationData) => {
    return axios.put(`${host}/modify/${reservationId}`, reservationData);
};

export const cancelGym = (reservationId) => {
    return axios.delete(`${host}/cancel/${reservationId}`);
};

// export const processPayment = (paymentDetails) => {
//     return axios.post(`${host}/payment`, paymentDetails);
// };