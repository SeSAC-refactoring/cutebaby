import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import { DoseDate } from "./DoseDate";
import {
  diseasesData,
  vaccinesData,
  doses,
  diseasesNameID,
  vaccinationScheduleData,
} from "./VaccinationTableData";

import { VaccineType } from "./VaccineType";
import { VaccinationSchedule } from "./VaccinationSchedule";

interface VaccinationTableProps {
  selectedBabyId: number | null;
}

export const VaccinationTable: React.FC<VaccinationTableProps> = ({
  selectedBabyId,
}) => {
  const { vaccinationData } = useSelector(
    (state: RootState) => state.vaccination
  );

  const [selectedMonth, setMonth] = useState<number | undefined>();
  const [selectedDis, setDis] = useState<number | undefined>();

  // 선택한 개월 수에 따라 감염병 목록 필터링 (선택 안함 시 모든 데이터 표시)
  const filteredDiseases =
    selectedMonth !== undefined
      ? diseasesNameID[selectedMonth]
      : diseasesData.map((_, i) => i);

  // 선택한 개월 수 & 감염병 필터링 적용
  const diseasesResult =
    selectedDis !== undefined
      ? filteredDiseases.filter((diseaseIndex) => diseaseIndex === selectedDis)
      : filteredDiseases;
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

  console.log("matchedVaccineList >>", matchedVaccineList);

  return (
    <div className="flex flex-col w-full ">
      <section className="flex gap-2 w-full">
        {/* 개월 수 필터 */}
        <select
          className="w-full"
          value={selectedMonth === undefined ? "" : selectedMonth} // 선택된 값이 없으면 기본값 표시
          onChange={(e) => {
            setMonth(
              e.target.value === "" ? undefined : Number(e.target.value)
            );
            setDis(undefined); // 개월 수 변경 시 감염병 선택 초기화
          }}
        >
          <option value="" disabled hidden selected>
            개월 수 선택
          </option>
          <option value="">선택 안함</option>
          {DoseDate.map((id, i) => (
            <option key={i} value={i}>
              {id}
            </option>
          ))}
        </select>

        {/* 접종 여부 필터 */}
        <select className="w-full">
          <option disabled hidden selected>
            접종여부
          </option>
          <option>접종완료</option>
          <option>미접종</option>
          <option>접종진행</option>
          <option>선택접종</option>
        </select>

        {/* 대상 감염병 필터 (개월 수에 따라 목록 필터링) */}
        <select
          className="w-full"
          value={selectedDis === undefined ? "" : selectedDis} // 선택된 값이 없으면 기본값 표시
          onChange={(e) =>
            setDis(e.target.value === "" ? undefined : Number(e.target.value))
          }
        >
          <option value="" disabled hidden selected>
            대상 감염병
          </option>
          <option value="">선택 안함</option>
          {filteredDiseases.map((diseaseIndex) => (
            <option key={diseaseIndex} value={diseaseIndex}>
              {diseasesData[diseaseIndex].name}
            </option>
          ))}
        </select>
      </section>

      <section className="w-full block overflow-y-auto h-[50vh] scrollbar-hidden">
        <table className="w-full mt-6  border-separate border-spacing-0 border-spacing-y-1">
          <thead className=" bg-blue-3 text-blue-8 w-full sticky top-0">
            <tr className="w-full">
              <th className="text-left p-4 rounded-l-[0.5rem] w-[20%]">
                대상 감염병
              </th>
              <th className="text-left w-[30%] p-2">백신 종류</th>
              <th className="text-left w-[20%]">최근 접종 일자</th>
              <th className="w-[8%]">권장횟수</th>
              <th className="w-[8%]">완료횟수</th>
              <th className="rounded-r-[0.5rem] w-[8%]">관리</th>
            </tr>
            {/* 테이블 사이 넓히는 용도 */}
            <tr className="h-2 invisible"></tr>
          </thead>

          <tbody className="w-full overflow-y-auto min-h-[40vh] max-h-[50vh]">
            {diseasesResult.reduce<React.ReactElement[]>(
              (acc, diseaseIndex, diseaseIdx) => {
                const disease = diseasesData[diseaseIndex];

                const matchedVaccines = Array.isArray(disease.vaccinationid)
                  ? vaccinesData.filter((v) =>
                      (disease.vaccinationid as number[]).includes(
                        Number(v.vaccinationid)
                      )
                    )
                  : vaccinesData.filter(
                      (v) => v.vaccinationid === disease.vaccinationid
                    );

                const isEvenDisease = diseaseIdx % 2 === 0;
                //색깔바꾸기
                const rowColor = isEvenDisease ? "bg-blue-1" : "bg-white";

                matchedVaccines.forEach((vaccine, index) => {
                  acc.push(
                    <tr
                      key={`${diseaseIndex}-${vaccine.vaccinationid}`}
                      className={` ${rowColor} h-[2.125rem]`}
                    >
                      {index === 0 ? (
                        <td
                          className="p-4 w-[20%] rounded-l-[0.5rem] border-r-0 border border-blue-3"
                          rowSpan={matchedVaccines.length}
                        >
                          {disease.name}
                        </td>
                      ) : null}
                      {/* 백신이름 */}
                      <td className="p-2 w-[30%] border-r-0 border border-blue-3 ">
                        {vaccine.name}
                      </td>
                      {/* 최근접종일자 */}
                      <td className=" w-[12%] border-x-0 border border-blue-3">
                        <VaccinationSchedule
                          matchedVaccineList={matchedVaccineList}
                          vaccinationid={disease.vaccinationid}
                        />
                      </td>
                      {/* 권장횟수 */}
                      <td className=" text-center  w-[8%] border-x-0 border border-blue-3">
                        {vaccine.doses}
                      </td>
                      {/* 완료횟수 */}
                      <td className=" text-center w-[8%] border-x-0 border border-blue-3">
                        1
                      </td>
                      {/* 관리버튼 */}
                      <td className="w-[8%] rounded-r-[0.5rem] border-l-0 border border-blue-3">
                        <div className="flex justify-center items-center h-full   ">
                          <VaccineType
                            selectedBabyId={selectedBabyId}
                            vaccineIds={
                              Array.isArray(disease.vaccinationid)
                                ? disease.vaccinationid
                                : [disease.vaccinationid]
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                });

                return acc;
              },
              [] // 빈 배열을 초기값으로 설정
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};
