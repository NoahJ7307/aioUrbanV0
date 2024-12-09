import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteChecked, getMyMarketPosts } from '../../api/community/marketApi';
import Loading from '../../common/Loading';


const MyMarketPostsComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const [modalPosition, setModalPosition] = useState(0);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const uno = localStorage.getItem('uno');
        if (!uno) throw new Error("로그인 정보가 없습니다.");
        const response = await getMyMarketPosts(uno);
        setPosts(response || []);
      } catch (err) {
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (mno) => {
    try {
      const uno = localStorage.getItem('uno');
      await deleteChecked(mno, uno);
      setPosts(posts.filter(post => post.mno !== mno));
      alert("삭제되었습니다.");
    } catch (err) {
      console.error("삭제 중 오류 발생:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const openModal = (post) => {
    setCurrentPost(post);
    setCurrentImageIndex(0);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentPost(null);
  };

  const handleNextImage = () => {
    if (currentPost && currentPost.imageUrls) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % currentPost.imageUrls.length
      );
    }
  };

  const handlePrevImage = () => {
    if (currentPost && currentPost.imageUrls) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex - 1 + currentPost.imageUrls.length) % currentPost.imageUrls.length
      );
    }
  };

  if (loading) return  <Loading />;
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-semibold">장터</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((item) => (
            <div key={item.mno} className="container mx-auto p-6 border-2 border-gray-120 rounded-lg">
              <div className="aspect-w-16 aspect-h-9">
                {item.thumbnailUrl ? (
                  <img
                    src={`http://localhost:8080${item.thumbnailUrl}`}
                    alt={item.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => openModal(item)}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">이미지 없음</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 cursor-pointer hover:text-blue-600"
                  onClick={() => openModal(item)}>
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-2">{item.price?.toLocaleString()}원</p>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => openModal(item)}
                    className="flex-1 bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 transition-colors"
                  >
                    상세보기
                  </button>
                  <button
                    onClick={() => navigate(`/communities/market/modify/${item.mno}`)}
                    className="flex-1 bg-indigo-500 text-white px-3 py-1.5 rounded hover:bg-indigo-600 transition-colors"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(item.mno)}
                    className="flex-1 bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            작성한 마켓 게시글이 없습니다.
          </div>
        )}
      </div>

      {/* 상세보기 모달 */}
      {showModal && currentPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-auto bg-gray-200 p-6 rounded-lg shadow-lg">
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
                  <td className="py-3 px-4 border">가격</td>
                  <td className="py-3 px-4 border text-center">{currentPost.price?.toLocaleString()}원</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border">작성일</td>
                  <td className="py-3 px-4 border text-center">
                    {new Date(currentPost.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="border p-4 bg-gray-100 text-gray-700 mb-4">
              <h3 className="font-semibold mb-2">내용</h3>
              <p>{currentPost.content}</p>
            </div>

            {currentPost.imageUrls && currentPost.imageUrls.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">상품 이미지</h3>
                <div className="relative">
                  <img
                    src={`http://localhost:8080${currentPost.imageUrls[currentImageIndex]}`}
                    alt="상품 이미지"
                    className="w-full h-auto rounded-lg"
                  />
                  {currentPost.imageUrls.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l"
                      >
                        &#10094;
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r"
                      >
                        &#10095;
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-4 flex overflow-x-auto">
                  {currentPost.imageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8080${url}`}
                      alt={`썸네일 ${index + 1}`}
                      className={`w-24 h-24 object-cover rounded-lg cursor-pointer m-1 ${currentImageIndex === index ? 'border-2 border-blue-500' : ''
                        }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="text-right mt-4">
              <button
                onClick={() => navigate(`/communities/market/chat/${currentPost.mno}`)}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 mr-2"
              >
                1:1 대화
              </button>
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

export default MyMarketPostsComponent;