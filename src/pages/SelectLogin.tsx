import styles from "../styles/SelectLogin.module.scss";

// props로 데이터 받아서 회원가입, 로그인 구분
// <div className={styles.title}>{Email? "이메일" : "회원가입"}</div>

export default function SelectLogin() {
  return (
    <>
      <div className={styles.login_background}>
        <div className={styles.title}>로그인</div>
        <img className={styles.login_img} src="/img/login.png" />
        <button className={styles.email_btn}>이메일로 로그인하기</button>
        <button className={styles.kakao_btn}>카카오로 로그인하기</button>
      </div>
    </>
  );
}
