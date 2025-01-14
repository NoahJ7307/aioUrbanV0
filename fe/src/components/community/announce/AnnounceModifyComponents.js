import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import CommunityCustom from '../../hook/CommunityCustom';
import { toast, ToastContainer } from 'react-toastify';
import { getModify, update } from '../../api/community/announceApi';

const AnnounceModifyComponents = () => { // pno는 수정할 게시글의 ID
  const { pno } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uno, setUno] = useState(); // 로그인한 사용자 uno
  const [error, setError] = useState(null); // 에러 상태
  const { page, size, moveToList } = CommunityCustom();
  const navigate = useNavigate(); // 페이지 이동 훅

  useEffect(() => {
    const getUno = localStorage.getItem('uno');
    if (getUno) {
      setUno(Number(getUno));
    } else {
      console.log("로그인 정보가 없습니다.");
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateData = { title, content };
      console.log("update 함수 호출:", { updateData, pno, uno });
      const response = await update(updateData, pno, uno);

      if (!response) {
        console.error("응답이 없습니다.");
        return;
      }

      const result = response.data;
      if (result) {
        window.alert("업데이트 성공!");
        navigate("/communities/announce/list");
      } else {
        console.log("false", result);
      }
    } catch (err) {
      console.error("업데이트 에러", err);
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await getModify(pno);
        console.log(response); // 응답 로그
        if (response) {
          const { title, content } = response; // 필요한 데이터 구조 해체
          setTitle(title); // title 상태 업데이트
          setContent(content); // content 상태 업데이트
        } else {
          console.error("No data found");
        }
      } catch (err) {
        console.error("Failed to fetch post data", err);
      }
    };

    fetchPostData(); // 함수 호출
  }, [pno]);

  return (
    <div className="container mt-8 mb-8 mx-auto p-6 bg-white shadow-lg rounded-lg relative">
      <h2 className="text-2xl font-semibold mb-2 text-center">공지사항 수정</h2> {/* 제목 중앙 정렬 */}
      <div className='bg-gray-100 p-3 justify-center rounded-lg'>
          {error && <p className="text-red-600">{error}</p>}
          <form className="space-y-7" onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="게시물 내용을 작성하세요..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[400px]"
            />
          </form>
       
      </div>
      <button
        onClick={handleUpdate}
          type="submit"
          className="w-full py-2 mt-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          수정하기
        </button>
    </div>
  );
};

export default AnnounceModifyComponents;
