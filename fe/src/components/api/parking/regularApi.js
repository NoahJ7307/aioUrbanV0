import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const host = `${API_SERVER_HOST}/api/parking/regular`

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
    const res = await axios.get(`${host}/list`, config)
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
    const res = await axios.get(`${host}/user_list`, config)
    return res.data
}

export const RegularParkingDeleteChecked = async (checkedRpno) => {
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    }
    const res = await axios.post(`${host}/delete`, checkedRpno, config)
    return res.data
}

export const RegularPostAdd = async (userData) => {
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    }
    const updateUserData = {
        carNum: userData.carNum,
        name: userData.name,
        phone: userData.phone,
        householdDTO: {
            dong: userData.dong,
            ho: userData.ho,
        }
    }
    console.log(updateUserData)
    const res = await axios.post(`${host}/`, updateUserData, config)
    return res.data
}