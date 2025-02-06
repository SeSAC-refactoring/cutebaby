import styles from "../../styles/commons/ChildrenTabs.module.scss";

// export function ChildrenTabs() {
//   return (
//     <div className={styles.container}>
//       <div className={styles.blue}>김하나</div>
//       <div>김두리</div>
//       <div>김세찌</div>
//     </div>
//   );
// }

export function NoChildrenTabs() {
  return (
    <div>
      <div>아이를 등록해주세요.</div>
      <div>+</div>
    </div>
  );
}

export function ChildrenTabs() {
  return (
    <div className={styles.button_group}>
      <button className={styles.button_selected}>김하나 ✔</button>
      <button className={styles.button}>김두리</button>
      <button className={styles.button}>김세찌</button>
    </div>
  );
}
