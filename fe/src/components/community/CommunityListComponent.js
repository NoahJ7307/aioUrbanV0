import React, { useEffect, useState } from 'react';
import { get } from '../api/communityApi';
import { useNavigate } from 'react-router-dom';
import PageComponent from '../common/PageComponent';
import CommunityCustom from '../hook/CommunityCustom'
// 초기 상태 설정
const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 1
};

const CommunityListComponent = () => {
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [uno, setUno] = useState(); // 로그인한 사용자 uno
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [postsPerPage] = useState(9); // 한 페이지당 게시물 수
    const [serverData, setServerData] = useState(initState); // 페이지네이션 데이터
    const { page, size, moveToList } = CommunityCustom();
    const navigate = useNavigate(); // 페이지 이동 훅


    useEffect(() => {
        get({ page, size })
            .then(data => {
                console.log("받은 데이터:", data); // 데이터 로그
                setServerData(data);
                setLoading(false); // 로딩 상태 업데이트
            })
            .catch(err => {
                console.error("Axios 에러", err);
                setError("데이터를 가져오는 데 실패했습니다."); // 에러 상태 설정
                setLoading(false); // 로딩 상태 업데이트
            });
    }, [page, size]);
    return (
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="w-full md:w-1/2 mb-6 md:mb-0 p-4">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">커뮤니티 게시판</h1>
                    <p className="text-gray-600">Avan APT 소통창구</p>
                </header>

                <div className="mb-4">
                    <h2 className="text-2xl font-semibold mb-2">최근 게시물</h2>
                    {loading ? (
                        <p className="text-gray-700">로딩 중...</p>
                    ) : error ? (
                        <p className="text-red-600">{error}</p>
                    ) : (
                        serverData.dtoList.map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
                                <h3 className="text-xl font-bold">{item.title}</h3>
                                <p className="text-gray-700">{item.content}</p>
                                <span className="text-gray-500 text-sm">
                                    작성자: {item.userName} 작성일: {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                                <ul>
                                    <li>
                                        <button
                                            onClick={() => { navigate('/community/add') }}
                                            disabled={uno !== item.userId}
                                            className={`mb-4 mt-4 mr-3 ml-3 py-1 px-4 ${uno !== item.userId ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'} text-white rounded-lg`}
                                        >
                                            {uno !== item.userId ? '본인확인' : '수정'}
                                        </button>
                                        <button
                                            onClick={() => { console.log("클릭했다") }}
                                            disabled={uno !== item.userId}
                                            className={`mb-4 mt-4 mr-3 ml-3 py-1 px-4 ${uno !== item.userId ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'} text-white rounded-lg`}
                                        >
                                            {uno !== item.userId ? '본인확인' : '삭제'}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ))
                    )}
                </div>
                <PageComponent serverData={serverData} movePage={moveToList} />
            </div>
        </div>
    );
};

export default CommunityListComponent;
