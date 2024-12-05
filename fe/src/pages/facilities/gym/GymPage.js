// import GymList from '../../components/facilities/gym/GymList'

import { useCallback } from "react";
import {  Outlet, useNavigate } from "react-router-dom";
import '../../../css/facility/facilitySidebar.css'; // CSS 파일 import

const GymPage = () => {
    const role = localStorage.getItem("role")

    const navigate = useNavigate();
    const handleClickList = useCallback(() => {
        navigate('/facilities/gym/list');
    }, [navigate]);
    const handleClickReserve = useCallback(() => {
        navigate('/facilities/gym/membership');
    }, [navigate]);
    const handleClickMyPage = useCallback((uno) => {
        navigate(`/myPage/facilities/gym`);
    }, [navigate]);
    const handleClickCreate = useCallback(() => {
        navigate('/facilities/gym/membership/create');
    }, [navigate]);



    return (
        <div className="flex">
            <div className="facilitySidebar">
                <h2>헬스장 이용하기</h2>
                <ul>
                    <li>
                        <button
                            className="facilitySidebar-button"
                            onClick={handleClickList}
                        >
                            프로그램
                        </button>
                    </li>
                    <li>
                        <button
                            className="facilitySidebar-button"
                            onClick={handleClickReserve}
                        >
                            이용권 구매
                        </button>
                    </li>
                    <li>
                        <button
                            className="facilitySidebar-button"
                            onClick={handleClickMyPage}
                        >
                            나의신청내역
                        </button>
                    </li>
                    {(role === 'ADMIN' || role === 'ROOT') &&
                        <li>
                            <button
                                className="facilitySidebar-button"
                                onClick={handleClickCreate}
                            >
                                이용권 등록
                            </button>
                        </li>
                    }


                </ul>
            </div>
            <div className="facilityMain-content">
                <Outlet />
            </div>
        </div>
    )
}

export default GymPage;