import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyAnnouncePosts, deleteChecked } from '../../api/community/announceApi';

const MyAnnouncePostsComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const uno = localStorage.getItem('uno');
        if (!uno) throw new Error("로그인 정보가 없습니다.");
        const response = await getMyAnnouncePosts(uno);
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
      await deleteChecked(pno, localStorage.getItem('uno'));
      setPosts(posts.filter(post => post.pno !== pno));
    } catch (err) {
      console.error("삭제 중 오류 발생:", err);
    }
  };

  if (loading) return <div className="text-center py-8">로딩 중...</div>;
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">내가 쓴 공지사항</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.pno} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.pno}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => navigate(`/communities/announce/modify/${post.pno}`)}
                      className="py-1 px-3 rounded-lg bg-blue-500 text-white m-3"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(post.pno)}
                      className="py-1 px-3 rounded-lg bg-red-500 text-white"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  작성한 글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAnnouncePostsComponent;