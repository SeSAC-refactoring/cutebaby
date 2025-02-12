import React from "react";
import { VaccinationData } from "../../types";
import styles from "../../../styles/Vaccination.module.scss";
import { vaccinationScheduleData } from "./VaccinationTableData";

interface VaccinationScheduleProps {
  matchedVaccineList: (VaccinationData | null)[];
}

export const VaccinationSchedule: React.FC<VaccinationScheduleProps> = ({
  matchedVaccineList,
}) => {
  return (
    <>
      <div className={styles.vacScheduleCell}>
        {vaccinationScheduleData.flat().map((data, i) => {
          // flat()을 사용해 2차원 배열을 1차원 배열로 변환

          const matchedVaccine = matchedVaccineList[i];

          return (
            <div
              key={i}
              style={{
                // colSpan 값이 있으면 해당 크기만큼 병합
                gridColumn: data.colSpan ? `span ${data.colSpan}` : "span 1",
                height: i >= 137 && i <= 149 ? "100px" : "50px",
              }}
              className={
                !data.text
                  ? styles.blank
                  : matchedVaccine
                  ? data.vaccinationid &&
                    [13, 14, 16].includes(data.vaccinationid) &&
                    matchedVaccine.dosenumber === 1
                    ? styles.onlyFirst
                    : styles.completed
                  : data.vaccinationid === 8
                  ? styles.notMust
                  : styles.notCompleted
              }
            >
              {data.text}

              {/* 접종일 보여주기 // 없으면 빈칸 */}
              {matchedVaccine?.dosedate ? ( // ?.(optional chaining): obj가 null이거나 undefined일 경우 자동으로 undefined 반환
                <p className={styles.date}>{matchedVaccine.dosedate}</p>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
