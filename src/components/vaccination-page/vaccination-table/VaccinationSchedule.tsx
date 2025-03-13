import React, { useState } from "react";
import { VaccinationData } from "../../types";
import { vaccinationScheduleData } from "./VaccinationTableData";

interface VaccinationScheduleProps {
  matchedVaccineList: (VaccinationData | null)[];
  vaccinationid: number | number[];
}

export const VaccinationSchedule: React.FC<VaccinationScheduleProps> = ({
  matchedVaccineList,
  vaccinationid,
}) => {
  // const [filterva, setFiltervac] = useState<String | null>();

  const filterVac = matchedVaccineList
    .filter((value) => value?.vaccinationid === vaccinationid)
    .map((v) => {
      return v?.dosedate;
    });

  console.log(">>>>", filterVac);
  return (
    <>
      <div>
        {/* {vaccinationScheduleData.flat().map((data, i) => {
          // flat()을 사용해 2차원 배열을 1차원 배열로 변환

          const matchedVaccine = matchedVaccineList[i];
          console.log(vaccinationid);
          console.log(matchedVaccine);
          console.log(matchedVaccine?.vaccinationid); */}
        {/* return ( */}
        <div
        // key={i}
        // style={{
        //   // colSpan 값이 있으면 해당 크기만큼 병합
        //   gridColumn: data.colSpan ? `span ${data.colSpan}` : "span 1",
        //   height: i >= 137 && i <= 149 ? "100px" : "50px",
        // }}
        // className={
        //   !data.text
        //     ? styles.cell
        //     : matchedVaccine
        //     ? data.vaccinationid &&
        //       [13, 14, 16].includes(data.vaccinationid) &&
        //       matchedVaccine.dosenumber === 1
        //       ? `
        //       : `
        //     : data.vaccinationid === 8
        //     ? `
        //     : `
        // }
        >
          {/* <img
              // className={
              //   !data.text
              //     ? styles.checkIconHidden
              //     : matchedVaccine
              //     ? data.vaccinationid &&
              //       [13, 14, 16].includes(data.vaccinationid) &&
              //       matchedVaccine.dosenumber === 1
              //       ? styles.checkIconHidden
              //       : styles.checkIconShow
              //     : data.vaccinationid === 8
              //     ? styles.notMust
              //     : styles.checkIconHidden
              // }
              src="/img/icons/i-check-s12.svg"
              alt=""
            /> */}
          {/* {matchedVaccineList[0]?.babyid} */}

          {filterVac.length == 0
            ? "접종이력없음"
            : filterVac[filterVac.length - 1]}
          {/* {matchedVaccine == null ? "접종 이력 없음" : filtervac} */}
          {/* 접종일 보여주기 // 없으면 빈칸 */}
          {/* {matchedVaccine?.dosedate ? ( // ?.(optional chaining): obj가 null이거나 undefined일 경우 자동으로 undefined 반환
                  <p>{matchedVaccine.dosedate}</p>
                ) : (
                  <></>
                )} */}
        </div>
      </div>
    </>
  );
};
