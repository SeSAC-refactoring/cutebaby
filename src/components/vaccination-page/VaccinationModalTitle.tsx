import { vaccinesData } from './vaccination-table/VaccinationTableData';

interface VaccinationModalTitleProps {
    vaccinationid: number;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const VaccinationModalTitle: React.FC<VaccinationModalTitleProps> = ({
    vaccinationid,
    setIsOpen,
}) => {
    return (
        <div className="flex justify-between items-center">
            {/* Title // 백신이름 */}
            <h2>
                {vaccinesData[vaccinationid - 1]?.name}
                <span className="sm:inline hidden">
                    {vaccinationid !== 17 && ' 실접종일 입력'}
                </span>
                <span className="sm:hidden"> 관리</span>{' '}
            </h2>

            {/* x 버튼 */}
            <div
                onClick={() => {
                    setIsOpen(false);
                }}
                className="cursor-pointer"
            >
                <img src="/img/Button-close.png" alt="" />
            </div>
        </div>
    );
};
