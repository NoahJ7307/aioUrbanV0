import React from 'react'
import MyInfoComponent from '../../components/myPage/MyInfoComponent'

const MyInfoPage = () => {
    return (

        <div className="container mx-auto px-4 py-8">
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-semibold">내 정보</h2>
            </div>
            <MyInfoComponent />
        </div>
    )
}

export default MyInfoPage