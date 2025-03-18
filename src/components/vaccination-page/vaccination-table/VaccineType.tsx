import React, { useState } from "react";
import { VaccinationModal } from "../VaccinationModal";
import { doses, vaccinesData } from "./VaccinationTableData";

interface VaccineTypeProps {
  selectedBabyId: number | null;
  vaccineIds: number[]; // 감염병에 해당하는 백신 ID 리스트
  matchedVaccineList: any[];
}

export const VaccineType: React.FC<VaccineTypeProps> = ({
  selectedBabyId,
  vaccineIds,
  matchedVaccineList,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVaccineId, setSelectedVaccineId] = useState<number | null>(
    null
  );
  const [selectedDoseNumber, setSelectedDoseNumber] = useState<number>(1);
  const handleOpenModal = () => {
    if (vaccineIds.length === 0) return; // 백신이 없으면 실행 X

    const firstVaccineId = vaccineIds[0]; // 첫 번째 백신 ID 선택
    const doseValue = doses[firstVaccineId - 1] || "1";
    const doseNumber = doseValue === "-" ? 1 : Number(doseValue);

    setSelectedVaccineId(firstVaccineId);
    setSelectedDoseNumber(doseNumber);
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        disabled={vaccineIds.length === 0} // 백신 없으면 비활성화
      >
        <img src="/img/icons/i-edit-s12.svg" />
      </button>

      {isOpen && selectedVaccineId !== null && (
        <VaccinationModal
          setIsOpen={setIsOpen}
          vaccinationid={selectedVaccineId}
          dosenumber={selectedDoseNumber}
          selectedBabyId={selectedBabyId}
          matchedVaccineList={matchedVaccineList}
        />
      )}
    </>
  );
};
