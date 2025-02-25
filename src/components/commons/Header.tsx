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
    navigate("/SelectLogin");
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
                <Link
                  to="/"
                  // className={
                  //   location.pathname === "/"
                  //     ? [styles.menu_active, typography.textMdBd].join(" ")
                  //     : styles.menu
                  // }
                >
                  <img
                    src={
                      location.pathname == "/"
                        ? "/img/icons/i-home-s32.svg"
                        : "/img/icons/i-home-s32-active.svg"
                    }
                    //   src="/img/icons/i-home-s32.svg"
                  ></img>
                  홈
                </Link>
              </div>
              <div>
                <a
                  // className={
                  //   location.pathname === "/SelectLogin" ||
                  //   location.pathname === "/Home"
                  //     ? [styles.menu_active, typography.textMdBd].join(" ")
                  //     : styles.menu
                  // }
                  onClick={gotoLogin}
                >
                  <img
                    src={
                      location.pathname == "/SelectLogin"
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
        <div>
          <div>
            <div>
              <Link to="/">
                <img src="/img/BI.svg" alt="Logo" />
              </Link>
            </div>

            <div>
              <div>
                <Link
                  to="/"
                  // className={
                  //   location.pathname === "/"
                  //     ? [styles.menu_active, typography.textMdBd].join(" ")
                  //     : styles.menu
                  // }
                >
                  <img
                    src={
                      location.pathname == "/Login"
                        ? "/img/icons/i-login-s32.svg"
                        : "/img/icons/i-login-s32-active.svg"
                    }
                  ></img>
                  홈
                </Link>
              </div>
              <div>
                <Link
                  to="/Vaccination"
                  // className={
                  //   location.pathname === "/Vaccination"
                  //     ? [styles.menu_active, typography.textMdBd].join(" ")
                  //     : styles.menu
                  // }
                >
                  <img
                    src={
                      location.pathname == "/Vaccination"
                        ? "/img/icons/i-injection-s32.svg"
                        : "/img/icons/i-injection-s32-active.svg"
                    }
                  ></img>
                  예방접종
                </Link>
              </div>

              <div>
                <Link
                  to="/GrowthDiary"
                  // className={
                  //   location.pathname === "/GrowthDiary"
                  //     ? [styles.menu_active, typography.textMdBd].join(" ")
                  //     : styles.menu
                  // }
                >
                  <img
                    src={
                      location.pathname == "/GrowthDiary"
                        ? "/img/icons/i-ruler-s32.svg"
                        : "/img/icons/i-ruler-s32-active.svg"
                    }
                  ></img>
                  성장일지
                </Link>
              </div>
              <div>
                <Link
                  to="/Mypage"
                  // className={
                  //   location.pathname === "/Mypage"
                  //     ? [styles.menu_active, typography.textMdBd].join(" ")
                  //     : styles.menu
                  // }
                >
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
