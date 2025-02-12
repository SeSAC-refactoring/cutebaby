// import styles from "../../styles/Vaccination.module.scss";
import styles from '../../styles/Modal.module.scss';
import { VaccinationData } from '../types';
import { VaccinationModalBtns } from './VaccinationModalBtns';
import { VaccinationModalDateRecord } from './VaccinationModalDateRecord';
import { VaccinationModalTitle } from './VaccinationModalTitle';

interface VaccinationModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    vaccinationid: number;
    dosenumber: number;
    selectedBabyVaccinationData: VaccinationData[];
    setNewVaccinationData: React.Dispatch<
        React.SetStateAction<VaccinationData[]>
    >;
    selectedBabyId: number | null;
}

export const VaccinationModal: React.FC<VaccinationModalProps> = ({
    setIsOpen,
    vaccinationid,
    dosenumber,
    selectedBabyVaccinationData,
    setNewVaccinationData,
    selectedBabyId,
}) => {
    return (
        <div
            className={styles.modal_overlay}
            onClick={() => {
                setIsOpen(false);
            }}
        >
            <div
                className={styles.modal_background}
                onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
            >
                <div className={styles.modal_container}>
                    {/* 🌟 모달 제목 */}
                    <VaccinationModalTitle
                        vaccinationid={vaccinationid}
                        setIsOpen={setIsOpen}
                    />

                    {/* 🌟 접종 기록 // 접종한 날짜 보여주기 + 버튼 클릭 시 input 태그 보이기 */}
                    <VaccinationModalDateRecord
                        vaccinationid={vaccinationid}
                        dosenumber={dosenumber}
                        selectedBabyId={selectedBabyId}
                    />

                    {/* 🌟 버튼 */}
                    <VaccinationModalBtns
                        vaccinationid={vaccinationid}
                        setIsOpen={setIsOpen}
                        setNewVaccinationData={setNewVaccinationData}
                    />
                </div>
            </div>
        </div>
    );
};
