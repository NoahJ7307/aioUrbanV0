// import GolfList from '../../components/facilities/golf/GolfList'

import { useCallback } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const GolfPage = () => {
    const uno = 3;
    const navigate = useNavigate();
    const handleClickList = useCallback(() => {
        navigate('/facilities/golf/list');
    }, [navigate]);
    const handleClickUserList = useCallback(() => {
        navigate(`/facilities/golf/userlist/${uno}`);
    }, [navigate, uno]);
    const handleClickReserve = useCallback(() => {
        navigate('/facilities/golf/reserve');
    }, [navigate]);
    const handleClickModify = useCallback(() => {
        navigate('/facilities/golf/modify');
    }, [navigate]);
    // const handleClickCancel = useCallback(() => {
    //     navigate('/facilities/golf/cancel');
    // }, [navigate]);


    return (
        <div>
            

            <ul className='flex justify-center space-x-8'>
                <li>
                    <button className="button" onClick={handleClickList}>예약현황 조회</button>
                </li>
                <li>
                    <button className="button" onClick={handleClickReserve}>예약 등록 </button>
                </li>
                <li>
                    <button className="button" onClick={handleClickUserList}>나의 예약 확인</button>
                </li>
                <li>
                    <button className="button" onClick={handleClickModify}>예약 변경</button>
                </li>
                {/* <li>
                    <button className="button" onClick={handleClickCancel}>예약 취소</button>
                </li> */}
            </ul>
            <h1>Golf Facilities</h1>
            <Outlet/>
        </div>
    )
}

export default GolfPage;