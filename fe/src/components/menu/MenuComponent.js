import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCustomLogin from '../hook/useCustomLogin';
import '../../css/_modules/header.css';

const MenuComponent = () => {
    const navigate = useNavigate();
    const { doLogout, moveToPath, isLogin, loadLoginData } = useCustomLogin();

    // 사이드바 토글 핸들러
    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar-wrapper');
        const menuButton = document.querySelector('.menu-toggle');
        sidebar.classList.toggle('active');
        menuButton.classList.toggle('active');
    };

    const handleClickLogout = () => {
        doLogout();
        alert('로그아웃 되었습니다.');
        moveToPath('/');
    };

    const handleLogoClick = () => {
        navigate('/'); // 홈 경로로 이동
    };

    return (
        <div>
            {/* 상단 네비게이션 바 */}
            <nav className="navbar">
                <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                    {Array.from('Urban').map((char, index) => (
                        <span key={index} className="urban-char">
                            {char}
                        </span>
                    ))}
                </div>

                <div className="navbar-left">
                    <ul>
                        {loadLoginData().role === 'ADMIN' ||
                            loadLoginData().role === 'ROOT' ?
                            <li onClick={() => navigate('/user')}>입주민관리</li>
                            :
                            <></>
                        }
                        <li onClick={() => navigate('/facilities')}>시설관리</li>
                        <li onClick={() => navigate('/communities')}>소통관리</li>
                        <li onClick={() => navigate('/parking')}>주차관리</li>
                        <li onClick={() => navigate('/mileage/manual')}>결제관리</li>
                        {loadLoginData().role === 'ROOT' ?
                            <li onClick={() => navigate('/superAdmin')}>관리자 모드</li>
                            :
                            <></>
                        }
                    </ul>
                </div>

                <div className="navbar-right">
                    {isLogin ? (
                        <>
                            <button onClick={handleClickLogout} className="nav-link">
                                <i className="bi bi-box-arrow-right"></i>로그아웃
                            </button>
                            <a href="#"
                                className="menu-toggle"
                                onClick={toggleSidebar}>
                                <i className="bi bi-person"></i>  마이페이지
                            </a>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">
                                <i className="bi bi-box-arrow-in-left"></i> 로그인
                            </Link>
                            <Link to="/join" className="nav-link">
                                <i className="bi bi-person-plus"></i>  회원가입
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* 메뉴 버튼 */}
            {/* <a href="#"
                className="menu-toggle"
                onClick={toggleSidebar}>
                <i className="bi bi-person"></i>  마이페이지
            </a> */}

            {/* 사이드바 */}
            <nav id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                        <Link to="/">aio Urban</Link>
                    </li>
                    <li>
                        <Link to="/myPage/myInfo"> <i className="bi bi-calendar-check"></i>내정보</Link>
                    </li>
                    <li>
                        <Link to="/myPage/mileage"><i className="bi bi-chat-dots"></i>마일리지 내역</Link>
                    </li>
                    <li>
                        <Link to="/myPage/facilities"> <i className="bi bi-car-front"></i>예약현황</Link>
                    </li>
                    {loadLoginData().role === 'ADMIN' || loadLoginData().role === 'ROOT' ? (
                        <li>
                            <Link to="/user">   <i className="bi bi-wallet2"></i>입주민관리</Link>
                        </li>
                    ) : null}
                    {/* {isLogin ? (
                        <li>
                        <button onClick={handleClickLogout} >
                        <i className="bi bi-box-arrow-right"></i>로그아웃
                            </button></li>):null}
                         */}
                </ul>
            </nav>
        </div>
    );
};

export default MenuComponent;
