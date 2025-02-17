import { Link, useLocation, useNavigate } from "react-router-dom";
import Logout from "../login-page/Logout";
import typography from "../../styles/commons/Typography.module.scss";
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
      {!Logined ? (
        <div className={[styles.container, styles.headerWrapper].join(" ")}>
          <div className={styles.header}>
            <div>
              <Link to="/Home">
                <img className={styles.logo} src="/img/BI.svg" alt="Logo" />
              </Link>
            </div>

            <div
              className={[styles.menu_container, typography.textMdMd].join(" ")}
            >
              <div className={styles.icon_container}>
                <Link
                  to="/Home"
                  className={
                    location.pathname === "/Home"
                      ? [styles.menu_active, typography.textMdBd].join(" ")
                      : styles.menu
                  }
                >
                  <img
                    className={styles.header_icons}
                    src={
                      location.pathname == "/Home"
                        ? "/img/icons/i-home-s32.svg"
                        : "/img/icons/i-home-s32-active.svg"
                    }
                    //   src="/img/icons/i-home-s32.svg"
                  ></img>
                  홈
                </Link>
              </div>
              <div className={styles.icon_container}>
                <a
                  className={
                    location.pathname === "/Login" || location.pathname === "/"
                      ? [styles.menu_active, typography.textMdBd].join(" ")
                      : styles.menu
                  }
                  onClick={gotoLogin}
                >
                  <img
                    className={styles.header_icons}
                    src={
                      location.pathname == "/Login"
                        ? "/img/icons/i-login-s32.svg"
                        : "/img/icons/i-login-s32-active.svg"
                    }
                  ></img>
                  로그인
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={[styles.container, styles.headerWrapper].join(" ")}>
          <div className={styles.header}>
            <div>
              <Link to="/Home">
                <img className={styles.logo} src="/img/BI.svg" alt="Logo" />
              </Link>
            </div>

            <div
              className={[styles.menu_container, typography.textMdMd].join(" ")}
            >
              <div className={styles.icon_container}>
                <Link
                  to="/Home"
                  className={
                    location.pathname === "/Home"
                      ? [styles.menu_active, typography.textMdBd].join(" ")
                      : styles.menu
                  }
                >
                  <img
                    className={styles.header_icons}
                    src={
                      location.pathname == "/Login"
                        ? "/img/icons/i-login-s32.svg"
                        : "/img/icons/i-login-s32-active.svg"
                    }
                  ></img>
                  홈
                </Link>
              </div>
              <div className={styles.icon_container}>
                <Link
                  to="/Vaccination"
                  className={
                    location.pathname === "/Vaccination"
                      ? [styles.menu_active, typography.textMdBd].join(" ")
                      : styles.menu
                  }
                >
                  <img
                    className={styles.header_icons}
                    src={
                      location.pathname == "/Vaccination"
                        ? "/img/icons/i-injection-s32.svg"
                        : "/img/icons/i-injection-s32-active.svg"
                    }
                  ></img>
                  예방접종
                </Link>
              </div>

              <div className={styles.icon_container}>
                <Link
                  to="/GrowthDiary"
                  className={
                    location.pathname === "/GrowthDiary"
                      ? [styles.menu_active, typography.textMdBd].join(" ")
                      : styles.menu
                  }
                >
                  <img
                    className={styles.header_icons}
                    src={
                      location.pathname == "/GrowthDiary"
                        ? "/img/icons/i-ruler-s32.svg"
                        : "/img/icons/i-ruler-s32-active.svg"
                    }
                  ></img>
                  성장일지
                </Link>
              </div>
              <div className={styles.icon_container}>
                <Link
                  to="/Mypage"
                  className={
                    location.pathname === "/Mypage"
                      ? [styles.menu_active, typography.textMdBd].join(" ")
                      : styles.menu
                  }
                >
                  <img
                    className={styles.header_icons}
                    src="/img/icons/i-mypage-s32.svg"
                  ></img>
                  마이페이지
                </Link>
              </div>
              <div className={styles.icon_container}>
                <a className={styles.menu} onClick={Logout}>
                  <img
                    className={styles.header_icons}
                    src="/img/icons/i-login-s32.svg"
                  ></img>
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
