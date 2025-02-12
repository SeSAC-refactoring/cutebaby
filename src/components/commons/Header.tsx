import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logout from '../login-page/Logout';
import typography from '../../styles/commons/Typography.module.scss';
import styles from '../../styles/commons/Header.module.scss';
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
        navigate('/');
    };

    return (
        <>
            {/* <div className={styles.header}>
                <div>
                    <Link to="/Home">
                        <img src="/img/logo.png" alt="Logo" />
                    </Link>
                </div>
                <div className={styles.menu_container}>
                    <div className={styles.menu}>서비스 소개</div>
                    <div>
                        {' '}
                        <Link to="/Login" className={styles.menu_default}>
                            로그인
                        </Link>
                    </div>
                </div>
            </div> */}
            <div className={[styles.container, styles.headerWrapper].join(' ')}>
                <div className={styles.header}>
                    <div>
                        <Link to="/Home">
                            <img src="/img/BI.svg" alt="Logo" />
                        </Link>
                    </div>

                    <div
                        className={[
                            styles.menu_container,
                            typography.textMdMd,
                        ].join(' ')}
                    >
                        <Link
                            to="/Home"
                            className={
                                location.pathname === '/Home'
                                    ? [
                                          styles.menu_active,
                                          typography.textMdBd,
                                      ].join(' ')
                                    : styles.menu
                            }
                        >
                            홈
                        </Link>

                        <Link
                            to="/Vaccination"
                            className={
                                location.pathname === '/Vaccination'
                                    ? [
                                          styles.menu_active,
                                          typography.textMdBd,
                                      ].join(' ')
                                    : styles.menu
                            }
                        >
                            예방접종
                        </Link>

                        <Link
                            to="/GrowthDiary"
                            className={
                                location.pathname === '/GrowthDiary'
                                    ? [
                                          styles.menu_active,
                                          typography.textMdBd,
                                      ].join(' ')
                                    : styles.menu
                            }
                        >
                            성장일지
                        </Link>

                        <Link
                            to="/Mypage"
                            className={
                                location.pathname === '/Mypage'
                                    ? [
                                          styles.menu_active,
                                          typography.textMdBd,
                                      ].join(' ')
                                    : styles.menu
                            }
                        >
                            마이페이지
                        </Link>

                        {/* <button onClick={Logout}>로그아웃</button> */}

                        {Logined ? (
                            <a className={styles.menu} onClick={Logout}>
                                로그아웃
                            </a>
                        ) : (
                            <a
                                className={
                                    location.pathname === '/Login' ||
                                    location.pathname === '/'
                                        ? [
                                              styles.menu_active,
                                              typography.textMdBd,
                                          ].join(' ')
                                        : styles.menu
                                }
                                onClick={gotoLogin}
                            >
                                로그인
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
