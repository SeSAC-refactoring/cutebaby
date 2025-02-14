import styles from "../../styles/Modal.module.scss";
import { VaccinationData } from "../types";

interface VaccinationModalBtnsProps {
  vaccinationid: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewVaccinationData: React.Dispatch<
    React.SetStateAction<VaccinationData[]>
  >;
}

export const VaccinationModalBtns: React.FC<VaccinationModalBtnsProps> = ({
  vaccinationid,
  setIsOpen,
  setNewVaccinationData,
}) => {
  return (
    <div className={styles.modal_button_container}>
      {/* 인플루엔자의 경우 (vaccinationid === 17) */}
      {vaccinationid === 17 ? (
        <button
          className={`${styles.modal_btn} ${styles.modal_done_button}`}
          onClick={() => setIsOpen(false)}
        >
          확인
        </button>
      ) : (
        <>
          <button
            className={`${styles.modal_btn} ${styles.modal_done_button}`}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            확인
          </button>
        </>
      )}
    </div>
  );
};
