import React, { useEffect, useState } from "react";
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
import { MobileFilterModal } from "./MobileFilterModal";

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
  const [isFilterModalOpen, setFilterModalOpen] = useState(false); // 모바일 모달 상태관리

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

  //모달열었을때 배경이 스크롤되는거 방지하기
  useEffect(() => {
    if (isOpen || isFilterModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen, isFilterModalOpen]);

  // 모달 열기 함수
  const handleOpenModal = (vaccineId: number) => {
    const doseValue = doses[vaccineId - 1] || "1";
    const doseNumber = doseValue === "-" ? 1 : Number(doseValue);

    setSelectedVaccineId(vaccineId);
    setSelectedDoseNumber(doseNumber);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* 검색 필터 영역 */}
      {/* 검색 버튼 */}
      <div className="sm:hidden max-sm:absolute top-6 right-6 h-[2rem] z-10">
        {/* 767px 이하에서만 보이게 */}
        <button
          className="flex items-center gap-2 h-full button button-xs button-purple"
          onClick={() => setFilterModalOpen(true)}
        >
          <span>검색 필터</span>
          <img src="img/icons/i-search-s20.svg" alt="성장일지 이미지" />
        </button>
      </div>

      {/* 검색 select 태그 */}
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
          <option value="" disabled hidden>
            개월 수 선택
          </option>
          <option value="">전체</option>
          {DoseDate.map((id, i) => (
            <option key={i} value={i}>
              {id}
            </option>
          ))}
        </select>

        {/* 대상 감염병 필터 (개월 수에 따라 목록 필터링) */}
        <select
          className="w-full"
          value={selectedDis === undefined ? "" : selectedDis} // 선택된 값이 없으면 기본값 표시
          onChange={(e) =>
            setDis(e.target.value === "" ? undefined : Number(e.target.value))
          }
        >
          <option value="" disabled hidden>
            대상 감염병
          </option>
          <option value="">전체</option>
          {filteredDiseases.map((diseaseIndex) => (
            <option key={diseaseIndex} value={diseaseIndex}>
              {diseasesData[diseaseIndex].name}
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
          <option value="" disabled hidden>
            접종여부
          </option>
          <option value="">전체</option>
          <option value="1">접종완료</option>
          <option value="2">미접종</option>
          <option value="3">접종진행</option>
          <option value="4">선택접종</option>
        </select>
      </section>

      {/* 예방접종 표 */}
      <section className="w-full block overflow-y-auto h-0 grow scrollbar-hidden">
        <table
          className="w-full 
          border-separate border-spacing-0 max-sm:mt-0"
        >
          <thead className=" bg-blue-3 text-blue-8 w-full sticky top-0">
            <tr className="w-full">
              <th className="text-left p-4 rounded-l-[0.5rem] w-[20%]">
                대상 감염병
              </th>
              <th className="text-left w-[20]%] p-2">백신 종류</th>
              <th className="w-[10%] max-sm:hidden">진행도</th>

              <th className="text-center w-[20%] max-sm:hidden">
                최근 접종 일자
              </th>

              <th className="w-[10%] max-sm:hidden">완료횟수</th>
              <th className="w-[10%] max-sm:hidden">권장횟수</th>
              <th className="rounded-r-[0.5rem] w-[10%] ">관리</th>
            </tr>
            {/* 테이블 사이 넓히는 용도 */}
            <tr className="h-2 invisible"></tr>
          </thead>

          <tbody className="w-full  min-h-[40vh] max-h-[50vh]">
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
                    // 감염병의 모든 백신 ID를 배열로 가져옴
                    const vaccineIds = Array.isArray(disease.vaccinationid)
                      ? disease.vaccinationid // 배열 그대로 사용
                      : [disease.vaccinationid]; // 단일 값도 배열로 변환

                    const completedDoses = matchedVaccineList.filter(
                      (v) => v?.vaccinationid === vaccine.vaccinationid
                    ).length;

                    acc.push(
                      <tr
                        key={`${diseaseIndex}-${vaccine.vaccinationid}`}
                        data-disease={diseaseIndex} // 감염병이름을 호버했을때 관련된 백신도 같이 호버되게 하게 아이디를 관리함
                        data-vaccine={vaccine.vaccinationid} // 백신을 호버
                        className={`${rowColor} h-[2.125rem] hover:bg-blue-3 transition disease-row`}
                      >
                        {/* 첫 번째 백신에서만 감염병 이름 출력 & rowSpan 설정 */}
                        {index === 0 ? (
                          <td
                            data-disease={diseaseIndex}
                            data-vaccine={vaccineIds.join(" ")} // 여러 개의 백신 ID를 공백으로 구분하여 저장
                            className="p-4 w-[20%] rounded-l-[0.5rem] border-r-0 border border-blue-3 transition disease-name"
                            rowSpan={filteredVaccines.length}
                            onMouseEnter={() => {
                              // 감염병 관련 모든 백신 색 변경
                              document
                                .querySelectorAll(
                                  `[data-disease="${diseaseIndex}"]`
                                )
                                .forEach((el) => el.classList.add("bg-blue-3"));

                              // 각각의 백신 ID에 대해 개별적으로 querySelectorAll 실행
                              vaccineIds.forEach((id) => {
                                document
                                  .querySelectorAll(`[data-vaccine~="${id}"]`) // 공백 포함 검색
                                  .forEach((el) =>
                                    el.classList.add("bg-blue-3")
                                  );
                              });
                            }}
                            onMouseLeave={() => {
                              document
                                .querySelectorAll(
                                  `[data-disease="${diseaseIndex}"]`
                                )
                                .forEach((el) =>
                                  el.classList.remove("bg-blue-3")
                                );

                              vaccineIds.forEach((id) => {
                                document
                                  .querySelectorAll(`[data-vaccine~="${id}"]`)
                                  .forEach((el) =>
                                    el.classList.remove("bg-blue-3")
                                  );
                              });
                            }}
                          >
                            {disease.name}
                          </td>
                        ) : null}

                        {/* 백신 이름 */}
                        <td
                          data-disease={diseaseIndex}
                          data-vaccine={vaccine.vaccinationid}
                          onMouseEnter={() => {
                            document
                              .querySelectorAll(
                                `[data-vaccine~="${vaccine.vaccinationid}"]`
                              )
                              .forEach((el) => el.classList.add("bg-blue-3"));
                          }}
                          onMouseLeave={() => {
                            document
                              .querySelectorAll(
                                `[data-vaccine~="${vaccine.vaccinationid}"]`
                              )
                              .forEach((el) =>
                                el.classList.remove("bg-blue-3")
                              );
                          }}
                          onClick={() => handleOpenModal(vaccine.vaccinationid)}
                          className="p-2 w-[20%] border-r-0 border border-blue-3 cursor-pointer max-sm:w-[20%]"
                        >
                          {vaccine.name}
                        </td>

                        {/* 진행도 TD */}
                        <td
                          data-disease={diseaseIndex}
                          data-vaccine={vaccine.vaccinationid}
                          onMouseEnter={() => {
                            document
                              .querySelectorAll(
                                `[data-vaccine~="${vaccine.vaccinationid}"]`
                              )
                              .forEach((el) => el.classList.add("bg-blue-3"));
                          }}
                          onMouseLeave={() => {
                            document
                              .querySelectorAll(
                                `[data-vaccine~="${vaccine.vaccinationid}"]`
                              )
                              .forEach((el) =>
                                el.classList.remove("bg-blue-3")
                              );
                          }}
                          onClick={() => handleOpenModal(vaccine.vaccinationid)}
                          className="max-sm:hidden min-w-[5rem] text-center border-x-0 border border-blue-3 cursor-pointer px-3 py-2 whitespace-nowrap"
                        >
                          {vaccine.doses === "-" ? (
                            <span className="bg-purple-2 inline-flex items-center justify-center px-1 py-2 min-w-[5rem] rounded-lg">
                              <img
                                src="/img/icons/i-plus-s12.svg"
                                className="mr-1"
                              />
                              선택접종
                            </span>
                          ) : completedDoses === 0 ? (
                            <span className="bg-coral-2 inline-flex items-center justify-center px-3 py-2 min-w-[5rem] rounded-lg">
                              <img
                                src="/img/icons/i-x-s12.svg"
                                className="mr-1"
                              />
                              미접종
                            </span>
                          ) : completedDoses === vaccine.doses ? (
                            <span className="bg-gray-1 inline-flex items-center gap-2 justify-center px-2 py-2 min-w-[5rem] rounded-lg">
                              <img
                                src="/img/icons/i-check-s12.svg"
                                className="mr-1"
                              />
                              완료
                            </span>
                          ) : (
                            <span className="bg-coral-2 inline-flex items-center justify-center px-3 py-2 min-w-[5rem] rounded-lg">
                              <span>{vaccine.name}</span>
                              <span className="ml-1">{completedDoses}차</span>
                            </span>
                          )}
                        </td>

                        {/* 최근 접종 일자 */}
                        <td
                          data-disease={diseaseIndex}
                          data-vaccine={vaccine.vaccinationid}
                          onMouseEnter={() => {
                            document
                              .querySelectorAll(
                                `[data-vaccine~="${vaccine.vaccinationid}"]`
                              )
                              .forEach((el) => el.classList.add("bg-blue-3"));
                          }}
                          onMouseLeave={() => {
                            document
                              .querySelectorAll(
                                `[data-vaccine~="${vaccine.vaccinationid}"]`
                              )
                              .forEach((el) =>
                                el.classList.remove("bg-blue-3")
                              );
                          }}
                          onClick={() => handleOpenModal(vaccine.vaccinationid)}
                          className="max-sm:hidden w-[20%] border-x-0 border border-blue-3 text-center cursor-pointer"
                        >
                          <VaccinationSchedule
                            matchedVaccineList={matchedVaccineList}
                            vaccinationid={vaccine.vaccinationid}
                          />
                        </td>

                        {/* 권장횟수 */}
                        <td
                          data-disease={diseaseIndex}
                          data-vaccine={vaccine.vaccinationid}
                          onMouseEnter={() => {
                            document
                              .querySelectorAll(
                                `[data-vaccine~="${vaccine.vaccinationid}"]`
                              )
                              .forEach((el) => el.classList.add("bg-blue-3"));
                          }}
                          onMouseLeave={() => {
                            document
                              .querySelectorAll(
                                `[data-vaccine~="${vaccine.vaccinationid}"]`
                              )
                              .forEach((el) =>
                                el.classList.remove("bg-blue-3")
                              );
                          }}
                          onClick={() => handleOpenModal(vaccine.vaccinationid)}
                          className="max-sm:hidden text-center w-[8%] border-x-0 border border-blue-3 cursor-pointer"
                        >
                          {vaccine.doses}
                        </td>

                        {/* 완료횟수 */}
                        <td
                          data-disease={diseaseIndex}
                          data-vaccine={vaccine.vaccinationid}
                          onMouseEnter={() => {
                            document
                              .querySelectorAll(
                                `[data-vaccine~="${vaccine.vaccinationid}"]`
                              )
                              .forEach((el) => el.classList.add("bg-blue-3"));
                          }}
                          onMouseLeave={() => {
                            document
                              .querySelectorAll(
                                `[data-vaccine~="${vaccine.vaccinationid}"]`
                              )
                              .forEach((el) =>
                                el.classList.remove("bg-blue-3")
                              );
                          }}
                          onClick={() => handleOpenModal(vaccine.vaccinationid)}
                          className="max-sm:hidden text-center w-[8%] border-x-0 border border-blue-3 cursor-pointer"
                        >
                          <VaccinationScheduleName
                            matchedVaccineList={matchedVaccineList}
                            vaccinationid={vaccine.vaccinationid}
                          />
                        </td>

                        {/* 관리버튼 */}
                        <td
                          data-disease={diseaseIndex}
                          data-vaccine={vaccine.vaccinationid}
                          onMouseEnter={() => {
                            document
                              .querySelectorAll(
                                `[data-vaccine~="${vaccine.vaccinationid}"]`
                              )
                              .forEach((el) => el.classList.add("bg-blue-3"));
                          }}
                          onMouseLeave={() => {
                            document
                              .querySelectorAll(
                                `[data-vaccine~="${vaccine.vaccinationid}"]`
                              )
                              .forEach((el) =>
                                el.classList.remove("bg-blue-3")
                              );
                          }}
                          onClick={() => handleOpenModal(vaccine.vaccinationid)}
                          className="w-[8%] rounded-r-[0.5rem] border-l-0 border border-blue-3 cursor-pointer"
                        >
                          <div className="flex justify-center items-center h-full">
                            <VaccineType
                              selectedBabyId={selectedBabyId}
                              vaccineIds={[vaccine.vaccinationid]}
                              matchedVaccineList={matchedVaccineList}
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
          matchedVaccineList={matchedVaccineList}
        />
      )}

      {isFilterModalOpen && (
        <MobileFilterModal
          selectedMonth={selectedMonth}
          selectedDis={selectedDis}
          selectedDose={selectedDose}
          setMonth={setMonth}
          setDis={setDis}
          setDose={setDose}
          onClose={() => setFilterModalOpen(false)}
        />
      )}
    </div>
  );
};
