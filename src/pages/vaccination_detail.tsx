import styles from "../styles/VaccinationDetail.module.scss";

export default function Detail() {
  return (
    <>
      <div className={styles.detail}>
        <div className={styles.detail_el}>예방접종명</div>
        <div className={styles.detail_el}>이름</div>
        <div className={styles.detail_el}>이상반응</div>
      </div>
    </>
  );
}
