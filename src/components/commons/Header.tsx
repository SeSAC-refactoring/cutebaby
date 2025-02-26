import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logout from '../login-page/Logout';
import { useEffect, useState } from 'react';
// import logo from "/logo.png";

export default function Header() {
    const navigate = useNavigate();
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
    const gotoLogin = () => {
        navigate('/SelectLogin');
    };

    return (
        <>
            {!Logined ? (
                <div>
                    <div>
                        <div>
                            <Link to="/">
                                <img src="/img/BI.svg" alt="Logo" />
                            </Link>
                        </div>

                        <div>
                            <div>
                                <Link to="/">
                                    <img
                                        src={
                                            location.pathname == '/'
                                                ? '/img/icons/i-home-s32.svg'
                                                : '/img/icons/i-home-s32-active.svg'
                                        }
                                    ></img>
                                    홈
                                </Link>
                            </div>
                            <div>
                                <a onClick={gotoLogin}>
                                    <img
                                        src={
                                            location.pathname == '/SelectLogin'
                                                ? '/img/icons/i-login-s32.svg'
                                                : '/img/icons/i-login-s32-active.svg'
                                        }
                                    ></img>
                                    로그인
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div>
                        <div>
                            <Link to="/">
                                <img src="/img/BI.svg" alt="Logo" />
                            </Link>
                        </div>

                        <div>
                            <div>
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
                            </div>
                            <div>
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
                            </div>

                            <div>
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
                            </div>
                            <div>
                                <Link to="/Mypage">
                                    <img src="/img/icons/i-mypage-s32.svg"></img>
                                    마이페이지
                                </Link>
                            </div>
                            <div>
                                <a onClick={Logout}>
                                    <img src="/img/icons/i-login-s32.svg"></img>
                                    로그아웃
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
