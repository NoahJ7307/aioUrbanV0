import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useCustomLogin from '../hook/useCustomLogin'

const MenuComponent = () => {
    const loginState = useSelector(state => state.loginSlice)
    const { doLogout, moveToPath, isLogin } = useCustomLogin()

    const handleClickLogout = () => {
        doLogout()
        alert("로그아웃 되었습니다.")
        moveToPath('/')
    }

    return (
        <div className='flex flex-col bg-black text-white'>
            <div className='relative'>
                <div className='flex justify-center'>
                    <Link to={'/'}>Logo</Link>
                </div>
                <div className='flex justify-end'>

                    {!isLogin ?
                        <>
                            <div className='flex justify-end mr-2'>
                                <Link to={'/login'}>로그인</Link>
                            </div>
                            <div className='flex justify-end mr-2'>
                                <Link to={'/join'}>회원가입</Link>
                            </div>
                        </>
                        : <div className='flex justify-end mr-2'>
                            <button onClick={handleClickLogout}>로그아웃</button>
                        </div>
                    }
                </div>
            </div>
            <ul className='flex justify-center'>
                <li className='p-2'><Link to={'/'}>홈</Link></li>
                <li className='p-2'><Link to={'/user'}>입주민관리</Link></li>
                <li className='p-2'><Link to={'/facilities'}>facilities</Link></li>
                <li className='p-2'><Link to={'/community'}>Community</Link></li>
                <li className='p-2'><Link to={'/parking'}>주차관리</Link></li>
                {loginState.phone ?
                    <li className='p-2'><Link to={'/'}>LoginTest</Link></li>
                    : <></>
                }
            </ul>
        </div>
    )
}

export default MenuComponent