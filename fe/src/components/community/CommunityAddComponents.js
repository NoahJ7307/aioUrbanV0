import React, { useState } from 'react'
import { post } from '../api/communityApi';

const CommunityAddComponents = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uno, setUno] = useState(); // 로그인한 사용자 uno

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = { title, content }; // uno를 포함하지 않음
      await post(postData, uno); // uno를 쿼리 파라미터로 전달
      setTitle('');
      setContent('');
      // 추가: 새 데이터 가져오기 로직 추가 필요할 수 있음
    } catch (err) {
      console.error('게시물 등록 실패:', err);
    }
  };

  return (
    <div className="w-full md:w-1/2 bg-gray-200 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-2">자유게시판</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="게시물 내용을 작성하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          등록하기
        </button>
      </form>
    </div>
  );
};


export default CommunityAddComponents