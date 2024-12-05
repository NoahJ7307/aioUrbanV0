import React from 'react'
import RegularModifyComponent from '../../components/parking/RegularModifyComponent'

const RegularModifyPage = () => {
    return (
        <div className="container w-9/12 mt-8 mb-8 mx-auto p-6 relative">
        <div className="mb-6 text-center">
            <h2 className="text-3xl font-semibold">정기권 주차 정보 수정</h2>
        </div>
            <RegularModifyComponent />
        </div>
    )
}

export default RegularModifyPage