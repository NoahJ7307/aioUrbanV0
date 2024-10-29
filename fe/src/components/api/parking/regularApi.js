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

export const getUserList = async (pageParam, loginUser) => {
    console.log("getUserList loginUser : ", pageParam)
    console.log("getUserList loginUser : ", loginUser)
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    }

    const body = {
        pageRequestDTO: pageParam,
        householdDTO: loginUser,
    }
    const res = await axios.post(`${host}/user_list`, body, config)
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

export const getOne = async (rpno) => {
    console.log("api", rpno)
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    }
    const res = await axios.get(`${host}/${rpno}`, config)
    return res.data
}
// put이 RequestBody로 받을 수 있나? post로 보내야되나? params?
// putOne에서는 household를 줘야되는데 userData로 받아서 보내면 dong,ho를 못받으니까 api에서 가공해서 householdDTO로 보내줘야지
// 근데 외래키 수정하려면 어떻게 해야되지? householdService로 수정해서 setHousehold로 새로 넣어야되나?
export const putOne = async (rpno, serverData) => {
    console.log(serverData)
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    }
    const { carNum, name, phone, dong, ho } = serverData
    const body = {
        regularParkingDTO: {
            carNum: carNum,
            name: name,
            phone: phone,
        },
        householdDTO: {
            dong: dong,
            ho: ho,
        }
    }
    const res = await axios.put(`${host}/${rpno}`, body, config)
    console.log("api", res.data)
    return res.data
}