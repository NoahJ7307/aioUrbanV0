import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteChecked, getMyCommunityPosts } from '../../api/community/communityApi';


const MyBoardPostsComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const uno = localStorage.getItem('uno');
        if (!uno) throw new Error("로그인 정보가 없습니다.");
        const response = await getMyCommunityPosts(uno);
        setPosts(response || []);
      } catch (err) {
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (pno) => {
    try {
      const uno = localStorage.getItem('uno');
      await deleteChecked(pno, uno);
      setPosts(posts.filter(post => post.pno !== pno));
      alert("삭제되었습니다.");
    } catch (err) {
      console.error("삭제 중 오류 발생:", err);
      alert("삭제 중 오류가 발생했습니다.");
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

  if (loading) return <div className="text-center py-8">로딩 중...</div>;
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">내가 쓴 자유게시판 글</h1>
      <div className="grid grid-cols-1 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.pno} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-3">
                    {post.title}
                  </h3>
                  <div className="text-sm text-gray-500">
                    <span>게시글 번호: {post.pno}</span>
                    <span className="mx-2">•</span>
                    <span>작성일: {new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(post)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    상세보기
                  </button>
                  <button
                    onClick={() => navigate(`/communities/board/modify/${post.pno}`)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(post.pno)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
            작성한 글이 없습니다.
          </div>
        )}
      </div>

      {/* 상세보기 모달 */}
      {showModal && currentPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full md:w-2/3 max-h-[90vh] overflow-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">{currentPost.title}</h2>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>게시글 번호: {currentPost.pno}</span>
                <span>작성일: {new Date(currentPost.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3">내용</h3>
                <div className="whitespace-pre-wrap text-gray-700">
                  {currentPost.content}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => navigate(`/communities/board/modify/${currentPost.pno}`)}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
              >
                수정
              </button>
              <button
                onClick={() => {
                  handleDelete(currentPost.pno);
                  closeModal();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                삭제
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
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

export default MyBoardPostsComponent;