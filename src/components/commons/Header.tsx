import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logout from '../login-page/Logout';
import { useEffect, useState } from 'react';
// import logo from "/logo.png";

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
        <header className="bg-blue-1 flex items-center  justify-center xs:justify-between h-[106px] fixed left-0 w-full bottom-0 xs:bottom-auto xs:top-0 ">
            {/* 로고 */}
            <div className="hidden xs:block">
                <Link to="/">
                    <img src="/img/BI.svg" alt="Logo" />
                </Link>
            </div>

            {/* 로그인 안했을 때 메뉴*/}
            {!Logined ? (
                <div className="menu">
                    <Link to="/">
                        <img
                            src={
                                location.pathname == '/'
                                    ? '/img/icons/i-home-s32.svg'
                                    : '/img/icons/i-home-s32-active.svg'
                            }
                            alt="홈"
                        />
                        홈
                    </Link>

                    <Link to="/SelectLogin">
                        <img
                            src={
                                location.pathname == '/SelectLogin'
                                    ? '/img/icons/i-login-s32.svg'
                                    : '/img/icons/i-login-s32-active.svg'
                            }
                        />
                        로그인
                    </Link>
                </div>
            ) : (
                // 로그인 했을 떄 메뉴
                <div className="menu">
                    <Link to="/">
                        <img
                            src={
                                location.pathname == '/Login'
                                    ? '/img/icons/i-login-s32.svg'
                                    : '/img/icons/i-login-s32-active.svg'
                            }
                        ></img>
                        홈
                    </Link>

                    <Link to="/Vaccination">
                        <img
                            src={
                                location.pathname == '/Vaccination'
                                    ? '/img/icons/i-injection-s32.svg'
                                    : '/img/icons/i-injection-s32-active.svg'
                            }
                        ></img>
                        예방접종
                    </Link>

                    <Link to="/GrowthDiary">
                        <img
                            src={
                                location.pathname == '/GrowthDiary'
                                    ? '/img/icons/i-ruler-s32.svg'
                                    : '/img/icons/i-ruler-s32-active.svg'
                            }
                        ></img>
                        성장일지
                    </Link>

                    <Link to="/Mypage">
                        <img src="/img/icons/i-mypage-s32.svg"></img>
                        마이페이지
                    </Link>

                    <a onClick={Logout}>
                        <img src="/img/icons/i-login-s32.svg"></img>
                        로그아웃
                    </a>
                </div>
            )}
        </header>
    );
}
