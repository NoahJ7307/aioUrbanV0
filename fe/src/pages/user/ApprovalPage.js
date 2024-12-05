import React from 'react'
import UserAccessListComponent from '../../components/user/UserApprovalComponent'
import '../../components/facilities/common/css/facilityLayout.css'
const ApprovalPage = () => {
    return (
        <div>
            {/* 배너 섹션 */}
            <div className="banner mb-8"
                style={{
                    // backgroundImage: `url('/images/user.jpg')`,
                    backgroundImage: `url('/images/apt.jpg')`,
                }}>
                <div className="banner-overlay">
                    <h1 className="banner-text">가입 승인</h1>
                </div>
            </div>
            <UserAccessListComponent />
        </div>
    )
}

export default ApprovalPage