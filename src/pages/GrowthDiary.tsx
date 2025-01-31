import styles from "../styles/GrowthDiary.module.scss";

export default function GrowthDiary() {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.title}>성장기록</div>
        <div className={styles.text}>우리 아이의 성정을 기록해보세요 😀</div>
        <div className={styles.user_list}>
          <div className={styles.user}>김하나</div>
          <div className={styles.user}>김두리</div>
          <div className={styles.user}>김세찌</div>
        </div>
        <div className={styles.small_title}>성장기록</div>
        <div className={styles.record}>
          <div className={styles.record_table}>
            <div className={styles.record_first_row}>
              <div className={styles.record_unit}>신장</div>
              <div className={styles.record_unit}>체중</div>
              <div className={styles.record_unit}>머리둘레</div>
            </div>
            <div className={styles.record_row}>
              <div className={styles.record_unit}>2025-01-25</div>
              <div className={styles.record_unit}>""</div>
              <div className={styles.record_unit}>""</div>
              <div className={styles.record_unit}>""</div>
            </div>
          </div>
        </div>
        <div className={styles.small_title}>성장상태 측정계산기</div>
        <div className={styles.cal_box}>
          <div className={styles.cal}>
            <div className={styles.cal_unit}>
              <div className={styles.cal_title}>신장</div>
              <input className={styles.cal_input}></input>
            </div>
            <div className={styles.cal_unit}>
              <div className={styles.cal_title}>측정일</div>
              <input
                className={styles.cal_input}
                defaultValue="2025-01-25"
              ></input>
            </div>
            <div className={styles.cal_unit}>
              <div className={styles.cal_title}>체중</div>
              <input className={styles.cal_input}></input>
            </div>
            <div className={styles.cal_unit}>
              <div className={styles.cal_title}>머리둘레</div>
              <input className={styles.cal_input}></input>
            </div>
          </div>
          <div className={styles.small_text}>* 6세(72개월)미만</div>
          <div className={styles.btn_wrap}>
            <button className={styles.btn}>초기화</button>
            <button className={styles.btn}>계산</button>
          </div>
        </div>
        <div className={styles.small_title}>신장</div>
        <div className={styles.graph_box}>그래프</div>
      </div>
    </>
  );
}
