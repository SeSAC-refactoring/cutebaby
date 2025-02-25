import React, { useState } from "react";
import { VaccinationModal } from "../VaccinationModal";
import { VaccinationData } from "../../types";
import { doses, vaccinesName } from "./VaccinationTableData";

interface VaccineTypeProps {
  selectedBabyId: number | null;
}

export const VaccineType: React.FC<VaccineTypeProps> = ({ selectedBabyId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newVaccinationData, setNewVaccinationData] = useState<
    VaccinationData[]
  >([]); // 서버로 보낼 추가/수정된 백신 정보

  const [selectedVaccineId, setSelectedVaccineId] = useState<number | null>(
    null
  );
  const [selectedDoseNumber, setSelectedDoseNumber] = useState<number>(1); // 기본값 1
  const handleOpenModal = (vaccinationid: number) => {
    const doseValue = doses[vaccinationid - 1]; // doses 배열에서 해당 백신의 dose 값 가져오기
    const doseNumber = doseValue === "-" ? 1 : Number(doseValue); // dose 값이 '-'이면 1로 변경
    setSelectedVaccineId(vaccinationid);
    setSelectedDoseNumber(doseNumber);
    setIsOpen(true);
  };

  // useEffect(() => console.log(newVaccinationData), [newVaccinationData]); // 서버로 보낼 추가/수정된 백신 정보

  return (
    <>
      <div>
        <div style={{}}>백신 종류 및 방법</div>
        <ul>
          {vaccinesName.map((vaccine, i) => (
            <li
              key={i}
              style={{
                height: i === 10 ? "100px" : "50px",
              }}
              onClick={() => handleOpenModal(i + 1)} // 클릭 시 해당 백신의 vaccinationid 저장
            >
              <span>{vaccine} </span>
              {/* <span style={{ fontSize: "10px", color: "red" }}>{i + 1}</span> */}
              <button>
                <img src="/img/icons/i-edit-s12.svg" />
                관리
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* 선택된 백신접종 CURD 모달 열기 */}
      {isOpen && selectedVaccineId !== null && (
        <VaccinationModal
          setIsOpen={setIsOpen}
          vaccinationid={selectedVaccineId}
          dosenumber={selectedDoseNumber}
          //   setNewVaccinationData={setNewVaccinationData}
          selectedBabyId={selectedBabyId}
        />
      )}
    </>
  );
};
