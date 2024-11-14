import React, { useCallback, useState } from 'react'
import BasicLayout from '../../layout/BasicLayout'
import { Outlet, useNavigate } from 'react-router-dom'
import '../../css/_modules/myPage.css'

const MyPage = () => {
    const navigate = useNavigate()
    const [checkedRpno, setCheckedRpno] = useState([])
    const [checkedVpno, setCheckedVpno] = useState([])

    const handleClickRegularList = useCallback(() => { navigate({ pathname: 'myInfo' }) })
    const handleClickVisitList = useCallback(() => { navigate({ pathname: 'mileage' }) })
    const handleClickEEList = useCallback(() => { navigate({ pathname: 'facilities' }) })

    return (
        <BasicLayout>
            <div className="myPageContainer">
                <div className="sidebarMenu">
                    <ul className="sidebarList">
                        <li>
                            <button className="sidebarButton" onClick={handleClickRegularList}>
                                내정보
                            </button>
                        </li>
                        <li>
                            <button className="sidebarButton" onClick={handleClickVisitList}>
                                마일리지
                            </button>
                        </li>
                        <li>
                            <button className="sidebarButton" onClick={handleClickEEList}>
                                예약현황
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="contentArea">
                    <Outlet />
                </div>
            </div>
        </BasicLayout>
    )
}

export default MyPage