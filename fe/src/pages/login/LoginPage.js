import React from 'react'
import BasicLayout from '../../layout/BasicLayout'
import LoginComponent from '../../components/login/LoginComponent'
import { Outlet } from 'react-router-dom'

const LoginPage = () => {
    return (
        <BasicLayout>
            <div className='loginBackground'>
                <div className="flex justify-center items-center h-screen">
                    <div className="w-[500px] p-4 -mt-40">
                        <div className="mb-2 text-center">
                            <h2 className="text-5xl font-semibold">URBAN</h2>
                            </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </BasicLayout>
    )
}

export default LoginPage