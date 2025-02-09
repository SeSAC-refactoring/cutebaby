import React from "react";
import { Centers } from "../types";
import { VaccineList } from "./VaccineList";
import styles from "../../styles/vaccination_unit.module.scss";

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
  return (
    <ul>
      {centers.map((center) => (
        // <li key={center.orgcd}>
        //   <strong>{center.orgnm}</strong>
        //   <br />
        //   {`주소: ${center.orgAddr}`}
        //   <br />
        //   {`전화번호: ${center.orgTlno}`}
        //   <br />
        //   <button onClick={() => toggleVaccineList(center.orgcd)}>
        //     {showVaccineList[center.orgcd]
        //       ? "접종 목록 숨기기▲"
        //       : "접종 목록 보기▼"}
        //   </button>

        //   {/* 선택된 병원의 백신 목록 표시 */}
        //   {showVaccineList[center.orgcd] && <VaccineList center={center} />}
        // </li>
        <div key={center.orgcd} className={styles.container}>
          <div className={styles.content_wrap}>
            <div
              className={styles.contents_set}
              style={{ justifyContent: "space-between" }}
            >
              <div className={`${styles.contents} ${styles.center_name}`}>
                {center.orgnm}
              </div>
              <button
                onClick={() => toggleVaccineList(center.orgcd)}
                className={styles.list_btn}
              >
                {showVaccineList[center.orgcd] ? "접종 목록 ▲" : "접종 목록 ▼"}
              </button>
              {/* <div className={styles.vaccine_list}>
                {showVaccineList[center.orgcd] && (
                  <VaccineList center={center} />
                )}
              </div> */}
            </div>
            <div className={styles.contents_set}>
              <div className={styles.contents_title}>병원주소</div>
              <div className={styles.contents}>{center.orgAddr}</div>
            </div>
            <div className={styles.contents_set}>
              <div className={styles.contents_title}>대표번호</div>
              <img src="/img/phone-call-01.png" alt="전화기"></img>
              <div className={`${styles.contents} ${styles.center_number}`}>
                {center.orgTlno}
              </div>
            </div>
            <div className={styles.btn_wrap}>
              <div className={styles.vaccine_list}>
                {showVaccineList[center.orgcd] && (
                  <VaccineList center={center} />
                )}
              </div>
              {/* <button
                onClick={() => toggleVaccineList(center.orgcd)}
                className={styles.list_btn}
              >
                {showVaccineList[center.orgcd] ? "접종 목록 ▲" : "접종 목록 ▼"}
              </button> */}
            </div>
            {/* {showVaccineList[center.orgcd] && <VaccineList center={center} />} */}
          </div>
        </div>
      ))}
    </ul>
  );
};
