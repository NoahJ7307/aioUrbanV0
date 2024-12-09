import React from 'react'
import UserModifyComponent from '../../components/user/UserModifyComponent'
import { useOutletContext } from 'react-router-dom'

const ModifyPage = () => {
    const { checkedUno, setCheckedUno } = useOutletContext() // 부모에게서 전달된 함수
    return (
        <div className="container w-9/12 mt-8 mb-8 mx-auto p-6 relative">
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-semibold">주민 정보 수정</h2>
            </div>
            <UserModifyComponent context={{ checkedUno, setCheckedUno }} />
        </div>
    )
}

export default ModifyPage