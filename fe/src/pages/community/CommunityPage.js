import React, { useCallback } from 'react'
import BasicLayout from '../../layout/BasicLayout'


import { Outlet, useNavigate } from 'react-router-dom'
import CommunityComponent from '../../components/community/CommunityListComponent'

const CommunityPage = () => {
    const navigate = useNavigate()
    const handleClickList = useCallback(() => { navigate({ pathname: 'list' }) })
    const handleClickannouncement = useCallback(() => { navigate({ pathname: 'announcement' }) })
    return (

        <BasicLayout>
            <ul className='flex justify-center'>

                <button className='m-5 p-2 bg-green-600 rounded-lg' onClick={handleClickList}>
                    게시판
                </button>
                <button className='m-5 p-2 bg-green-600 rounded-lg' onClick={handleClickList}>
                    공지사항
                </button>
                <button className='m-5 p-2 bg-green-600 rounded-lg' onClick={handleClickList}>
                    장터
                </button>
                <button className='m-5 p-2 bg-green-600 rounded-lg' onClick={handleClickList}>
                    생활정보
                </button>
                {/* <CommunityComponent /> */}
            </ul>
            <Outlet />
        </BasicLayout>


    )
}

export default CommunityPage