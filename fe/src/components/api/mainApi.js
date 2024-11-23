import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const host = `${API_SERVER_HOST}/api/main`

export const register = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    }
    console.log(userData)
    const res = await axios.post(`${host}/join`, JSON.stringify(userData), config)
    return res.data
}

export const verifyPhoneSend = async (phone) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    }
    const res = await axios.post(`${host}/verify`, JSON.stringify(phone), config)
    console.log(res.data)
    return res.data
}