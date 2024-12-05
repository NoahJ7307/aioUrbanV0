import React from 'react'
import UserAddComponent from '../../components/user/UserAddComponent'
import '../../components/facilities/common/css/facilityLayout.css'

const AddPage = () => {
    return (
        <div>
            {/* 배너 섹션 */}
            <div className="banner mb-8"
                style={{
                    // backgroundImage: `url('/images/people.jpg')`,
                    backgroundImage: `url('/images/apt.jpg')`,
                }}>
                <div className="banner-overlay">
                    <h1 className="banner-text">주민 등록</h1>
                </div>
            </div>
            <UserAddComponent />
        </div>
    )
}

export default AddPage