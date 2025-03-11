import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Disease } from "./Disease";
import { VaccineType } from "./VaccineType";
import { DoseDate } from "./DoseDate";
import { TotalDoses } from "./TotalDoses";
import { VaccinationSchedule } from "./VaccinationSchedule";
import { diseasesName, vaccinesName } from "./VaccinationTableData";
import { vaccinationScheduleData } from "./VaccinationTableData";
import { vaccinesNameID } from "./VaccinationTableData";

import { RootState } from "../../../store";
import { Input } from "../../commons/Input";
interface VaccinationTableProps {
  selectedBabyId: number | null;
}

export const VaccinationTable: React.FC<VaccinationTableProps> = ({
  selectedBabyId,
}) => {
  // Redux에서 정보 가져오기
  const { vaccinationData } = useSelector(
    (state: RootState) => state.vaccination
  );
  const [selectedMonth, setMonth] = useState<number>(); // 선택된 개월수 상태관리

  const result = vaccinesNameID.map(
    (
      value // 선택된 개월수가 들어있는 질병 이름들 찾기
    ) => value.some((invalue) => invalue === selectedMonth)
  );
  console.log(result); // 선택된개월수가 들어있는애는 true 반환 나머지는 false 반환 [true , false]

  //배열에서 true인 값을 가진 index번호추출
  const trueIndexes = result
    .map((value, index) => (value ? index : -1))
    .filter((index) => index !== -1);

  console.log(trueIndexes);

  console.log(vaccinesName[Number(trueIndexes)]);

  // 서버에 있는 데이터와 일치하는 백신 찾기 matchedVaccine
  const matchedVaccineList = vaccinationScheduleData.flat().map((data) => {
    // flat()을 사용해 2차원 배열을 1차원 배열로 변환

    // selectedBabyVaccinationData에 일치하는 데이터 있는지 찾기
    let matchedVaccine = vaccinationData.find(
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
      const vaccine1 = vaccinationData.find(
        (item) =>
          item.vaccinationid === data.vaccinationid && item.dosenumber === 1
      );
      const vaccine2 = vaccinationData.find(
        (item) =>
          item.vaccinationid === data.vaccinationid && item.dosenumber === 2
      );

      if (vaccine2) {
        matchedVaccine = vaccine2; // dosenumber가 2이면 반환
      } else if (vaccine1) {
        matchedVaccine = vaccine1; // dosenumber가 1이면 반환
      }
    }

    return matchedVaccine || null; // 없는 경우 null
  });

  return (
    <>
      <div className="flex flex-col w-full">
        <section className="flex gap-2 w-full">
          <select
            className="w-full"
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            <option disabled hidden selected>
              개월 수
            </option>
            {DoseDate.map((id, i) => (
              <option value={i} key={i}>
                {id}
              </option>
            ))}{" "}
          </select>
          <select className="w-full">
            <option key={1}>접종</option>
            <option key={2}>미접종</option>
          </select>
          <select className="w-full">
            <option>대상 감염병</option>
            {diseasesName.map((id, i) => (
              <option key={i}>{id}</option>
            ))}{" "}
          </select>
        </section>
        <div className="flex justify-between">
          <div>
            {
              //추출된 index번호와 백신이름의 index번호가 같은애들 필터
              trueIndexes.map((value) => (
                <li> {vaccinesName[Number(value)]}</li>
              ))
            }
          </div>
          {/* <Disease /> */}
          {/*
          <VaccineType selectedBabyId={selectedBabyId} />
          <TotalDoses /> */}

          <div>
            {/* <div>
              <DoseDate />
            </div> */}
            {/* <VaccinationSchedule matchedVaccineList={matchedVaccineList} /> */}
          </div>
        </div>
      </div>
    </>
  );
};
