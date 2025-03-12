import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import { DoseDate } from "./DoseDate";
import {
  diseasesData,
  vaccinesData,
  doses,
  diseasesNameID,
} from "./VaccinationTableData";
import { VaccineType } from "./VaccineType";

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

  return (
    <div className="flex flex-col w-full">
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
          <option>접종</option>
          <option>미접종</option>
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

      <section>
        <table className="w-full mt-6  border-separate border-spacing-0">
          <thead className=" bg-blue-3 text-blue-8 ">
            <tr>
              <th className="text-left p-4 rounded-l-[0.5rem]">대상 감염병</th>
              <th className="text-left p-4">백신 종류</th>
              <th className="p-4">권장횟수</th>
              <th>완료횟수</th>
              <th className="p-4 rounded-r-[0.5rem]">관리</th>
            </tr>
            {/* 테이블 사이 넓히는 용도 */}
            <tr className="after:content-[''] after:block after:h-6 bg-white"></tr>
          </thead>
          <tbody>
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
                      className={rowColor}
                    >
                      {index === 0 ? (
                        <td className="p-4" rowSpan={matchedVaccines.length}>
                          {disease.name}
                        </td>
                      ) : null}
                      {/* 백신이름 */}
                      <td className="w-[50%] p-4">{vaccine.name}</td>
                      {/* 권장횟수 */}
                      <td className="w-[10%] text-center p-4">
                        {vaccine.doses}
                      </td>
                      {/* 완료횟수 */}
                      <td className="w-[10%] text-center p-4">1</td>
                      {/* 관리버튼 */}
                      <td className="p-2">
                        <div className="flex justify-center p-4items-center h-full">
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
