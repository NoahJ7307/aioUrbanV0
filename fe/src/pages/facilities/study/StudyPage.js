// import StudyList from '../../components/facilities/study/StudyList'

import { Outlet, useNavigate } from "react-router-dom";
import '../facilitiesPage.css';
import { useCallback } from "react";

const StudyPage = () => {
    const navigate = useNavigate();

    const handleClickList = useCallback(() => {
        navigate('/facilities/study/list');
    }, [navigate]);
    const handleClickReserve = useCallback(() => {
        navigate('/facilities/study/reserve');
    }, [navigate]);
    const handleClickModify = useCallback(() => {
        navigate('/facilities/study/modify');
    }, [navigate]);
    const handleClickCancel = useCallback(() => {
        navigate('/facilities/study/cancel');
    }, [navigate]);




    return (
        <div>
            
            <ul className='flex justify-center space-x-8'>

                <li>
                    <button className="button" onClick={handleClickList}>예약현황 조회</button>
                </li>
                <li>
                    <button className="button"  onClick={handleClickReserve}>예약 등록 </button>
                </li>
                <li>
                    <button className="button" onClick={handleClickModify}>예약 변경</button>
                </li>
                <li>
                    <button className="button" onClick={handleClickCancel}>예약 취소</button>
                </li>
            </ul>
            <h1>Study Facilities</h1>
            <Outlet/>
        </div>
    )
}

export default StudyPage;