import styles from "../styles/vaccination_unit.module.scss";

export default function VaccinationUnit() {
  return (
    <div className={styles.container}>
      <div className={styles.content_wrap}>
        <div className={styles.contents_set}>
          <div className={styles.contents_title}>병원이름</div>
          <div className={styles.contents}>(의)성관의료재단 차움의원</div>
        </div>
        <div className={styles.contents_set}>
          <div className={styles.contents_title}>병원주소</div>
          <div className={styles.contents}>
            서울특별시 강남구 도산대로 442, (청담동) 피엔폴루스 2층일부, 3층일부
          </div>
        </div>
        <div className={styles.contents_set}>
          <div className={styles.contents_title}>전화번호</div>
          <div className={styles.contents}>02-3015-5000</div>
        </div>
        <div className={styles.btn_wrap}>
          <button className={styles.list_btn}>접종 목록보기 ▼</button>
        </div>
      </div>
    </div>
  );
}
