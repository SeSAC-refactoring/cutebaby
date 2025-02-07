import styles from "../../styles/commons/ChildrenTabs.module.scss";

export function ChildrenTabs() {
  return (
    <div className={styles.button_group}>
      <button className={styles.button_selected}>김하나 ✔</button>
      <button className={styles.button}>김두리</button>
      <button className={styles.button}>김세찌</button>
    </div>
  );
}
