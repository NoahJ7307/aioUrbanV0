import React, { useEffect, useState } from 'react';
import { deleteChecked, get } from '../../api/community/marketApi';
import { useNavigate } from 'react-router-dom';
import PageComponent from '../../common/PageComponent';
import CommunityCustom from '../../hook/CommunityCustom';

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

const MarketListComponents = () => {
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [uno, setUno] = useState(); // 로그인한 사용자 uno
    const [serverData, setServerData] = useState(initState); // 서버 데이터 상태
    const [showModal, setShowModal] = useState(false); // 모달 상태
    const [currentPost, setCurrentPost] = useState(null); // 현재 모달에 표시할 게시물
    const { page, size, moveToList } = CommunityCustom(); // 페이지 이동 훅
    const navigate = useNavigate(); // 페이지 이동 훅

    useEffect(() => {
        const getUno = localStorage.getItem('uno');
        console.log(getUno,)
        if (getUno) {
            setUno(Number(getUno));
        } else {
            console.log("로그인 정보가 없습니다.");
        }
    }, []);

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

    const handleDelete = async (mno) => {
        try {
            const result = await deleteChecked(mno, uno);
            if (result) {
                const updatedList = serverData.dtoList.filter(item => item.mno !== mno);
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
                <h1 className="text-3xl font-bold">마켓 리스트</h1>
                <p className="text-gray-600">Avan APT 마켓</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-3 text-center py-4">로딩 중...</div>
                ) : error ? (
                    <div className="col-span-3 text-center text-red-600 py-4">{error}</div>
                ) : (
                    serverData.dtoList.map((item, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <img
                                src={item.thumbnailUrl}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">상품명:{item.title}</h2>
                                <p className="text-gray-600">가격: {item.price} 원</p>
                                <p className="text-gray-500">판매자: {item.userName}</p>
                                <button
                                    onClick={() => openModal(item)}
                                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                                >
                                    상세보기
                                </button>
                                <div className="flex justify-between mt-2">
                                    <button
                                        onClick={() => { navigate(`/communities/market/modify/${item.mno}`); }}
                                        disabled={uno !== item.userId}
                                        className={`py-1 px-3 rounded-lg ${uno !== item.userId ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                                    >
                                        {uno !== item.userId ? '본인확인' : '수정'}
                                    </button>
                                    <button
                                        onClick={() => { handleDelete(item.mno); }}
                                        disabled={uno !== item.userId}
                                        className={`py-1 px-3 rounded-lg ${uno !== item.userId ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                                    >
                                        {uno !== item.userId ? '본인확인' : '삭제'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => { navigate('/communities/market/add'); }}
                    className="bg-blue-500 text-white py-1 px-4 rounded-lg"
                >
                    상품 등록
                </button>

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
                                    <td className="py-3 px-4 border text-center">{currentPost.mno}</td>
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

export default MarketListComponents;
