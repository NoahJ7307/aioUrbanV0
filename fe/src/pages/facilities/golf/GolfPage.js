import { useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import '../../../css/facility/facilitySidebar.css'; // CSS 파일 import

const GolfPage = () => {

    const navigate = useNavigate();

    const handleClickList = useCallback(() => {
        navigate('/facilities/golf/list');
    }, [navigate]);

    const handleClickReserve = useCallback(() => {
        navigate('/facilities/golf/reserve');
    }, [navigate]);

    const handleClickMyPage = useCallback(() => {
        navigate(`/myPage/facilities/golf`);
    }, [navigate]); // 나중에 마이페이지 구현 후 링크 연동


    return (
        <div className="flex">
            {/* Left Sidebar */}
            <div className="facilitySidebar">
                <h2>골프장 이용하기</h2>
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

            {/* Main content */}
            <div className="facilityMain-content">
                <Outlet />
            </div>
        </div>
    );
};

export default GolfPage;
