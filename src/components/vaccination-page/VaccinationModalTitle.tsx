import styles from "../../styles/Modal.module.scss";
import typography from "../../styles/commons/Typography.module.scss";
import { vaccinesName } from "./vaccination-table/VaccinationTableData";

interface VaccinationModalTitleProps {
  vaccinationid: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const VaccinationModalTitle: React.FC<VaccinationModalTitleProps> = ({
  vaccinationid,
  setIsOpen,
}) => {
  return (
    <div className={styles.titleArea}>
      {/* Title // 백신이름 */}
      <div className={`${typography.text4xlBd}`}>
        {vaccinesName[vaccinationid - 1]}
        {vaccinationid !== 17 && " 실접종일 입력"}
      </div>

      {/* x 버튼 */}
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className={styles.closeBtn}
      >
        <img src="/img/icons/i-modal-close-s32.svg" alt="" />
      </div>
    </div>
  );
};
