import React, { useEffect, useState } from 'react';
import { get, getModify, post, update } from '../api/communityApi'; // update 함수 import
import { useNavigate, useParams } from 'react-router-dom';
import CommunityCustom from '../hook/CommunityCustom';
import { toast, ToastContainer } from 'react-toastify';


const CommunityModifyComponents = () => { // pno는 수정할 게시글의 ID
  const { pno } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uno, setUno] = useState(); // 로그인한 사용자 uno
  const [error, setError] = useState(null); // 에러 상태
  const { page, size, moveToList } = CommunityCustom();
  const navigate = useNavigate(); // 페이지 이동 훅
  // const [pno, setPno] = useState();



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

      // response가 null인 경우 체크
      if (!response) {
        console.error("응답이 없습니다."); // 응답이 없을 때 처리
        return; // 더 이상 진행하지 않음
      }

      const result = response.data; // 데이터가 존재하는지 체크
      if (result) {
        window.alert("업데이트 성공!"); // 성공 메시지 표시
        navigate("/community/list"); // 업데이트 후 목록 페이지로 이동
      } else {
        console.log("false", result); // result가 falsy한 경우
      }
    } catch (err) {
      console.error("업데이트 에러", err);
    }
  };



  return (
    <div className="w-full md:w-1/2 bg-gray-200 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-2">게시글 수정</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form className="space-y-4" onSubmit={handleUpdate}>
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
          수정하기
        </button>
      </form>
      
    </div>
  );
};

export default CommunityModifyComponents;
