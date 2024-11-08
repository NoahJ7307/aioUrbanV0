import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useCustomLogin from '../hook/useCustomLogin'
import '../../css/_modules/header.css'

const MenuComponent = () => {
    const loginState = useSelector(state => state.loginSlice)
    const { doLogout, moveToPath, isLogin } = useCustomLogin()

    const handleClickLogout = () => {
        doLogout()
        alert("로그아웃 되었습니다.")
        moveToPath('/')
    }

    return (
        <div className='headerBox'>
            <div className='positionRelative'>
                <div className='center'>
                    <Link to={'/'}><h1 className='logoLink'>
                        {Array.from('aio Urban').map((char, index) => (
                            <span key={index} className='logo-char'>
                                {char}
                            </span>
                        ))}
                    </h1></Link>
                </div>
                <div className='flexEnd'>

                    {!isLogin ?
                        <>
                            <div className='flexEnd marginRight0_5'>
                                <Link to={'/login'}>로그인</Link>
                            </div>
                            <div className='flexEnd marginRight0_5'>
                                <Link to={'/join'}>회원가입</Link>
                            </div>
                        </>
                        : <div className='flexEnd marginRight0_5'>
                            <button onClick={handleClickLogout}>로그아웃</button>
                        </div>
                    }
                </div>
            </div>
            <ul className='center'>
                {/* <li><Link to={'/'}>홈</Link></li> */}
                <li><Link to={'/user'}>입주민관리</Link></li>
                <li><Link to={'/facilities'}>시설예약</Link></li>
                <li><Link to={'/communities'}>소통</Link></li>
                <li><Link to={'/parking'}>주차관리</Link></li>
                {loginState.phone ?
                    <>
                        <li><Link to={'/mileage'}>마일리지결제</Link></li>
                        {/* <li><Link to={'/'}>LoginTest</Link></li> */}
                    </>
                    : <></>
                }
            </ul>
        </div>
    )
}

export default MenuComponent
