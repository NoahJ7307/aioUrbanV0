import React, { useState } from 'react'
import BasicLayout from '../../layout/BasicLayout'
import { Outlet } from 'react-router-dom'
import '../../css/public/public.css'

const UserPage = () => {
    const [checkedUno, setCheckedUno] = useState([])

    return (
        <BasicLayout>
            <div className="container mt-8 mb-8 mx-auto p-6 bg-white shadow-lg rounded-lg relative">
                <div>
                    <Outlet context={{ checkedUno, setCheckedUno }} />
                </div>
            </div>
        </BasicLayout>

    )
}

export default UserPage