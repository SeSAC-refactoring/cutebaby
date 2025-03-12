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
  const [selectedMonth, setMonth] = useState<number>();

  const diseasesResult =
    selectedMonth !== undefined ? diseasesNameID[selectedMonth] : [];

  // const vacResult = vaccinesData.map((value) =>
  //   value.some((invalue) => invalue === selectedMonth)
  // );

  // console.log("vacRe", vacResult);

  // const vacIndexes = vacResult
  //   .map((value, index) => (value ? index : -1))
  //   .filter((index) => index !== -1);

  // console.log("vacIndex", vacIndexes);
  // console.log("diseasesResult", diseasesResult);

  // const vacList = diseasesResult.map((value) => {

  // });
  // const vaccinationDataList = diseasesResult.map((diseaseIndex) => {
  //   const vaccineIndexes = vaccinesNameID[diseaseIndex] || [];
  //   return {
  //     disease: diseasesName[diseaseIndex],
  //     vaccines: vaccineIndexes.map((vaccineIndex) => ({
  //       name: vaccinesName[vaccineIndex],
  //       dose: doses[vaccineIndex],
  //     })),
  //   };
  // });

  // console.log("asdf", vaccinationDataList);

  // console.log(vacIndexes);

  // console.log(diseasesResult);

  return (
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
            <option key={i} value={i}>
              {id}
            </option>
          ))}
        </select>
        <select className="w-full">
          <option disabled hidden selected>
            접종여부
          </option>
          <option>접종</option>
          <option>미접종</option>
        </select>
        <select className="w-full">
          <option disabled hidden selected>
            대상 감염병
          </option>
          {diseasesData.map((disease) => (
            <option>{disease.name}</option>
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
            </tr>
          </thead>
          <tbody>
            {diseasesResult.map((diseaseIndex) => {
              // const vaccineIndexes = vaccinesNameID[diseaseIndex] || [];

              return (
                <tr key={diseaseIndex}>
                  <td className="border border-gray-300 p-2">
                    {diseasesData[diseaseIndex].name}
                  </td>
                  <td className="border border-gray-300 p-2">{}</td>
                  {/* <td className="border border-gray-300 p-2">
                    {vaccineIndexes.map((vaccineIndex) => (
                      <div key={vaccineIndex}>{vaccinesName[vaccineIndex]}</div>
                    ))}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {vaccineIndexes.map((vaccineIndex) => (
                      <div key={vaccineIndex}>{doses[vaccineIndex]}</div>
                    ))}
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};
