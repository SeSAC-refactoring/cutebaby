import React from "react";
import typography from "../../../styles/commons/Typography.module.scss";
import styles from "../../../styles/Vaccination.module.scss";

export const DoseDate = () => {
  const headers = [
    "출생시",
    "4주이내",
    "1개월",
    "2개월",
    "4개월",
    "6개월",
    "12개월",
    "15개월",
    "18개월",
    "19~23개월",
    "24~35개월",
    "4세",
    "6세",
    "11세",
    "12세",
  ];

  return (
    <div>
      <div className={styles.thDoseDateWrap}>
        {headers.map((header, i) => (
            <div className={`${styles.cell} ${styles.thDoseDate} ${typography.textBsBd}`} key={i}>
            {header}
            </div>
        ))}
      </div>
    </div>
  );
};
