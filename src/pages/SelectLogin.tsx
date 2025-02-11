import { Link } from "react-router-dom";
import { getKakaoLoginUrl } from "../services/kakaoService";
import layout from "../styles/commons/Layout.module.scss";
import typography from "../styles/commons/Typography.module.scss";
import button from "../styles/commons/Button.module.scss";
import styles from "../styles/SelectLogin.module.scss";

// props로 데이터 받아서 회원가입, 로그인 구분
// <div className={styles.title}>{Email? "이메일" : "회원가입"}</div>

export default function SelectLogin() {
  return (
    <div className={layout.container}>
      <div className={[layout.contentsArea, styles.contentsArea].join(" ")}>
        <div className={[layout.titleArea, typography.text4xlBd].join(" ")}>
          로그인
        </div>
        <div className={styles.img_signup}>
          <img
            className={styles.login_img}
            src="/img/visual_login_ggomul_01_.svg"
          />
          <div className={styles.signup_gap}>
            <div className={styles.btn_gap}>
              <Link to="/Login">
                <button
                  className={`${button.btnXlBk} ${typography.textXlBd}`}
                >
                  <img src="/img/mail-03.png"></img>
                  이메일로 로그인하기
                </button>
              </Link>
              <a
                href={getKakaoLoginUrl()}
                style={{ textDecorationLine: "none" }}
              >
                <button
                  className={`${button.btnXlKyw} ${styles.kakao_btn} ${typography.textXlBd}`}
                >
                  <img src="/img/kakao.png"></img>
                  카카오톡으로 로그인하기
                </button>
              </a>
            </div>

            <div
              className={[styles.link_container, typography.textSmRg].join(" ")}
            >
              <div>가입하지 않으셨나요?</div>
              <div className={[styles.link, typography.textSmMd].join(" ")}>
                <Link to="/Signup">회원가입하기</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
