import React from "react";
import { VaccinationData } from "../../types";
import styles from "../../../styles/Vaccination.module.scss";
import { vaccinationScheduleData } from "./VaccinationTableData";

interface VaccinationScheduleProps {
  selectedBabyVaccinationData: VaccinationData[];
}

export const VaccinationSchedule: React.FC<VaccinationScheduleProps> = ({
  selectedBabyVaccinationData,
}) => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(15, 68px)", // 15개의 동일한 너비의 컬럼 생성 // 1fr 말고 px ,% 등 사용 가능
          overflowX: "auto", // 표가 화면을 벗어나면 가로 스크롤 추가
        }}
      >
        {vaccinationScheduleData.flat().map((data, i) => {
          // flat()을 사용해 2차원 배열을 1차원 배열로 변환

          // selectedBabyVaccinationData에 일치하는 데이터 있는지 찾기
          let matchedVaccine = selectedBabyVaccinationData.find(
            (item) =>
              item.vaccinationid === data.vaccinationid &&
              item.dosenumber === data.dosenumber
          );

          // 벡신 1~2차 로 되어있는 칸일 경우 // vaccinationid(13, 14, 16) && dosenumber === 0일 경우
          // data.vaccinationid ===  13 || 14 ||16 이고 data.dosenumber === 0 인 항목은
          // data.vaccinationid === item.vaccinationid 일 떄, item.dosenumber가 1인 것만 있으면 1이 있는 항목으로 반환하고,
          // item.dosenumber가 2인 것이 있으면 2가 있는 걸로 반환
          if (
            data.vaccinationid &&
            [13, 14, 16].includes(data.vaccinationid) &&
            data.dosenumber === 0
          ) {
            const vaccine1 = selectedBabyVaccinationData.find(
              (item) =>
                item.vaccinationid === data.vaccinationid &&
                item.dosenumber === 1
            );
            const vaccine2 = selectedBabyVaccinationData.find(
              (item) =>
                item.vaccinationid === data.vaccinationid &&
                item.dosenumber === 2
            );

            if (vaccine2) {
              matchedVaccine = vaccine2; // dosenumber가 2이면 반환
            } else if (vaccine1) {
              matchedVaccine = vaccine1; // dosenumber가 1이면 반환
            }
          }

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
