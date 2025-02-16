import React from "react";
import { Centers } from "../types";
import { VaccineList } from "./VaccineList";
import styles from "../../styles/vaccination_unit.module.scss";
import typography from "../../styles/commons/Typography.module.scss";
import button from "../../styles/commons/Button.module.scss";

interface CenterListProps {
  centers: Centers[];
  toggleVaccineList: (orgcd: number) => void;
  showVaccineList: { [key: number]: boolean };
}

export const CenterList: React.FC<CenterListProps> = ({
  centers,
  toggleVaccineList,
  showVaccineList,
}) => {
  const validCenters = (centers || []).filter(Boolean);
  console.log("validCenters", validCenters);

  return (
    <div className={styles.centerListArea}>
      {validCenters && validCenters.length > 0
        ? validCenters.map((center) => (
            <div key={center.orgcd} className={styles.container}>
              <div className={styles.content_wrap}>
                <div className={styles.contents_set}>
                  <h2 className={`${typography.textXlBd}`}>
                    {center.orgnm || "이름 없음"}
                  </h2>
                  <button
                    onClick={() => toggleVaccineList(center.orgcd)}
                    className={`${button.btnSmYw} ${typography.textBsBd}`}
                  >
                    {showVaccineList[center.orgcd]
                      ? "접종 가능 목록 ▲"
                      : "접종 가능 목록 ▼"}
                  </button>
                  {showVaccineList[center.orgcd] && (
                    <VaccineList center={center} />
                  )}
                </div>
                <div className={styles.contents_set}>
                  <div className={styles.contents_title}>병원주소</div>
                  <div className={styles.contents}>
                    {center.orgAddr || "주소 없음"}
                  </div>
                </div>
                <div className={styles.contents_set}>
                  <div className={styles.contents_title}>대표번호</div>
                  <img src="/img/phone-call-01.png" alt="전화기"></img>
                  <div className={`${styles.contents} ${styles.center_number}`}>
                    {center.orgTlno || "전화번호 없음"}
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};
