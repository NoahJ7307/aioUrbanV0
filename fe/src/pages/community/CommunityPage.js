import React, { useCallback } from 'react';
import BasicLayout from '../../layout/BasicLayout';
import { Outlet, useNavigate } from 'react-router-dom';

const CommunityPage = () => {
    const navigate = useNavigate();
    const handleClickList = useCallback(() => { navigate({ pathname: 'board' }) });
    const handleClickCommunityAnnouncementPage = useCallback(() => { navigate({ pathname: 'announce' }) });
    const handleClickMarketPage = useCallback(() => { navigate({ pathname: 'market' }) });
    const handleClickLifeInfoPage = useCallback(() => { navigate({ pathname: 'info' }) });

    return (
        <BasicLayout>
            <ul className='flex justify-center'>
                <button className='m-5 p-2 bg-green-600 rounded-lg' onClick={handleClickList}>
                    게시판
                </button>
                <button className='m-5 p-2 bg-green-600 rounded-lg' onClick={handleClickCommunityAnnouncementPage}>
                    공지사항
                </button>
                <button className='m-5 p-2 bg-green-600 rounded-lg' onClick={handleClickMarketPage}>
                    장터
                </button>
                <button className='m-5 p-2 bg-green-600 rounded-lg' onClick={handleClickLifeInfoPage}>
                    생활정보
                </button>
            </ul>
            <Outlet />
        </BasicLayout>
    );
};

export default CommunityPage;
