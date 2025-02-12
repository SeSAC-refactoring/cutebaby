import React, { useEffect, useState } from "react";
import { VaccinationModal } from "../VaccinationModal";
import { VaccinationData } from "../../types";
import { doses, vaccinesName } from "./VaccinationTableData";
import typography from "../../../styles/commons/Typography.module.scss";
import button from "../../../styles/commons/Button.module.scss";
import styles from "../../../styles/Vaccination.module.scss";

interface VaccineTypeProps {
  selectedBabyId: number | null;
  selectedBabyVaccinationData: VaccinationData[];
}

export const VaccineType: React.FC<VaccineTypeProps> = ({
  selectedBabyId,
  selectedBabyVaccinationData,
}) => {
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
    <div>
      <div
        className={`${styles.cell} ${styles.th} ${typography.textSmBd} ${styles.thVaccineType}`}
        style={{}}
      >
        백신 종류 및 방법
      </div>
      <ul className={`${styles.ulVaccineType} ${typography.textSmRg}`}>
        {vaccinesName.map((vaccine, i) => (
          <li
            className={`${styles.liVaccineType} ${styles.td}`}
            key={i}
            style={{
              height: i === 10 ? "100px" : "50px",
            }}
            onClick={() => handleOpenModal(i + 1)} // 클릭 시 해당 백신의 vaccinationid 저장
          >
            <span className={styles.vaccineName}>{vaccine} </span>
            {/* <span style={{ fontSize: "10px", color: "red" }}>{i + 1}</span> */}
            <button className={button.btn2xsCr}>
              <img src="img/edit-contained.png"></img>
              입력
            </button>
          </li>
        ))}
      </ul>

      {/* 선택된 백신접종 CURD 모달 열기 */}
      {isOpen && selectedVaccineId !== null && (
        <VaccinationModal
          setIsOpen={setIsOpen}
          vaccinationid={selectedVaccineId}
          dosenumber={selectedDoseNumber}
          selectedBabyVaccinationData={selectedBabyVaccinationData}
          setNewVaccinationData={setNewVaccinationData}
          selectedBabyId={selectedBabyId}
        />
      )}
    </div>
  );
};
