import React from "react";
import { Centers } from "../types";
import styles from "../../styles/vaccination_unit.module.scss";
import typography from "../../styles/commons/Typography.module.scss";

interface VaccineListProps {
  center: Centers;
}

export const VaccineList = ({ center }: VaccineListProps) => {
  return (
    <ul className={`${styles.vaccine_list_ul} ${typography.textBsRg}`}>
      {/* 데이터가 여러개면 (배열이면) */}
      {Array.isArray(center.vcnList.vcnInfo) ? (
        center.vcnList.vcnInfo.map((vaccine, i) => (
          <li key={i}>{vaccine.vcnNm}</li>
        ))
      ) : (
        // 데이터가 한개이면 (배열이 아니면)
        <li>{center.vcnList.vcnInfo.vcnNm}</li>
      )}
    </ul>
  );
};
