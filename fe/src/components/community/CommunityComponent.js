import React, { useEffect, useState } from 'react';
import { get } from '../api/communityApi';


const CommunityComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await get(data.uno); // 게시물 데이터를 가져옵니다.
                console.log('커뮤니티 목록', res);
                setData(res);
            } catch (err) {
                console.error('데이터 로드 실패:', err);
                setError('게시물을 불러오는 데 오류가 발생했습니다.');
            } 
        };

        fetchData();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">커뮤니티 게시판</h1>
                <p className="text-gray-600">Avan APT 소통창구</p>
            </header>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">오늘의 한마디</h2>
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="제목"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="게시물 내용을 작성하세요..."
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        게시하기
                    </button>
                </form>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-2">최근 게시물</h2>
                {loading ? (
                    <p className="text-gray-700">로딩 중...</p> // 로딩 중 메시지
                ) : error ? (
                    <p className="text-red-600">{error}</p> // 에러 메시지
                ) : (
                    data.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
                            <h3 className="text-xl font-bold">{item.title}</h3>
                            <p className="text-gray-700">{item.content}</p>
                            <span className="text-gray-500 text-sm">{ new Date(item.creatAt+'T00:00:00').toLocaleDateString()}</span> {/* 작성일 */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommunityComponent;
