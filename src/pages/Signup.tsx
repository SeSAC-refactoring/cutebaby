import styles from '../styles/Signup.module.scss';

export default function Signup() {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.title}>회원가입</div>
        <div className={styles.gray_box}>1. 보호자님 정보를 적어주세요.</div>
        <div className={styles.input_set}>
          <div className={styles.a}>이메일 *</div>
          <input className={styles.input}></input>
        </div>
        <div className={styles.input_set}>
          <div className={styles.a}>비밀번호 *</div>
          <input className={styles.input}></input>
        </div>
        <div className={styles.input_set}>
          <div className={styles.a}>비밀번호 확인 *</div>
          <input className={styles.input}></input>
        </div>
        <div className={styles.input_set}>
          <div className={styles.a}>이름 *</div>
          <input className={styles.input}></input>
        </div>
        <div className={styles.gray_box}>2. 아기의 정보를 적어주세요.</div>
        <div className={styles.input_set}>
          <div className={styles.a}>이름 *</div>
          <input className={styles.input}></input>
        </div>
        <div className={styles.input_set}>
          <div className={styles.a}>생년월일 *</div>
          <input className={styles.input}></input>
        </div>
        <div className={styles.gray_text}>
          이미 접종한 회차를 모두 체크해주세요.
        </div>
        <div className={styles.checkBox}>
          <div className={styles.checkBox_row}>
            <div className={styles.checkBox_unit}>예방 접종명</div>
            <div className={styles.checkBox_unit}>백신명</div>
            <div className={styles.checkBox_unit}>횟수</div>
          </div>
        </div>
        <button className={styles.button}>완료</button>
      </div>
    </>
  );
}
