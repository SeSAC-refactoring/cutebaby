import styles from "../styles/VaccinationDetail.module.scss";
import Detail from "./vaccination_detail";

export default function VaccinationDetail() {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.title}>예방접종 상세설명</div>
        <select className={styles.select}>
          <option>전체</option>
          <option>B형간염</option>
          <option>결핵</option>
        </select>
        <div className={styles.component_wrap}>
          <Detail />
          <Detail />
          <Detail />
        </div>
      </div>
    </>
  );
}
