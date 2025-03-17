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
import { VaccinationScheduleName } from "./VaccinationScheduleName";
import { VaccinationModal } from "../VaccinationModal";

interface VaccinationTableProps {
  selectedBabyId: number | null;
}

export const VaccinationTable: React.FC<VaccinationTableProps> = ({
  selectedBabyId,
}) => {
  const { vaccinationData } = useSelector(
    (state: RootState) => state.vaccination
  );

  const [selectedMonth, setMonth] = useState<number | undefined>(); //선택개월수 상태관리
  const [selectedDis, setDis] = useState<number | undefined>(); // 선택감염병 상태관리
  const [selectedDose, setDose] = useState<number | undefined>();

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

  // console.log("matchedVaccineList >>", matchedVaccineList);
  // 모달 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVaccineId, setSelectedVaccineId] = useState<number | null>(
    null
  );
  const [selectedDoseNumber, setSelectedDoseNumber] = useState<number>(1);

  // 모달 열기 함수
  const handleOpenModal = (vaccineId: number) => {
    const doseValue = doses[vaccineId - 1] || "1";
    const doseNumber = doseValue === "-" ? 1 : Number(doseValue);

    setSelectedVaccineId(vaccineId);
    setSelectedDoseNumber(doseNumber);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="sm:hidden max-sm:absolute top-6 right-6 h-[2rem] z-50">
        {" "}
        {/* 767px 이하에서만 보이게 */}
        <button
          className="p-2 border border-gray-300 rounded-lg flex items-center gap-2 h-full"
          // onClick={() => setFilterOpen(!isFilterOpen)}
        >
          {/* <Filter className="w-5 h-5" /> */}
          <span>필터</span>
        </button>
      </div>
      <section className="flex gap-2 w-full max-sm:hidden">
        {/* 개월 수 필터 */}
        <select
          className="w-full"
          value={selectedMonth === undefined ? "" : selectedMonth} // 선택된 값이 없으면 기본값 표시
          onChange={(e) => {
            setMonth(
              e.target.value === "" ? undefined : Number(e.target.value)
            );
            setDis(undefined); // 개월 수 변경 시 감염병 선택 초기화
            setDose(undefined);
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
        <select
          className="w-full"
          value={selectedDose === undefined ? "" : selectedDose} // 선택된 값이 없으면 기본값 표시
          onChange={(e) =>
            setDose(e.target.value === "" ? undefined : Number(e.target.value))
          }
        >
          <option value="" disabled hidden selected>
            접종여부
          </option>
          <option value="">선택 안함</option>
          <option value="1">접종완료</option>
          <option value="2">미접종</option>
          <option value="3">접종진행</option>
          <option value="4">선택접종</option>
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

      <section className="w-full block overflow-y-auto h-full scrollbar-hidden">
        <table className="w-full mt-6  border-separate border-spacing-0 border-spacing-y-1 max-sm:mt-0">
          <thead className=" bg-blue-3 text-blue-8 w-full sticky top-0">
            <tr className="w-full">
              <th className="text-left p-4 rounded-l-[0.5rem] w-[20%]">
                대상 감염병
              </th>
              <th className="text-left w-[20%] p-2">백신 종류</th>
              <th className="text-center w-[20%]">최근 접종 일자</th>
              <th className="w-[8%]">권장횟수</th>
              <th className="w-[8%]">완료횟수</th>
              <th className="rounded-r-[0.5rem] w-[8%]">관리</th>
            </tr>
            {/* 테이블 사이 넓히는 용도 */}
            <tr className="h-2 invisible"></tr>
          </thead>

          <tbody className="w-full overflow-y-auto min-h-[40vh] max-h-[50vh]">
            {(() => {
              let hasResults = false; // 결과가 있는지 확인하기위한 변수선언

              const filteredRows = diseasesResult.reduce<React.ReactElement[]>(
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

                  //  필터링을 먼저 하고 최종적으로 출력할 백신 리스트 점검하기
                  const filteredVaccines = matchedVaccines.filter((vaccine) => {
                    const vacid = vaccine.vaccinationid;
                    const completedDoses = matchedVaccineList.filter(
                      (v) => v?.vaccinationid === vacid
                    ).length;

                    // vaccine.doses 값이 "-"인지 확인
                    const isOptionalVaccine = vaccine.doses === "-";
                    const doseCount =
                      typeof vaccine.doses === "number" ? vaccine.doses : 0; // "-"일 경우 0 처리

                    // "접종완료" 선택 시: 권장횟수와 완료횟수가 같은 경우만 표시
                    if (selectedDose === 1 && doseCount !== completedDoses) {
                      return false;
                    }

                    // "미접종" 선택 시: 완료횟수가 0인 경우만 표시
                    if (selectedDose === 2 && completedDoses > 0) {
                      return false;
                    }

                    //  "접종진행" 선택 시: 완료횟수가 1회 이상이면서, 권장횟수보다 적은 경우만 표시
                    if (
                      selectedDose === 3 &&
                      (completedDoses === 0 ||
                        completedDoses >= doseCount ||
                        isOptionalVaccine)
                    ) {
                      return false;
                    }

                    // "선택접종" 선택 시: doses 값이 "-"인 백신만 표시
                    if (selectedDose === 4 && !isOptionalVaccine) {
                      return false;
                    }

                    return true; // 필터 통과한 백신만 반환
                  });

                  // 필터링 후 남은 백신이 없다면 해당 질병은 출력하지 않음
                  if (filteredVaccines.length === 0) {
                    return acc;
                  }

                  hasResults = true; // 결과가 있으면 true로 설정

                  const isEvenDisease = diseaseIdx % 2 === 0;
                  const rowColor = isEvenDisease ? "bg-blue-1" : "bg-white";

                  filteredVaccines.forEach((vaccine, index) => {
                    acc.push(
                      <tr
                        key={`${diseaseIndex}-${vaccine.vaccinationid}`}
                        className={` ${rowColor} h-[2.125rem] hover:bg-blue-3 transition`}
                      >
                        {/* 첫 번째 백신에서만 감염병 이름 출력 & rowSpan 설정 */}
                        {index === 0 ? (
                          <td
                            className="p-4 w-[20%] rounded-l-[0.5rem] border-r-0 border border-blue-3"
                            rowSpan={filteredVaccines.length} // 필터링된 백신 수만큼 병합
                          >
                            {disease.name}
                          </td>
                        ) : null}

                        {/* 백신 이름 */}
                        <td
                          onClick={() => handleOpenModal(vaccine.vaccinationid)}
                          className="p-2 w-[30%] border-r-0 border border-blue-3 cursor-pointer"
                        >
                          {vaccine.name}
                        </td>
                        {/* 최근 접종 일자 */}
                        <td
                          onClick={() => handleOpenModal(vaccine.vaccinationid)}
                          className="w-[20%] border-x-0 border border-blue-3 text-center cursor-pointer"
                        >
                          <VaccinationSchedule
                            matchedVaccineList={matchedVaccineList}
                            vaccinationid={vaccine.vaccinationid}
                          />
                        </td>
                        {/* 권장횟수 */}
                        <td
                          onClick={() => handleOpenModal(vaccine.vaccinationid)}
                          className="text-center w-[8%] border-x-0 border border-blue-3 cursor-pointer"
                        >
                          {vaccine.doses}
                        </td>
                        {/* 완료횟수 */}
                        <td
                          onClick={() => handleOpenModal(vaccine.vaccinationid)}
                          className="text-center w-[8%] border-x-0 border border-blue-3 cursor-pointer"
                        >
                          <VaccinationScheduleName
                            matchedVaccineList={matchedVaccineList}
                            vaccinationid={vaccine.vaccinationid}
                          />
                        </td>
                        {/* 관리버튼 */}
                        <td
                          onClick={() => handleOpenModal(vaccine.vaccinationid)}
                          className="w-[8%] rounded-r-[0.5rem] border-l-0 border border-blue-3 cursor-pointer"
                        >
                          <div className="flex justify-center items-center h-full">
                            <VaccineType
                              selectedBabyId={selectedBabyId}
                              vaccineIds={[vaccine.vaccinationid]} // 개별적으로 백신 ID 전달
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  });

                  return acc;
                },
                [] // 빈 배열을 초기값으로 설정
              );

              // 필터링 결과가 없을 경우 "검색 결과 없음" 메시지 추가
              if (!hasResults) {
                return (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-4">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                );
              }

              return filteredRows;
            })()}
          </tbody>
        </table>
      </section>
      {isOpen && selectedVaccineId !== null && (
        <VaccinationModal
          setIsOpen={setIsOpen}
          vaccinationid={selectedVaccineId}
          dosenumber={selectedDoseNumber}
          selectedBabyId={selectedBabyId}
        />
      )}
    </div>
  );
};
