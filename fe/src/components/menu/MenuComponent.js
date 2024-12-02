import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useCustomLogin from '../hook/useCustomLogin';
import '../../css/_modules/menucomponent.css';

const MenuComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { doLogout, moveToPath, isLogin, loadLoginData } = useCustomLogin();
    const [activeMenu, setActiveMenu] = useState(() => {
        return localStorage.getItem('activeMenu') || null;
    });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMyPageOpen, setIsMyPageOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);

    useEffect(() => {
        if (activeMenu) {
            localStorage.setItem('activeMenu', activeMenu);
        } else {
            localStorage.removeItem('activeMenu');
        }
    }, [activeMenu]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.menu-item')) {
                setActiveMenu(null);
            }
            if (!e.target.closest('#sidebar-wrapper') && !e.target.closest('.menu-toggle')) {
                setIsMyPageOpen(false);
                setOpenCategory(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const toggleSidebar = () => {
        setIsMyPageOpen(!isMyPageOpen);
        setOpenCategory(null);
    };

    const toggleCategory = (category) => {
        setOpenCategory(openCategory === category ? null : category);
    };
    const handleClickLogout = () => {
        doLogout();
        alert('로그아웃 되었습니다.');
        moveToPath('/');
    };

    const handleLogoClick = () => {
        navigate('/');
        setActiveMenu(null);
    };

    const isCurrentPath = (path) => {
        return location.pathname === path;
    };

    const getMenuIcon = (menuName) => {
        switch (menuName) {
            case '입주민관리': return 'fa-solid fa-users';
            case '시설관리': return 'fa-solid fa-building-user';
            case '소통관리': return 'fa-solid fa-comments';
            case '주차관리': return 'fa-solid fa-square-parking';
            case '관리자 모드': return 'fa-solid fa-screwdriver-wrench';
            default: return 'fa-solid fa-bars';
        }
    };

    const subMenus = {
        '입주민관리': [
            { name: '주민 목록', path: '/user/list', icon: 'fa-solid fa-address-book' },
            { name: '가입 승인', path: '/user/approval', icon: 'fa-solid fa-user-check' },
            { name: '주민 등록', path: '/user/add', icon: 'fa-solid fa-user-plus' }
        ],
        '시설관리': [
            { name: 'Gym', path: '/facilities/gym', icon: 'fa-solid fa-dumbbell' },
            { name: 'Golf', path: '/facilities/golf', icon: 'fa-solid fa-golf-ball-tee' },
            { name: 'Study', path: '/facilities/study', icon: 'fa-solid fa-book-open-reader' }
        ],
        '소통관리': [
            { name: '게시판', path: '/communities/board/list', icon: 'fa-solid fa-clipboard' },
            { name: '공지사항', path: '/communities/announce/list', icon: 'fa-solid fa-bullhorn' },
            { name: '장터', path: '/communities/market/list', icon: 'fa-solid fa-store' },
            { name: '생활정보', path: '/communities/info/jobs', icon: 'fa-solid fa-circle-info' }
        ],
        '주차관리': [
            { name: '정기권 차량', path: '/parking/regular', icon: 'fa-solid fa-ticket' },
            { name: '방문 예약 차량', path: '/parking/visit', icon: 'fa-solid fa-calendar-check' },
            { name: '입출차 기록', path: '/parking/entry', icon: 'fa-solid fa-clock-rotate-left' }
        ],
        '관리자 모드': [
            { name: '유저 관리', path: '/superAdmin/userManage', icon: 'fa-solid fa-users-gear' },
            { name: '입출차 테스트', path: '/superAdmin/entryTest', icon: 'fa-solid fa-car-side' }
        ]
    };
    const myPageMenus = {
        '마일리지': [
            { name: '마일리지 내역', path: '/myPage/mileage/usage', icon: 'fa-solid fa-receipt' },
            { name: '마일리지 충전', path: '/mileage/manual', icon: 'fa-solid fa-coins' }
        ],
        '예약현황': [
            { name: '골프 예약 조회', path: '/myPage/facilities/golf', icon: 'fa-solid fa-golf-ball-tee' },
            { name: '스터디룸 예약 조회', path: '/myPage/facilities/study', icon: 'fa-solid fa-book-open-reader' },
            { name: '헬스장 이용권 조회', path: '/myPage/facilities/gym', icon: 'fa-solid fa-dumbbell' }
        ],
        '내가쓴글': [
            { name: '게시판', path: '/myPage/communities/board', icon: 'fa-solid fa-clipboard' },
            { name: '공지사항', path: '/myPage/communities/announce', icon: 'fa-solid fa-bullhorn' },
            { name: '마켓', path: '/myPage/communities/market', icon: 'fa-solid fa-store' }
        ]
    };

    const handleMenuClick = (menuName, e) => {
        e.stopPropagation();
        setActiveMenu(activeMenu === menuName ? null : menuName);
    };

    const handleSubMenuClick = (path) => {
        navigate(path);
        setIsMyPageOpen(false);
        setOpenCategory(null);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-logo" onClick={handleLogoClick}>
                    <i className="fa-solid fa-city"></i>
                    <span className="logo-text">Urban</span>
                </div>
                <div className="navbar-left">
                    <ul className="main-menu">
                        {(loadLoginData().role === 'ADMIN' || loadLoginData().role === 'ROOT') && (
                            <li className="menu-item">
                                <div
                                    className={`menu-title ${activeMenu === '입주민관리' ? 'active' : ''}`}
                                    onClick={(e) => handleMenuClick('입주민관리', e)}
                                >
                                    <i className={getMenuIcon('입주민관리')}></i>
                                    <span className="menu-text">주민관리</span>
                                </div>
                                <div className={`submenu ${activeMenu === '입주민관리' ? 'show' : ''}`}>
                                    {subMenus['입주민관리'].map((item, index) => (
                                        <div
                                            key={index}
                                            className={`submenu-item ${isCurrentPath(item.path) ? 'active' : ''}`}
                                            onClick={() => handleSubMenuClick(item.path)}
                                        >
                                            <i className={item.icon}></i>
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                            </li>
                        )}

                        {loadLoginData().role !== 'PENDING' && (
                            ['시설관리', '소통관리', '주차관리'].map((menuName) => (
                                <li key={menuName} className="menu-item">
                                    <div
                                        className={`menu-title ${activeMenu === menuName ? 'active' : ''}`}
                                        onClick={(e) => handleMenuClick(menuName, e)}
                                    >
                                        <i className={getMenuIcon(menuName)}></i>
                                        <span className="menu-text">{menuName}</span>
                                    </div>
                                    <div className={`submenu ${activeMenu === menuName ? 'show' : ''}`}>
                                        {subMenus[menuName].map((item, index) => (
                                            <div
                                                key={index}
                                                className={`submenu-item ${isCurrentPath(item.path) ? 'active' : ''}`}
                                                onClick={() => handleSubMenuClick(item.path)}
                                            >
                                                <i className={item.icon}></i>
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))
                        )}

                        {loadLoginData().role === 'ROOT' && (
                            <li className="menu-item">
                                <div
                                    className={`menu-title ${activeMenu === '관리자 모드' ? 'active' : ''}`}
                                    onClick={(e) => handleMenuClick('관리자 모드', e)}
                                >
                                    <i className={getMenuIcon('관리자 모드')}></i>
                                    <span className="menu-text">관리자 모드</span>
                                </div>
                                <div className={`submenu ${activeMenu === '관리자 모드' ? 'show' : ''}`}>
                                    {subMenus['관리자 모드'].map((item, index) => (
                                        <div
                                            key={index}
                                            className={`submenu-item ${isCurrentPath(item.path) ? 'active' : ''}`}
                                            onClick={() => handleSubMenuClick(item.path)}
                                        >
                                            <i className={item.icon}></i>
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="navbar-right">
                    {isLogin ? (
                        <>
                            {loadLoginData().role === 'PENDING' ? null : (
                                <button className="menu-toggle" onClick={toggleSidebar}>
                                    <i className="fa-solid fa-user"></i>
                                    <span className="nav-text">마이페이지</span>
                                </button>
                            )}
                            <button onClick={handleClickLogout} className="nav-link">
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <span className="nav-text">로그아웃</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">
                                <i className="fa-solid fa-right-to-bracket"></i>
                                <span className="nav-text">로그인</span>
                            </Link>
                            <Link to="/join" className="nav-link">
                                <i className="fa-solid fa-user-plus"></i>
                                <span className="nav-text">회원가입</span>
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            <nav id="sidebar-wrapper" className={isMyPageOpen ? 'active' : ''}>
                <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                        <div onClick={() => {
                            navigate('/');
                            setIsMyPageOpen(false);
                        }}>
                            <i className="fa-solid fa-city"></i>
                            <span>Urban</span>
                        </div>
                    </li>

                    <li className="sidebar-myinfo">
                        <div onClick={() => {
                            navigate('/myPage/myInfo');
                            setIsMyPageOpen(false);
                        }}>
                            <i className="fa-solid fa-user-circle"></i>
                            <span>내정보</span>
                        </div>
                    </li>

                    {['마일리지', '예약현황', '내가쓴글'].map((category) => (
                        <li key={category} className="sidebar-category">
                            <div
                                className={`category-title ${openCategory === category ? 'active' : ''}`}
                                onClick={() => toggleCategory(category)}
                            >
                                <i className={`fa-solid ${category === '마일리지' ? 'fa-coins' :
                                        category === '예약현황' ? 'fa-calendar-check' :
                                            'fa-pen-to-square'
                                    }`}></i>
                                <span>{category}</span>
                                <i className={`fa-solid fa-chevron-${openCategory === category ? 'up' : 'down'}`}></i>
                            </div>
                            <ul className={`category-items ${openCategory === category ? 'open' : ''}`}>
                                {myPageMenus[category].map((item, index) => (
                                    <li
                                        key={index}
                                        className="category-item"
                                        onClick={() => {
                                            navigate(item.path);
                                            setIsMyPageOpen(false);
                                        }}
                                    >
                                        <i className={item.icon}></i>
                                        <span>{item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default MenuComponent;