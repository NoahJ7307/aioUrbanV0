import React from 'react'
import BasicLayout from '../../layout/BasicLayout'
import LoginComponent from '../../components/login/LoginComponent'

const LoginPage = () => {
    return (
        <BasicLayout>
            <div className='loginBackground'>
                <LoginComponent />
            </div>
        </BasicLayout>
    )
}

export default LoginPage