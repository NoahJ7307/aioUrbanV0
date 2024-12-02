import React from 'react'
import BasicLayout from '../../layout/BasicLayout'
import LoginComponent from '../../components/login/LoginComponent'
import { Outlet } from 'react-router-dom'

const LoginPage = () => {
    return (
        <BasicLayout>
            <div className='loginBackground'>
                <Outlet />
            </div>
        </BasicLayout>
    )
}

export default LoginPage