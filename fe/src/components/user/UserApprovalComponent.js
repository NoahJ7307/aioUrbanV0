import React, { useEffect, useState } from 'react'
import { addUserRole, approvalStatus, deleteChecked, getList } from '../api/userApi'
import PageComponent from '../common/PageComponent'
import useCustomApproval from '../hook/useCustomApproval'

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
    const [serverData, setServerData] = useState(initState)
    const { page, size, moveToList } = useCustomApproval()

    const handleClickAccess = (e) => {
        const uno = e.target.value
        addUserRole(uno)
        fetchData()
    }

    const handleClickDenial = (e) => {
        const uno = [e.target.value]
        deleteChecked(uno)
        fetchData()
    }

    // 승인여부(PENDING 포함여부)가 true인 사용자만 필터링
    const fetchData = async () => {
        try {
            const listData = await getList({ page, size })
            const approvalPromises = listData.dtoList.map(async (user) => {
                const status = await approvalStatus(user.uno) // approvalStatus api 병렬처리
                return { ...user, approvalStatus: status } // dtoList 에 status(승인여부) 추가
            });

            const filteredData = (await Promise.all(approvalPromises)) // true 필터링 병렬처리
                .filter(user => user.approvalStatus)

            // dtoList 만 필터링된 데이터로 업데이트
            setServerData({ ...listData, dtoList: filteredData })
        } catch (err) {
            console.error('Error fetching approval status or list:', err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [page, size])

    return (
        <div>
            <div className="grid grid-cols-6">
                <div>동</div>
                <div>호</div>
                <div>이름</div>
                <div>전화번호</div>
                <div>가입승인</div>
            </div>

            {/* 유저 데이터를 map으로 렌더링 */}
            {serverData.dtoList.map((user, index) => (
                <div key={index} className="grid grid-cols-6">
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