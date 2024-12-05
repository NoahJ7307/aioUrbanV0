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
  const [modalPosition, setModalPosition] = useState(0);
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
    const scrollPosition = window.pageYOffset;
    setModalPosition(scrollPosition + 200);
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
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-semibold">나의 게시물</h2>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (

            <div key={post.pno} className="container mx-auto p-6 border-2 border-gray-120 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl mb-3">
                    <span className="font-bold mr-2">제목:</span>
                    {post.title}
                  </h3>
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
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div
            className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg mt-10"
            style={{ marginTop: `${modalPosition}px` }}
          >
            {/* 모달 헤더 */}
            <div className="border-b-2 border-gray-200 pb-4 mb-4">
              <h2 className="text-3xl font-bold">게시글 상세보기</h2>
            </div>

            {/* 게시글 정보 */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              {/* 제목 */}
              <div className="mb-4">
                <div className="text-xl font-bold text-gray-700 mb-2">제목</div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  {currentPost.title}
                </div>
              </div>

              {/* 게시글 메타 정보 */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-3 rounded border border-gray-200">
                  <span className="font-semibold">게시글 번호:</span> {currentPost.pno}
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <span className="font-semibold">작성일:</span> {new Date(currentPost.createdAt).toLocaleDateString()}
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <span className="font-semibold">수정일:</span> {new Date(currentPost.modifiedAt || currentPost.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* 게시글 내용 */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="text-xl font-bold text-gray-700 mb-3">내용</div>
                <div className="whitespace-pre-wrap text-gray-700 min-h-[200px]">
                  {currentPost.content}
                </div>
              </div>
            </div>

            {/* 모달 푸터 - 버튼 그룹 */}
            <div className="flex justify-end gap-2 pt-4 border-t-2 border-gray-200">
              <button
                onClick={() => navigate(`/communities/board/modify/${currentPost.pno}`)}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
              >
                <i className="fa-solid fa-edit mr-2"></i>수정
              </button>
              <button
                onClick={() => {
                  handleDelete(currentPost.pno);
                  closeModal();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                <i className="fa-solid fa-trash mr-2"></i>삭제
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                <i className="fa-solid fa-times mr-2"></i>닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBoardPostsComponent;