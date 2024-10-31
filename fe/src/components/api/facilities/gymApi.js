import axios from 'axios';

export const API_SERVER_HOST = "http://localhost:8080";
const host = `${API_SERVER_HOST}/api/facilities/gym`;


//공통 config설정 : 권한관련/ 변수로 설정하여 코드의 중복을 줄인다.
const getConfig = () => {
    const token = localStorage.getItem("token");// JWT 토큰을 저장한 위치
    // console.log("token", token)
    if (!token) {
        console.error("토큰이 없습니다.");
        return {};
    }
    return {
        headers: {
            "Authorization": `Bearer ${token}`,  // Bearer 형식으로 JWT 토큰 설정
            "Content-Type": "application/json",
        },
    };
};

export const postAdd = async (program) => {
    console.log("게시글 작성 눌렸다")
    const config = getConfig();
    const res = await axios.post(`${host}/add`, program, config)
    return res.data
}

export const listGym = async (pageParam) => {
    const { page, size } = pageParam
    const config = {
        ...getConfig(),
        params: { page, size },
    }
    const res = await axios.get(`${host}/list`, config)
    return res.data
}

export const getGymListByProgramId = async ({ programId,page,size}) => {
    console.log("Fetching program gym by programId : ", programId,page,size)
    const config = getConfig();
    console.log("config: ", config)
    const res = await axios.get(`${host}/detail/modify/${programId}`, config);
    console.log(res)
    return res.data
}

export const modifyPost= async (programId, programData) => {
    const config = getConfig();
    const response = await axios.put(`${host}/detail/modify/${programId}`, JSON.stringify(programData), config);
    return response;
}
export const deletePost = async (programId) => {
    console.log("전달확인 프로그램아이디: " , programId)
    const config = getConfig();
    return axios.post(`${host}/delete`, programId, config);
}


// export const getProgramPosts = async (pageParam) => {
//     const { page, size } = pageParam
//     const config = {
//         ...getConfig(),
//         params: { page, size },
//     }
//     const res = await axios.get(`${host}/list`, config)
//     return res.data
// }

// export const cancelPost = async (checkedProgramId) => {
//     const config = getConfig();
//     return axios.post(`${host}/delete`, checkedProgramId, config);
// }
