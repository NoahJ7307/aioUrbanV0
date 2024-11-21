import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyCommunityPosts, deleteChecked as deleteCommunityPost } from '../api/community/communityApi';
import { getMyMarketPosts, deleteChecked as deleteMarketPost } from '../api/community/marketApi';
import "./MyCommunitiesComponent.css"
const MyCommunitiesComponent = () => {
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [myCommunities, setMyCommunities] = useState([]); // 자유게시판 데이터
  const [myMarketPosts, setMyMarketPosts] = useState([]); // 마켓 데이터
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 데이터 가져오기
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const uno = localStorage.getItem('uno'); // 로그인된 사용자 uno
        if (!uno) throw new Error("로그인 정보가 없습니다.");

        // API 호출
        const [communityResponse, marketResponse] = await Promise.all([
          getMyCommunityPosts(uno),
          getMyMarketPosts(uno),
        ]);

        // 상태 업데이트
        setMyCommunities(communityResponse || []); // 데이터가 없으면 빈 배열로
        setMyMarketPosts(marketResponse || []);    // 데이터가 없으면 빈 배열로
        setLoading(false); // 로딩 종료
      } catch (err) {
        console.error("데이터를 불러오는 중 문제가 발생했습니다:", err);
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
        setMyCommunities([]); // 에러 시 빈 배열로 초기화
        setMyMarketPosts([]); // 에러 시 빈 배열로 초기화
        setLoading(false); // 로딩 종료
      }
    };

    fetchMyPosts();
  }, []);

  // 자유게시판 게시글 삭제
  const handleDeleteCommunityPost = async (pno) => {
    try {
      await deleteCommunityPost(pno, localStorage.getItem('uno')); // API 호출
      setMyCommunities((prev) => prev.filter((post) => post.pno !== pno)); // 삭제된 데이터 제거
    } catch (err) {
      console.error("게시글 삭제 중 오류 발생:", err);
    }
  };

  // 마켓 게시글 삭제
  const handleDeleteMarketPost = async (mno) => {
    try {
      await deleteMarketPost(mno, localStorage.getItem('uno')); // API 호출
      setMyMarketPosts((prev) => prev.filter((post) => post.mno !== mno)); // 삭제된 데이터 제거
    } catch (err) {
      console.error("마켓 게시글 삭제 중 오류 발생:", err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">내가 쓴 글</h1>
        <p className="text-gray-600">자유게시판 및 마켓에서 작성한 글</p>
      </header>

      <div className="flex flex-wrap gap-4">
        {/* 자유게시판 */}
        <section className="flex-1 bg-red-500 shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-6">자유게시판</h2>
          <table className="min-w-full table-auto text-sm text-gray-600 bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="w-12 py-3 border">번호</th>
                <th className="w-auto py-3 border">제목</th>
                <th className="w-20 py-3 border">작성일</th>
                <th className="w-20 py-3 border">수정</th>
                <th className="w-20 py-3 border">삭제</th>
              </tr>
            </thead>
            <tbody>
              {myCommunities.length > 0 ? (
                myCommunities.map((post) => (
                  <tr key={post.pno} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border text-center">{post.pno}</td>
                    <td className="py-3 px-4 border">
                      <button
                        onClick={() => navigate(`/communities/board/modify/${post.pno}`)}
                        className="text-blue-600 hover:underline"
                      >
                        {post.title}
                      </button>
                    </td>
                    <td className="py-3 px-4 border text-center">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border text-center">
                      <button
                        onClick={() => navigate(`/communities/board/modify/${post.pno}`)}
                        className="py-1 px-3 rounded-lg bg-blue-500 text-white"
                      >
                        수정
                      </button>
                    </td>
                    <td className="py-3 px-4 border text-center">
                      <button
                        onClick={() => handleDeleteCommunityPost(post.pno)}
                        className="py-1 px-3 rounded-lg bg-red-500 text-white"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">작성한 글이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* 마켓 */}
        <section className="flex-1 bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-6">마켓</h2>
          <table className="min-w-full table-auto text-sm text-gray-600 bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="w-12 py-3 border">번호</th>
                <th className="w-auto py-3 border">제목</th>
                <th className="w-20 py-3 border">작성일</th>
                <th className="w-20 py-3 border">수정</th>
                <th className="w-20 py-3 border">삭제</th>
              </tr>
            </thead>
            <tbody>
              {myMarketPosts.length > 0 ? (
                myMarketPosts.map((post) => (
                  <tr key={post.mno} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border text-center">{post.mno}</td>
                    <td className="py-3 px-4 border">
                      <button
                        onClick={() => navigate(`/communities/market/modify/${post.mno}`)}
                        className="text-blue-600 hover:underline"
                      >
                        {post.title}
                      </button>
                    </td>
                    <td className="py-3 px-4 border text-center">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border text-center">
                      <button
                        onClick={() => navigate(`/communities/market/modify/${post.mno}`)}
                        className="py-1 px-3 rounded-lg bg-blue-500 text-white"
                      >
                        수정
                      </button>
                    </td>
                    <td className="py-3 px-4 border text-center">
                      <button
                        onClick={() => handleDeleteMarketPost(post.mno)}
                        className="py-1 px-3 rounded-lg bg-red-500 text-white"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">작성한 글이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default MyCommunitiesComponent;
