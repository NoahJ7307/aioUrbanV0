import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const host = `${API_SERVER_HOST}/api/main`

export const register = async (userData) => {
    const res = await axios.post(`${host}/join`, userData)
    return res.data
}