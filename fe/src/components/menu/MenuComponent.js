import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useCustomLogin from '../hook/useCustomLogin'

const MenuComponent = () => {
    const loginState = useSelector(state => state.loginSlice)
    const { doLogout, moveToPath, isLogin } = useCustomLogin()

    const handleClickLogout = () => {
        doLogout()
        alert("Logout Complete")
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
                        <div className='flex justify-end mr-2'>
                            <Link to={'/login'}>Login</Link>
                        </div>
                        : <div className='flex justify-end mr-2'>
                            <button onClick={handleClickLogout}>Logout</button>
                        </div>
                    }
                </div>
            </div>
            <ul className='flex justify-center'>
                <li className='p-2'><Link to={'/'}>Home</Link></li>
                <li className='p-2'><Link to={'/user'}>User</Link></li>
<<<<<<< HEAD
                <li className='p-2'><Link to={'/facilities'}>facilities</Link></li>
                <li className='p-2'><Link to={'/'}>Community</Link></li>
=======

                <li className='p-2'><Link to={'/community'}>Community</Link></li>
                {/* 커뮤니티 추가 */}
>>>>>>> JJY
                <li className='p-2'><Link to={'/'}>Parking</Link></li>
                {loginState.phone ?
                    <li className='p-2'><Link to={'/'}>LoginTest</Link></li>
                    : <></>
                }
            </ul>
        </div>
    )
}

export default MenuComponent