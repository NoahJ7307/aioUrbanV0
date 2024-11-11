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
//검색 추가한 조회 api

export const listGym = async (pageParam) => {
    const { page, size } = pageParam
    const config = {
        ...getConfig(),
        params: { page, size },
    }
    const res = await axios.get(`${host}/list`, config);
    return res.data;
}

export const searchListGym = async ({ page, size } , searchType, searchKeyWord) => {
    console.log("gymsearch 777", searchKeyWord);
    console.log("gymsearch 777", searchType);

    try {
        //검색조건을 쿼리 파라미터로 추가 
        const config = {
            ...getConfig(),
            params: {
                page: page,
                size: size,
                searchType: searchType,
                searchKeyWord: searchKeyWord
            }
        }
        const response = await axios.get(`${host}/list/search`, config);
        return response.data;
    } catch (error) {
        console.error('검색 api오류 : ', error);
        throw error;
    }
};
// export const listSearchGym = async (pageParam, type, keyword) => {
//     const { page, size } = pageParam
//     const config = {
//         ...getConfig(),
//         params: { page, size,type, keyword },
//     }
//     const res = await axios.get(`${host}/list/search`, config);
//     return res.data;
// }


// export const listGym = async (pageParam) => {
//     const { page, size } = pageParam
//     const config = {
//         ...getConfig(),
//         params: { page, size },
//     }
//     const res = await axios.get(`${host}/list`, config)
//     return res.data
// }


//수정누르면 기존내용 불러오는 로직 수정 필요 데이터 안불려짐 1105

export const getGymListByProgramId = async ({ programId, page, size }) => {
    console.log("Fetching program gym by programId : ", programId, page, size)
    const config = getConfig();
    console.log("config: ", config)
    const res = await axios.get(`${host}/detail/modify/${programId}`, config);
    console.log(res)
    return res.data
}


// export const getGymListByProgramId = async ({ programId,page,size}) => {
//     console.log("Fetching program gym by programId : ", programId,page,size)
//     const config = {
//         ...getConfig(),
//         params: { page, size },  // page와 size를 쿼리 파라미터로 설정
//     };
//     console.log("config: ", config)
//     const res = await axios.get(`${host}/detail/modify/${programId}`, config);
//     // console.log(res)
//     return res.data
// }
export const modifyPost = async (programId, programData) => {
    const config = getConfig();
    const response = await axios.put(`${host}/detail/modify/${programId}`, JSON.stringify(programData), config);
    return response;
}

export const deletePost = async (programId) => {
    console.log("전달확인 프로그램아이디: ", programId)
    const config = getConfig();
    return axios.post(`${host}/delete`, programId, config);
}
//사용자별 프로그램 접수 
export const applyForProgram = async (applicationData) => {
    console.log("접수된 정보 : ", applicationData)
    const config = getConfig();
    try {
        const response = await axios.post(`${host}/detail/register/${applicationData.programId}`, applicationData, config);
        console.log("1111: ", response)
        return response.data;
    } catch (error) {
        console.error("접수 신청중 오류 발생: ", error);
        throw error;
    }
}
export const applyForWaitlist = async (applicationData) => {
    console.log("접수된 정보 : ", applicationData)
    const config = getConfig();
    try {
        const response = await axios.post(`${host}/detail/waitlist/${applicationData.programId}`, applicationData, config);
        console.log("1105: ", response)
        return response.data;
    } catch (error) {
        console.error("접수 신청중 오류 발생: ", error);
        throw error;
    }
}


// 프로그램 ID에 따른 사용자 리스트 가져오기
export const fetchRegisteredUsers = async (programId) => {
    const config = getConfig();
    try {
        const response = await axios.get(`${host}/${programId}/participants`, config);
        console.log("프로그램에따른 사용자조회 api: ", response)
        return response.data;
    } catch (error) {
        console.error("Failed to fetch registered users:", error);
        throw error;
    }
};
// 프로그램 ID에 따른 대기자 리스트 가져오기
export const fetchWaitlistUsers = async (programId) => {
    const config = getConfig();
    try {
        const response = await axios.get(`${host}/${programId}/waitlist`, config);
        console.log("프로그램에 따른 대기자 명단 조회 API: ", response)
        return response.data;
    } catch (error) {
        console.error("Failed to fetch registered users:", error);
        throw error;
    }
};
//참가 취소 로직
export const cancelParticipant = async (programId, user) => {
    const config = getConfig();
    try {
        const response = await axios.delete(`${host}/detail/register/cancel/${programId}`, {
            data: user,
            ...config,
        })
        console.log("참가취소 조회: ", response.data)
        return response.data;
    } catch (error) {
        console.error("참가 취소 중 오류 발생 ", error);
        throw error;
    }
}
//대기 취소 로직
export const cancelWaitlist = async (programId, user) => {
    const config = getConfig();
    try {
        const response = await axios.delete(`${host}/detail/waitlist/cancel/${programId}`, {
            data: user,
            ...config
        })
        console.log("대기취소 조회: ", response)
        return response.data;
    } catch (error) {
        console.error("대기 취소 중 오류 발생 ", error);
        throw error;
    }
}




