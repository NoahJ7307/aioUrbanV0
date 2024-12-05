import React from 'react'
import RegularAddComponent from '../../components/parking/RegularAddComponent'

const RegularAddPage = () => {
    return (
        <div className="container w-9/12 mt-8 mb-8 mx-auto p-6 relative">
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-semibold">정기권 주차 등록</h2>
            </div>
            <RegularAddComponent />
        </div>
    )
}

export default RegularAddPage