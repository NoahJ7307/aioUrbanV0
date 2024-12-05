import React from 'react'
import JoinComponent from '../components/main/JoinComponent'
import BasicLayout from '../layout/BasicLayout'

const JoinPage = () => {
    return (
        <BasicLayout>
          <div className="loginBackground">
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-[800px] p-4">
                    <div className="mb-2 text-center">
                            <h2 className="text-5xl font-semibold">회원가입</h2>
                        </div>
                        <JoinComponent />
                    </div>
                </div>
            </div>
        </BasicLayout>
    )
}

export default JoinPage