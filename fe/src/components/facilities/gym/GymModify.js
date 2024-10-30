import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getGymListByProgramId, modifyPost } from '../../api/facilities/gymApi';
import { collapseToast } from 'react-toastify';

const GymModify = () => {
  const [formData, setFormData] = useState({
    content: '',
    target: '',
    programStartDate: '',
    programEndDate: '',
    programStartTime: '',
    programEndTime: '',
    applicationStartDate: '',
    applicationEndDate: '',
    price: '',

  });
  const { programId } = useParams();
  const navigate = useNavigate();
  //URL 쿼리에서 page와 size가져오기


  //1030여기부터 다시 수정할때 기존정보 안불려짐
  //   useEffect(() => {
  //     const fetchData = async () => {
  //         const response = await fetch(`/api/gym/detail/modify/${programId}`);
  //         const data = await response.json();
  //         setFormData(data); // 가져온 데이터를 상태에 저장
  //     };

  //     fetchData();
  // }, [programId]);

  // useEffect(() => {
  //   if (programId) {
  //     console.log('programId', programId)
  //     getGymListByProgramId(programId)
  //       .then((data) => {
  //         setFormData({
  //           content: data.content,
  //           target: data.target,
  //           programStartDate: data.programStartDate,
  //           programEndDate: data.programEndDate,
  //           programStartTime: data.programStartTime,
  //           programEndTime: data.programEndTime,
  //           applicationStartDate: data.applicationStartDate,
  //           applicationEndDate: data.applicationEndDate,
  //           price: data.price,

  //         })
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching program: ", error);
  //         alert('Failed to load program data.')
  //       })
  //   }
  // }, [programId])

  const handleModify = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('예약 id : ', programId)
    console.log('수정 id', formData)
    try {
      await modifyPost(programId, formData);
      alert('프로그램이 수정되었습니다.');
      navigate(`/gym/detail/${programId}`);
    } catch (error) {
      console.error('수정중 오류발생', error)
      alert('오류발생함')
    }
  }

  return (

    <div>
      <h2>프로그램 세부정보</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleModify}
          required
        />
        <div>
          <label>프로그램 명</label>
          <input type="text" name="title" value={formData.date} onChange={handleModify} required />
        </div>
        <div>
          <label>프로그램 명</label>
          <input type="text" name="title" value={formData.date} onChange={handleModify} required />
        </div>


      </form>
      {/* <h3>프로그램 명: {gym.title}</h3>
      <p>세부내용: {gym.content}</p>
      <p>대상: {gym.target}</p>
      <p>진행 기간: {gym.programStartDate} ~ {gym.programEndDate} </p>
      <p>진행 시간 : {gym.programStartTime} ~ {gym.programEndTime}</p>
      <p>접수 기간: {gym.applicationStartDate} ~ {gym.applicationEndDate}</p>
      <p>금액</p> */}

    </div>
  )
}


export default GymModify