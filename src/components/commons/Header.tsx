import { Link, useLocation } from 'react-router-dom';
import Logout from '../login-page/Logout';
import { useEffect, useState } from 'react';

export default function Header() {
    const location = useLocation(); // 현재 URL 정보를 가져옴
    const user = sessionStorage.getItem('user');

    const [Logined, setLogined] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            setLogined(false);
        } else {
            setLogined(true);
        }
    });

    return (
        <header>
            <div className="headerContainer">
                {/* 로고 */}
                <h1 className="logo">
                    <Link to="/">
                        <img src="/img/BI.svg" alt="꼬물꼬물" />
                    </Link>
                </h1>

                {/* 로그인 안했을 때 메뉴*/}
                {!Logined ? (
                    <nav>
                        <Link to="/">
                            <img
                                src={
                                    location.pathname === '/'
                                        ? '/img/icons/i-home-s32-active.svg'
                                        : '/img/icons/i-home-s32.svg'
                                }
                                alt="홈"
                            />
                            <p
                                className={
                                    location.pathname === '/' ? 'active' : ''
                                }
                            >
                                홈
                            </p>
                        </Link>

                        <Link to="/SelectLogin">
                            <img
                                src={
                                    location.pathname === '/SelectLogin'
                                        ? '/img/icons/i-login-s32-active.svg'
                                        : '/img/icons/i-login-s32.svg'
                                }
                                alt="로그인"
                            />
                            <p
                                className={
                                    location.pathname === '/SelectLogin'
                                        ? 'active'
                                        : ''
                                }
                            >
                                로그인
                            </p>
                        </Link>
                    </nav>
                ) : (
                    // 로그인 했을 떄 메뉴
                    <nav>
                        <Link to="/">
                            <img
                                src={
                                    location.pathname === '/'
                                        ? '/img/icons/i-home-s32-active.svg'
                                        : '/img/icons/i-home-s32.svg'
                                }
                                alt="홈"
                            />
                            <p
                                className={
                                    location.pathname === '/' ? 'active' : ''
                                }
                            >
                                홈
                            </p>
                        </Link>

                        <Link to="/Vaccination">
                            <img
                                src={
                                    location.pathname === '/Vaccination'
                                        ? '/img/icons/i-vaccination-s32-active.svg'
                                        : '/img/icons/i-vaccination-s32.svg'
                                }
                                alt="예방접종"
                            />
                            <p
                                className={
                                    location.pathname === '/Vaccination'
                                        ? 'active'
                                        : ''
                                }
                            >
                                예방접종
                            </p>
                        </Link>

                        <Link to="/GrowthDiary">
                            <img
                                src={
                                    location.pathname === '/GrowthDiary'
                                        ? '/img/icons/i-ruler-s32-active.svg'
                                        : '/img/icons/i-ruler-s32.svg'
                                }
                                alt="성장일지"
                            />
                            <p
                                className={
                                    location.pathname === '/GrowthDiary'
                                        ? 'active'
                                        : ''
                                }
                            >
                                성장일지
                            </p>
                        </Link>

                        <Link to="/Mypage">
                            <img
                                src={
                                    location.pathname === '/Mypage'
                                        ? '/img/icons/i-mypage-s32-active.svg'
                                        : '/img/icons/i-mypage-s32.svg'
                                }
                                alt="마이페이지"
                            />
                            <p
                                className={
                                    location.pathname === '/Mypage'
                                        ? 'active'
                                        : ''
                                }
                            >
                                마이페이지
                            </p>
                        </Link>

                        <a onClick={Logout}>
                            <img
                                src="/img/icons/i-logout-s32.svg"
                                alt="로그아웃"
                            />
                            <p>로그아웃</p>
                        </a>
                    </nav>
                )}
            </div>
        </header>
    );
}
