import React from 'react'
import UserModifyComponent from '../../components/user/UserModifyComponent'

const ModifyPage = () => {
    return (
        <div className="container w-9/12 mt-8 mb-8 mx-auto p-6 relative">
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-semibold">주민 정보 수정</h2>
            </div>
            <UserModifyComponent />
        </div>
    )
}

export default ModifyPage