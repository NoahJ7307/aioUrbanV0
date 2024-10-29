import React, { useEffect, useState } from 'react'
import { addUserRole, approvalStatus, deleteChecked, getApprovalList, getList } from '../api/userApi'
import PageComponent from '../common/PageComponent'
import useCustomApproval from '../hook/useCustomApproval'
import { useNavigate } from 'react-router-dom'

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const UserApprovalComponent = () => {
    const navigate = useNavigate()
    const [serverData, setServerData] = useState(initState)
    const { page, size, moveToList } = useCustomApproval()

    const handleClickAccess = (e) => {
        const uno = e.target.value
        addUserRole(uno)
        getList()
    }

    const handleClickDenial = (e) => {
        const uno = [e.target.value]
        deleteChecked(uno)
        getList()
    }

    // 승인, 거부 후 새로고침 기능 수행을 위해 함수로 정의
    const getList = () =>
        getApprovalList({ page, size }).then(data => {
            setServerData(data)
        }).catch(err => {
            console.error("Axios error", err)
        })

    useEffect(() => {
        getList()
    }, [page, size])

    return (
        <div>
            <div className="grid grid-cols-5">
                <div>동</div>
                <div>호</div>
                <div>이름</div>
                <div>전화번호</div>
                <div>가입 승인</div>
            </div>

            {/* 유저 데이터를 map으로 렌더링 */}
            {serverData.dtoList.map((user, index) => (
                <div key={index} className="grid grid-cols-5">
                    <div>{user.dong}</div>
                    <div>{user.ho}</div>
                    <div>{user.userName}</div>
                    <div>{user.phone}</div>
                    <div>
                        <button className='bg-green-500'
                            value={user.uno}
                            onClick={handleClickAccess}
                        >승인</button>
                        <button className='bg-red-500'
                            value={user.uno}
                            onClick={handleClickDenial}>거부</button>
                    </div>
                </div>
            ))}
            <PageComponent serverData={serverData} movePage={moveToList} />
        </div>
    );
}

export default UserApprovalComponent