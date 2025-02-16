import { Link, useNavigate } from "react-router-dom";
import { getKakaoLoginUrl } from "../services/kakaoService";
import layout from "../styles/commons/Layout.module.scss";
import typography from "../styles/commons/Typography.module.scss";
import button from "../styles/commons/Button.module.scss";
import styles from "../styles/SelectLogin.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { fetchBabyInfo } from "../store/babySlice";

// props로 데이터 받아서 회원가입, 로그인 구분
// <div className={styles.title}>{Email? "이메일" : "회원가입"}</div>

export default function SelectLogin() {
  const dispatch = useDispatch<AppDispatch>();

  const [selectSignup, setSelect] = useState<boolean>(false);
  const signup = () => {
    if (!selectSignup) {
      setSelect(true);
    } else if (selectSignup) {
      setSelect(false);
    }
  };
  const testAccount = {
    email: "test@sesac.com",
    password: "testuser1!",
  };
  const handleTestLogin = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${API_URL}/user`, {
        email: testAccount.email,
        inputpassword: testAccount.password,
      });

      if (response.data.length > 0) {
        const user = response.data[0];

        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("usernumber", JSON.stringify(user.usernumber));
        sessionStorage.setItem("useremail", user.userid);
        sessionStorage.setItem("username", user.username);
        dispatch(fetchBabyInfo());

        navigate("/Home");
      } else {
        alert("테스트 계정 로그인 실패: 사용자를 찾을 수 없습니다.");
      }
    } catch (error) {
      alert("테스트 계정 로그인 오류가 발생했습니다.");
    }
  };

  // 로그인 되어있을 시 // 홈페이지로 리디렉션
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/Home");
    }
  });

  return (
    <div className={layout.mainAreaWrap}>
      <div className={layout.container}>
        <div className={[layout.contentsArea, styles.contentsArea].join(" ")}>
          <div className={[layout.titleArea, typography.text4xlBd].join(" ")}>
            {!selectSignup ? "로그인" : "회원가입"}
          </div>
          <div className={layout.contentsWrap}>
            <img
              className={styles.login_img}
              src="/img/visuals/visual_login_ggomul_01_.svg"
            />

            <div className={`${layout.buttonArea} ${styles.buttonArea}`}>
              {!selectSignup ? (
                <Link to="/Login">
                  <button
                    className={`${button.btnXlGr} ${typography.textXlBd}`}
                  >
                    <img src="/img/icons/i-mail-s32.svg"></img>
                    이메일로 로그인하기
                  </button>
                </Link>
              ) : (
                <Link to="/Signup">
                  <button
                    className={`${button.btnXlGr} ${typography.textXlBd}`}
                  >
                    <img src="/img/icons/i-mail-s32.svg"></img>
                    이메일로 회원가입하기
                  </button>
                </Link>
              )}
              {/* <Link to="/Login"> */}
              <button
                onClick={handleTestLogin}
                className={`${button.btnXlGr} ${typography.textXlBd}`}
              >
                <img src="/img/icons/i-mail-s32.svg"></img>
                테스트계정으로 로그인하기
              </button>
              {/* </Link> */}

              <a
                href={getKakaoLoginUrl()}
                style={{ textDecorationLine: "none" }}
              >
                <button className={`${button.btnXlKyw} ${typography.textXlBd}`}>
                  <img src="/img/icons/i-kakaotalk-s32.svg"></img>
                  {!selectSignup
                    ? "카카오톡으로 로그인하기"
                    : "카카오톡으로 회원가입하기"}
                </button>
              </a>
            </div>

            <div
              className={[styles.link_container, typography.textSmRg].join(" ")}
            >
              <div>
                {!selectSignup ? "가입하지 않으셨나요?" : "계정이 있으신가요?"}
              </div>
              <div
                onClick={signup}
                className={[styles.link, typography.textSmMd].join(" ")}
              >
                {/* <Link to="/Signup">회원가입하기</Link> */}
                {!selectSignup ? "회원가입하기" : "로그인하기"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
