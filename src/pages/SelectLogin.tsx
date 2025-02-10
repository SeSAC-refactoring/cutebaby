import { Link } from "react-router-dom";
import { getKakaoLoginUrl } from "../services/kakaoService";
import styles from "../styles/SelectLogin.module.scss";

// props로 데이터 받아서 회원가입, 로그인 구분
// <div className={styles.title}>{Email? "이메일" : "회원가입"}</div>

export default function SelectLogin() {
  return (
    <div className={styles.container}>
      <div className={styles.login_background}>
        <div className={styles.title}>로그인</div>
        <img className={styles.login_img} src="/img/login.png" />
        <section className={styles.signup_gap}>
        <article className={styles.btn_gap}>
        <Link to="/Login">
        <button className={`${styles.btn} ${styles.email_btn}`}>
          <img src="/img/mail-03.png"></img>
          이메일로 로그인하기
        </button>
        </Link>
        <a href={getKakaoLoginUrl()} style={{ textDecorationLine: "none" }}>
          <button className={`${styles.btn} ${styles.kakao_btn}`}>
            <img src="/img/kakao.png"></img>
            카카오톡으로 로그인하기
          </button>
        </a>
        </article>
        <div className={styles.link_container}>
          <div>가입하지 않으셨나요?</div>
          <div className={styles.link}>
            <Link to="/Signup">회원가입하기</Link>
          </div>
          
        </div>
        </section>
      </div>
    </div>
  );
}
