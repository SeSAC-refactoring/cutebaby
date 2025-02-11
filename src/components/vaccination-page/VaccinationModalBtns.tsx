import styles from '../../styles/Modal.module.scss';
import { VaccinationData } from '../types';

interface VaccinationModalBtnsProps {
    vaccinationid: number;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNewVaccinationData: React.Dispatch<
        React.SetStateAction<VaccinationData[]>
    >;
    inputData: VaccinationData[];
}

export const VaccinationModalBtns: React.FC<VaccinationModalBtnsProps> = ({
    vaccinationid,
    setIsOpen,
    setNewVaccinationData,
    inputData,
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
                        className={`${styles.modal_btn} ${styles.modal_cancel_button}`}
                        onClick={() => setIsOpen(false)}
                    >
                        취소
                    </button>
                    <button
                        className={`${styles.modal_btn} ${styles.modal_done_button}`}
                        onClick={() => {
                            setIsOpen(false);
                            setNewVaccinationData(inputData);
                        }} // 완료 버튼 클릭 시 데이터 저장
                    >
                        완료
                    </button>
                </>
            )}
        </div>
    );
};
