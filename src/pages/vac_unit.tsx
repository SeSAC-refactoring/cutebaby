import styles from "../styles/Vaccination.module.scss";

export default function VacUnit() {
  return (
    <>
      <div className={styles.vac_content}>
        <div className={styles.title_block}>
          <div className={styles.vac_title_block}>
            <div className={styles.vac_title}>HepB</div>
            <div className={styles.vir_title}>B형간염</div>
          </div>
          <button className={styles.info}>상세설명</button>
        </div>
        <div className={styles.vac_table}>
          <div className={styles.table_col_title}>
            <div className={styles.table_a}>표준일정</div>
            <div className={styles.table_a}>실접종일</div>
          </div>
          <div className={styles.table_col}>
            <div className={styles.table_a}>1회차</div>
            <div className={styles.table_a}>
              2025.01.25
              <br />
              ~2025.03.25
            </div>
            <div className={styles.table_a}>2025.01.25</div>
          </div>
          <div className={styles.table_col}>
            <div className={styles.table_a}>1회차</div>
            <div className={styles.table_a}>
              2025.01.25
              <br />
              ~2025.03.25
            </div>
            <div className={styles.table_a}>2025.01.25</div>
          </div>
          <div className={styles.table_col}>
            <div className={styles.table_a}>1회차</div>
            <div className={styles.table_a}>
              2025.01.25
              <br />
              ~2025.03.25
            </div>
            {/* <div className={styles.table_a}>2025.01.25</div> */}
            <button className={styles.enter_btn}>입력??</button>
          </div>
        </div>
      </div>
    </>
  );
}
