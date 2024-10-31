import React, { useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import BasicLayout from '../../layout/BasicLayout';

const FacilitiesPage = () => {
    const navigate = useNavigate();
    const handleClickGym = useCallback(() => {
        navigate('/facilities/gym');
    }, [navigate]);

    const handleClickGolf = useCallback(() => {
        navigate('/facilities/golf');

    }, [navigate]);

    const handleClickStudy = useCallback(() => {
        navigate('/facilities/study');
    }, [navigate]);
   
    return (
        <BasicLayout>
            <ul className='flex justify-center'>
                <li>
                    <button className='bg-blue-400 p-2' onClick={handleClickGym}>Gym</button>
                </li>
                <li>
                    <button className='bg-blue-400 p-2' onClick={handleClickGolf}>Golf</button>
                </li>
                <li>
                    <button className='bg-blue-400 p-2' onClick={handleClickStudy}>Study</button>
                </li>
                {/* <li>
                    <button className='bg-blue-400 p-2' onClick={handleClickStudy}>My Reservation Page</button>
                </li> */}
            </ul>
            <Outlet />
        </BasicLayout>
    );
};

export default FacilitiesPage