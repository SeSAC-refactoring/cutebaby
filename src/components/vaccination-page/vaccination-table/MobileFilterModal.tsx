import React from "react";
import { DoseDate } from "./DoseDate";
import { diseasesData, diseasesNameID } from "./VaccinationTableData";

interface FilterModalProps {
  selectedMonth: number | undefined;
  selectedDis: number | undefined;
  selectedDose: number | undefined;
  setMonth: React.Dispatch<React.SetStateAction<number | undefined>>;
  setDis: React.Dispatch<React.SetStateAction<number | undefined>>;
  setDose: React.Dispatch<React.SetStateAction<number | undefined>>;
  onClose: () => void; // 모달 닫기 함수
}

export const MobileFilterModal: React.FC<FilterModalProps> = ({
  selectedMonth,
  selectedDis,
  selectedDose,
  setMonth,
  setDis,
  setDose,
  onClose,
}) => {
  // 선택한 개월 수에 따라 감염병 목록 필터링
  const filteredDiseases =
    selectedMonth !== undefined
      ? diseasesNameID[selectedMonth]
      : diseasesData.map((_, i) => i);

  return (
    <div className="modalBg" onClick={onClose}>
      <div className="smallModal" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-end">
          <h3 className="pb-8">검색</h3>
          <div onClick={onClose} className="text-right">
            <img
              className="w-[1.5rem] inline-block pb-4"
              src="/img/Button-close.png"
              alt=""
            />

            <p className="text-2xs text-gray-4">
              *선택 안 함 선택 시 전체 선택됩니다.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {/* 개월 수 필터 */}
          <select
            value={selectedMonth ?? ""}
            onChange={(e) => {
              setMonth(
                e.target.value === "" ? undefined : Number(e.target.value)
              );
              setDis(undefined);
              setDose(undefined);
            }}
          >
            <option value="" disabled hidden>
              개월 수 선택
            </option>
            <option value="">선택 안함</option>
            {DoseDate.map((id, i) => (
              <option key={i} value={i}>
                {id}
              </option>
            ))}
          </select>
          {/* 대상 감염병 필터 */}
          <select
            value={selectedDis ?? ""}
            onChange={(e) =>
              setDis(e.target.value === "" ? undefined : Number(e.target.value))
            }
          >
            <option value="" disabled hidden>
              대상 감염병
            </option>
            <option value="">선택 안함</option>
            {filteredDiseases.map((diseaseIndex) => (
              <option key={diseaseIndex} value={diseaseIndex}>
                {diseasesData[diseaseIndex].name}
              </option>
            ))}
          </select>

          {/* 접종 여부 필터 */}
          <select
            value={selectedDose ?? ""}
            onChange={(e) =>
              setDose(
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
          >
            <option value="" disabled hidden>
              접종여부
            </option>
            <option value="">선택 안함</option>
            <option value="1">접종완료</option>
            <option value="2">미접종</option>
            <option value="3">접종진행</option>
            <option value="4">선택접종</option>
          </select>
        </div>
        {/* 닫기 버튼 */}
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="button button-sm button-blue">
            완료
          </button>
        </div>
      </div>
    </div>
  );
};
