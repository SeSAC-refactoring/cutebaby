// import styles from "../../styles/Vaccination.module.scss";
import styles from "../../styles/Modal.module.scss";
import { VaccinationData } from "../types";
// import { VaccinationModalBtns } from "./VaccinationModalBtns";
import { VaccinationModalDateRecord } from "./VaccinationModalDateRecord";
import { VaccinationModalTitle } from "./VaccinationModalTitle";

interface VaccinationModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vaccinationid: number;
  dosenumber: number;
  // setNewVaccinationData: React.Dispatch<
  //     React.SetStateAction<VaccinationData[]>
  // >;
  selectedBabyId: number | null;
}

export const VaccinationModal: React.FC<VaccinationModalProps> = ({
  setIsOpen,
  vaccinationid,
  dosenumber,
  // setNewVaccinationData,
  selectedBabyId,
}) => {
  return (
    <div
      style={{ right: "0" }}
      className={styles.modal_overlay}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.modalWrapW640}
      >
        {/* 🌟 모달 제목 */}
        <VaccinationModalTitle
          vaccinationid={vaccinationid}
          setIsOpen={setIsOpen}
        />

        {/* 🌟 접종 기록 // 접종한 날짜 보여주기 + 입력수정삭제 버튼 */}
        <VaccinationModalDateRecord
          vaccinationid={vaccinationid}
          dosenumber={dosenumber}
          selectedBabyId={selectedBabyId}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};
