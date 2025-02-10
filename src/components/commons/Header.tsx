import { Link, useLocation, useNavigate } from "react-router-dom";
import Logout from "../login-page/Logout";
import styles from "../../styles/commons/Header.module.scss";
import { useEffect, useState } from "react";
// import logo from "/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 정보를 가져옴

  const user = sessionStorage.getItem("user");
  const [Logined, setLogined] = useState<boolean>(false);
  useEffect(() => {
    if (!user) {
      setLogined(false);
    } else {
      setLogined(true);
    }
  });
  const gotoLogin = () => {
    navigate("/");
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
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <div>
            <Link to="/Home">
              <img src="/img/BI.svg" alt="Logo" />
            </Link>
          </div>
          <div className={[styles.menu_container, styles.textMdMd].join(" ")}>
            <Link
              to="/Vaccination"
              className={
                location.pathname === "/Vaccination"
                  ? [styles.menu_active, styles.textMdBd].join(" ")
                  : styles.menu
              }
            >
              예방접종
            </Link>

            <Link
              to="/GrowthDiary"
              className={
                location.pathname === "/GrowthDiary"
                  ? styles.menu_active
                  : styles.menu
              }
            >
              성장기록
            </Link>

            <div>
              <Link
                to="/Mypage"
                className={
                  location.pathname === "/Mypage"
                    ? styles.menu_active
                    : styles.menu
                }
              >
                마이페이지
              </Link>
            </div>
            {/* <button onClick={Logout}>로그아웃</button> */}

            {Logined ? (
              <div
                className={styles.menu}
                style={{ cursor: "pointer" }}
                onClick={Logout}
              >
                로그아웃
              </div>
            ) : (
              <div
                className={styles.menu}
                style={{ cursor: "pointer" }}
                onClick={gotoLogin}
              >
                로그인
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
