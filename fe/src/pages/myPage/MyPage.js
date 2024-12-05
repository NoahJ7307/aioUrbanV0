import React, { useCallback, useState } from 'react'
import BasicLayout from '../../layout/BasicLayout'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import '../../css/_modules/myPage.css'  
import '../../components/facilities/common/css/facilityLayout.css'

const MyPage = () => {
    const navigate = useNavigate()
    const [checkedRpno, setCheckedRpno] = useState([])
    const [checkedVpno, setCheckedVpno] = useState([])

    const handleClickRegularList = useCallback(() => { navigate({ pathname: 'myInfo' }) })
    const handleClickVisitList = useCallback(() => { navigate({ pathname: 'mileage' }) })
    const handleClickEEList = useCallback(() => { navigate({ pathname: 'facilities' }) })
    const handleClickCommunities = useCallback(() => { navigate({ pathname: 'communities' }) })
    return (
        <BasicLayout>
            <div className="container mt-8 mb-8 mx-auto p-6 bg-white shadow-lg rounded-lg">
                <div className="banner"
                    style={{
                        backgroundImage: `url('/images/mypage2.jpg')`,
                    }}>
                    <div className="banner-overlay">
                        <h1 className="banner-text">마이페이지</h1>
                    </div>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </BasicLayout>
    )
}

export default MyPage