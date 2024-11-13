// import GymList from '../../components/facilities/gym/GymList'

import { useCallback } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const GymPage = () => {
    const navigate = useNavigate();
    const handleClickList = useCallback(() => {
        navigate('/facilities/gym/list');
    }, [navigate]);
    const handleClickReserve = useCallback(() => {
        navigate('/facilities/gym/signup');
    }, [navigate]);
    const handleClickModify = useCallback(() => {
        navigate('/facilities/gym/membershipState');
    }, [navigate]);
    // const handleClickCancel = useCallback(() => {
    //     navigate('/facilities/gym/cancel');
    // }, [navigate]);




    return (
        <div>
          

            <ul className='flex justify-center space-x-8'>

                <li>
                    <button className="button" onClick={handleClickList}>프로그램 조회</button>
                </li>
                <li>
                    <button className="button" onClick={handleClickReserve}>이용권 등록 </button>
                </li>
                <li>
                    <button className="button" onClick={handleClickModify}>이용권 변경</button>
                </li>
                {/* <li>
                    <button className="button" onClick={handleClickCancel}>이용권 취소</button>
                </li> */}

            </ul>
            <h1>Gym Facilities</h1>
            <Outlet/>
        </div>
    )
}

export default GymPage;