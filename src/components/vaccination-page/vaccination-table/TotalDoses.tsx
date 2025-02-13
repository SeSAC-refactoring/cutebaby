import React from "react";
import { doses } from "./VaccinationTableData";
import typography from "../../../styles/commons/Typography.module.scss";
import styles from "../../../styles/Vaccination.module.scss";

export const TotalDoses: React.FC = () => {
  return (
    <div>
      <div
        className={`${styles.cell} ${styles.th} ${styles.thTotalDoses} ${typography.textBsBd}`}
      >
        횟수
      </div>
      <ul className={`${typography.textSmRg} ${styles.ulTotalDoses}`}>
        {doses.map((dose, i) => (
          <li
            className={`${styles.cell} ${styles.td}  ${styles.li} ${styles.liTotalDoses}`}
            key={i}
          >
            {dose}
          </li>
        ))}
      </ul>
    </div>
  );
};
