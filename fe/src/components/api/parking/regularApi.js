import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const host = `${API_SERVER_HOST}/api/parking`

export const getList = async (pageParam) => {
    const { page, size } = pageParam
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        params: { page, size },
    }
    const res = await axios.get(`${host}/regular/list`, config)
    return res.data
}

export const getUserList = async (pageParam) => {
    const { page, size } = pageParam
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        params: { page, size },
        body: {
            dong: 0,
            ho: 0
        }
    }
    const res = await axios.get(`${host}/regular/user_list`, config)
    return res.data
}