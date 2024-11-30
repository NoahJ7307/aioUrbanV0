// import StudyList from '../../components/facilities/study/StudyList'

import { useCallback } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import '../../../css/facility/facilitySidebar.css'; // CSS 파일 import
import FacilitySchedule from "../../../components/facilities/FacilitySchedule";

const StudyPage = () => {

    const navigate = useNavigate();
    const handleClickList = useCallback(() => {
        navigate('/facilities/study/list');
    }, [navigate]);
    const handleClickReserve = useCallback(() => {
        navigate('/facilities/study/reserve');
    }, [navigate]);
    const handleClickMyPage = useCallback(() => {
        navigate('/myPage/facilities/study');
    }, [navigate]); //나중에 마이페이지 구현후 링크 연동 



    return (
        <div className="flex">
            <div className="facilitySidebar">
                <h2>독서실 이용하기</h2>

                <ul>
                    <li>
                        <button
                            className="facilitySidebar-button"
                            onClick={handleClickList}
                        >
                            예약현황
                        </button>
                    </li>
                    <li>
                        <button
                            className="facilitySidebar-button"
                            onClick={handleClickReserve}
                        >
                            예약 등록
                        </button>
                    </li>
                    <li>
                        <button
                            className="facilitySidebar-button"
                            onClick={handleClickMyPage}
                        >
                            나의 예약
                        </button>
                    </li>

                </ul>
            </div>
            <div className="facilityMain-content">
            {/* {location.pathname === '/facilities/study' && <FacilitySchedule/>} */}

                <Outlet />
            </div>
        </div>

    )
}

export default StudyPage;