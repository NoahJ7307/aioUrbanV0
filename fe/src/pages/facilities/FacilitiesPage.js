import React, { useCallback } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BasicLayout from '../../layout/BasicLayout';
import FacilitySchedule from '../../components/facilities/FacilitySchedule';

const FacilitiesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // const handleClickGym = useCallback(() => {
    //     navigate('/facilities/gym');
    // }, [navigate]);

    // const handleClickGolf = useCallback(() => {
    //     navigate('/facilities/golf');

    // }, [navigate]);

    // const handleClickStudy = useCallback(() => {
    //     navigate('/facilities/study');
    // }, [navigate]);
   
    return (
        <BasicLayout>
            
             {/* 현재 경로가 /facilities 일 때만 FacilitySchedule 표시 */}
             {location.pathname === '/facilities' && <FacilitySchedule/>}
            <Outlet />
        </BasicLayout>
    );
};

export default FacilitiesPage