import { vaccinesData } from "./vaccination-table/VaccinationTableData";

interface VaccinationModalTitleProps {
  vaccinationid: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const VaccinationModalTitle: React.FC<VaccinationModalTitleProps> = ({
  vaccinationid,
  setIsOpen,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      {/* Title // 백신이름 */}
      <h3>
        {vaccinesData[vaccinationid - 1]?.name}
        {vaccinationid !== 17 && " 실접종일 입력"}
      </h3>

      {/* x 버튼 */}
      <div
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <img src="/img/icons/i-modal-close-s32.svg" alt="" />
      </div>
    </div>
  );
};
