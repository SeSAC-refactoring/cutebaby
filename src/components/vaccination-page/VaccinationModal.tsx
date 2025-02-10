// import styles from "../../styles/Vaccination.module.scss";
import styles from '../../styles/Modal.module.scss';
import { VaccinationData } from '../types';

interface VaccinationModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNewVaccinationData: React.Dispatch<
        React.SetStateAction<VaccinationData>
    >;
}

export const VaccinationModal: React.FC<VaccinationModalProps> = ({
    setIsOpen,
    setNewVaccinationData,
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
                    <div className={styles.modal_title_wrap}>
                        <div className={styles.modal_title}>실접종일 입력</div>
                        <div
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            style={{
                                fontSize: '40px',
                            }}
                        >
                            X
                        </div>
                    </div>
                    <input
                        type="date"
                        className={styles.modal_input}
                        placeholder={new Date().toISOString().split('T')[0]}
                    />
                    <div className={styles.modal_button_container}>
                        <button
                            className={`${styles.modal_btn} ${styles.modal_cancel_button}`}
                        >
                            취소
                        </button>
                        <button
                            className={`${styles.modal_btn} ${styles.modal_done_button}`}
                        >
                            완료
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
