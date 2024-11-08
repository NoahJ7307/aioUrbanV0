import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getGymListByProgramId, modifyPost } from '../../api/facilities/gymApi';
import useCustom from '../../hook/useCustom';

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
    participantLimit: '',
    price: '',

  });
  const { programId } = useParams();
  const navigate = useNavigate();
  const { page, size } = useCustom()
  //URL 쿼리에서 page와 size가져오기




  useEffect(() => {
    if (programId) {
      console.log('programId', programId)
      getGymListByProgramId({ programId })
        .then((data) => {
          setFormData({
            title: data.title,
            content: data.content || '',
            target: data.target || '',
            programStartDate: data.programStartDate || '',
            programEndDate: data.programEndDate || '',
            programStartTime: data.programStartTime || '',
            programEndTime: data.programEndTime || '',
            applicationStartDate: data.applicationStartDate || '',
            applicationEndDate: data.applicationEndDate || '',
            participantLimit: data.participantLimit || '',
            price: data.price || '',

          })
        })
        .catch((error) => {
          console.error("Error fetching program: ", error);
          alert('Failed to load program data.')
        })
    }
  }, [programId])

  const handleModify = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('예약 id : ', programId)
    console.log('수정 id', programId, formData)
    try {
      await modifyPost(programId, formData);
      alert('프로그램이 수정되었습니다.');
      navigate(`/facilities/gym/detail/${programId}?page=${page}&size=${size}`, { state: { gym: { programId, ...formData } } });
    } catch (error) {
      console.error('수정중 오류발생', error)
      alert('오류발생함')
    }
  }

  

  return (

    <div>
      <h2>프로그램 세부정보</h2>
      <form onSubmit={handleSubmit}>
        <h3>프로그램 명:
          <input
            type="text"
            name="title"
            value={formData.title || ''}
            onChange={handleModify}
            required
          />
        </h3>
        <p>세부내용:
          <input
            type="text"
            name="content"
            value={formData.content || ''}
            onChange={handleModify}
            required
          />
        </p>
        <p>대상:
          <input
            type="text"
            name="target"
            value={formData.target || ''}
            onChange={handleModify}
            required
          />
        </p>
        <p>
          모집정원:
          <input
            type={'number'}
            name="participantLimit"
            value={formData.participantLimit || ''}
            onChange={handleModify}
            required
          />명
        </p>
        <p>
          진행 기간:
          <input
            type="date"
            name="programStartDate"
            value={formData.programStartDate || ''}
            onChange={handleModify}
            required
          /> ~
          <input
            type="date"
            name="programEndDate"
            value={formData.programEndDate || ''}
            onChange={handleModify}
            required
          />
        </p>
        <p>
          진행 시간:
          <input
            type="time"
            name="programStartTime"
            value={formData.programStartTime || ''}
            onChange={handleModify}
            required
          /> ~
          <input
            type="time"
            name="programEndTime"
            value={formData.programEndTime || ''}
            onChange={handleModify}
            required
          />
        </p>
        <p>
          접수 기간:
          <input
            type="datetime-local"
            name="applicationStartDate"
            value={formData.applicationStartDate || ''}
            onChange={handleModify}
            required
          /> ~
          <input
            type="datetime-local"
            name="applicationEndDate"
            value={formData.applicationEndDate || ''}
            onChange={handleModify}
            required
          />
        </p>
        <p>
          금액(마일리지,포인트중에 결정하고 마저 구현할것):
          <input
            type={'number'}
            name="price"
            value={formData.price || ''}
            onChange={handleModify}
            required
          />원
        </p>
      </form>
      <button type='button'
        onClick={handleSubmit}>
        저장
      </button>
    </div>
  )
}


export default GymModify