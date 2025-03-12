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
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">대상 감염병</th>
              <th className="border border-gray-300 p-2">백신 종류</th>
              <th className="border border-gray-300 p-2">권장 접종 횟수</th>
              <th className="border border-gray-300 p-2">접종 횟수</th>
              <th className="border border-gray-300 p-2">관리</th>
            </tr>
          </thead>
          <tbody>
            {diseasesResult.map((diseaseIndex) => {
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

              return matchedVaccines.length > 0 ? (
                matchedVaccines.map((vaccine, index) => (
                  <tr key={`${diseaseIndex}-${vaccine.vaccinationid}`}>
                    {/* 첫 번째 백신일 경우만 감염병명 td 출력 */}
                    {index === 0 && (
                      <td
                        rowSpan={matchedVaccines.length}
                        className="border border-gray-300 p-2"
                      >
                        {disease.name}
                      </td>
                    )}
                    {/* 백신 종류 */}
                    <td className="border border-gray-300 p-2">
                      {vaccine.name}
                    </td>
                    {/* 권장 접종횟수 */}
                    <td className="border border-gray-300 p-2">
                      {vaccine.doses}
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={diseaseIndex}>
                  <td className="border border-gray-300 p-2">{disease.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};
