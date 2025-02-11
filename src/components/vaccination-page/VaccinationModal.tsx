// import styles from "../../styles/Vaccination.module.scss";
import styles from '../../styles/Modal.module.scss';
import { VaccinationData } from '../types';
import {
    diseasesName,
    vaccinesName,
} from './vaccination-table/VaccinationTableData';

interface VaccinationModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNewVaccinationData: React.Dispatch<
        React.SetStateAction<VaccinationData>
    >;
    vaccinationid: number;
    dosenumber: number;
}

export const VaccinationModal: React.FC<VaccinationModalProps> = ({
    setIsOpen,
    setNewVaccinationData,
    vaccinationid,
    dosenumber,
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
                        {/* id말고 백신이름으로 바꾸기 */}
                        {vaccinationid === 17 ? (
                            <div className={styles.modal_title}>
                                {vaccinesName[vaccinationid - 1]}
                            </div>
                        ) : (
                            <div className={styles.modal_title}>
                                {vaccinesName[vaccinationid - 1]} 실접종일 입력
                            </div>
                        )}
                        <div
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            style={{
                                fontSize: '40px',
                                cursor: 'pointer',
                            }}
                        >
                            X
                        </div>
                    </div>

                    {/* dosenumber만큼 input태그 생성 */}
                    {Array.from({ length: dosenumber }, (_, i) => {
                        let displayText = `${i + 1}차`; // 기본값

                        if (vaccinationid === 4) {
                            displayText = '6차';
                        } else if (vaccinationid === 8) {
                            displayText = '고위험군에 한하여 접종';
                        } else if (vaccinationid === 17) {
                            displayText = '매년 접종하세요';
                        }

                        return (
                            <div key={i}>
                                <p
                                // className={
                                //     vaccinationid === 17
                                //         ? styles.every_year
                                //         : styles.default
                                // }
                                >
                                    {displayText}
                                </p>

                                {/* vaccinationid === 17이면 input을 숨김 */}
                                {vaccinationid !== 17 && (
                                    <input
                                        className={styles.modal_input}
                                        key={i}
                                        type="date"
                                        // placeholder='' // 기본값을 데이터가 있으면 불러오고 없으면 오늘날짜로 new Date().toISOString().split('T')[0]
                                        // value={doseDates[i]}
                                        // onChange={(e) =>
                                        //     handleDateChange(i, e.target.value)
                                        // }
                                    />
                                )}
                            </div>
                        );
                    })}

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
                                    // onClick={handleSubmit} // 완료 버튼 클릭 시 데이터 저장
                                >
                                    완료
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
