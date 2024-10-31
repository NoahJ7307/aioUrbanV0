import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import CommunityCustom from '../../hook/CommunityCustom';

import { deleteChecked, get } from '../../api/community/announceApi';
import PageComponent from '../../common/PageComponent';


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

const AnnounceListComponent = () => {
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [uno, setUno] = useState(); // 로그인한 사용자 uno
    const [serverData, setServerData] = useState(initState); // 서버 데이터 상태
    const [showModal, setShowModal] = useState(false); // 모달 상태
    const [currentPost, setCurrentPost] = useState(null); // 현재 모달에 표시할 게시물
    const { page, size, moveToList } = CommunityCustom(); // 페이지 이동 훅
    const navigate = useNavigate(); // 페이지 이동 훅
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const getUno = localStorage.getItem('uno');
        if (getUno) {
            console.log("로그인 데이터 정보" + getUno+"여기는 공지사항 리스트 입니다.")
            setUno(Number(getUno));
        } else {
            console.log("로그인 정보가 없습니다.");
        }
    }, []);
    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        console.log(storedRole)
        if (storedRole) {
            
            setUserRole(storedRole);
        }
    },[])

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

    const handleDelete = async (pno) => {
        try {
            const result = await deleteChecked(pno, uno);
            if (result) {
                const updatedList = serverData.dtoList.filter(item => item.pno !== pno);
                setServerData(prevData => ({
                    ...prevData,
                    dtoList: updatedList
                }));
                console.log("삭제 성공");
            }
        } catch {
            console.error("삭제 에러", error);
        }
    };

    const openModal = (post) => {
        setCurrentPost(post);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentPost(null);
    };

    return (
        <div className="max-w-7xl mx-auto mt-8 p-4">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold">공지사항</h1>
             
            </header>

            <table className="min-w-full table-auto text-sm text-gray-600 bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200 text-gray-800">
                        <th className="w-12 py-3 border">번호</th>
                        <th className="w-auto py-3 border">제목</th>
                        <th className="w-20 py-3 border">글쓴이</th>
                        <th className="w-36 py-3 border">작성시간</th>
                        <th className="w-32 py-3 border">수정</th>
                        <th className="w-32 py-3 border">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">로딩 중...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan="6" className="text-center text-red-600 py-4">{error}</td>
                        </tr>
                    ) : (
                        serverData.dtoList.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-3 px-4 border text-center">{item.pno}</td>
                                <td className="py-3 px-4 border">
                                    <button
                                        onClick={() => openModal(item)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {item.title}
                                    </button>
                                </td>
                                <td className="py-3 px-4 border text-center">{item.userName}</td>
                                <td className="py-3 px-4 border text-center">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </td>

                                {/* 수정 버튼 */}
                                <td className="py-3 px-4 border text-center">
                                    <button
                                        onClick={() => { navigate(`/communities/announce/modify/${item.pno}`); }}
                                        disabled={!(userRole === 'ADMIN' || userRole === 'ROOT' || uno === item.userId)}
                                        className={`py-1 px-3 rounded-lg ${!(userRole === 'ADMIN' || userRole === 'ROOT' || uno === item.userId)
                                                ? 'bg-gray-300 cursor-not-allowed'
                                                : 'bg-blue-500 text-white'
                                            }`}
                                    >
                                        {!(userRole === 'ADMIN' || userRole === 'ROOT' || uno === item.userId) ? '권한없음' : '수정'}
                                    </button>
                                </td>

                                {/* 삭제 버튼 */}
                                <td className="py-3 px-4 border text-center">
                                    <button
                                        onClick={() => { handleDelete(item.pno); }}
                                        disabled={!(userRole === 'ADMIN' || userRole === 'ROOT' || uno === item.userId)}
                                        className={`py-1 px-3 rounded-lg ${!(userRole === 'ADMIN' || userRole === 'ROOT' || uno === item.userId)
                                                ? 'bg-gray-300 cursor-not-allowed'
                                                : 'bg-blue-500 text-white'
                                            }`}
                                    >
                                        {(userRole === 'ADMIN' || userRole === 'ROOT' || uno === item.userId) ? '삭제' : '권한없음'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                {(userRole === 'ADMIN' || userRole==='ROOT' )&&(
                    <button
                        onClick={() => { navigate('/communities/announce/add'); }}
                        className="bg-blue-500 text-white py-1 px-4 rounded-lg"
                    
                    >
                        글쓰기
                    </button>
                )}
                <PageComponent serverData={serverData} movePage={moveToList} />
            </div>


            {/* 모달 */}
            {showModal && currentPost && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full md:w-1/2 bg-gray-200 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">게시물 상세</h2>
                        <table className="min-w-full text-sm text-gray-600 bg-white shadow-md rounded-lg mb-4">
                            <tbody>
                                <tr>
                                    <td className="py-3 px-4 border">번호</td>
                                    <td className="py-3 px-4 border text-center">{currentPost.pno}</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 border">제목</td>
                                    <td className="py-3 px-4 border text-center">{currentPost.title}</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 border">글쓴이</td>
                                    <td className="py-3 px-4 border text-center">{currentPost.userName}</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 border">작성일</td>
                                    <td className="py-3 px-4 border text-center">
                                        {new Date(currentPost.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="border p-4 bg-gray-100 text-gray-700">
                            <h3 className="font-semibold">내용</h3>
                            <p>{currentPost.content}</p>
                        </div>
                        <div className="text-right mt-4">
                            <button
                                onClick={closeModal}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AnnounceListComponent;
