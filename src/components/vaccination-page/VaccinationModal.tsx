// import styles from "../../styles/Vaccination.module.scss";
import { log } from 'util';
import styles from '../../styles/Modal.module.scss';
import { VaccinationData } from '../types';
import {
    diseasesName,
    vaccinesName,
} from './vaccination-table/VaccinationTableData';

interface VaccinationModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    vaccinationid: number;
    dosenumber: number;
    selectedBabyVaccinationData: VaccinationData[];
    setNewVaccinationData: React.Dispatch<
        React.SetStateAction<VaccinationData>
    >;
}

export const VaccinationModal: React.FC<VaccinationModalProps> = ({
    setIsOpen,
    vaccinationid,
    dosenumber,
    selectedBabyVaccinationData,
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
                    {/* 🚩 모달 제목 */}
                    <div className={styles.modal_title_wrap}>
                        {/* id말고 백신이름으로 바꾸기 */}
                        <div className={styles.modal_title}>
                            {vaccinesName[vaccinationid - 1]}
                            {vaccinationid !== 17 && ' 실접종일 입력'}
                        </div>

                        {/* x 버튼 */}
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

                    {/* 🚩 접종 기록 // 접종한 날짜 보여주기 */}
                    {vaccinationid !== 17 && (
                        <div>
                            <p>접종 기록</p>
                            {Array.from({ length: dosenumber }, (_, i) => {
                                const doseNum = i + 1; // 1차, 2차 ... 보여줄 것
                                const matchedDose =
                                    selectedBabyVaccinationData.find(
                                        (data) =>
                                            data.vaccinationid ===
                                                vaccinationid &&
                                            data.dosenumber === doseNum
                                    );

                                return (
                                    <p key={i}>
                                        {vaccinationid === 4
                                            ? '6차 - '
                                            : vaccinationid === 8
                                              ? ''
                                              : `${doseNum}차 - `}
                                        {matchedDose
                                            ? matchedDose.dosedate
                                            : '미접종'}
                                    </p>
                                );
                            })}
                        </div>
                    )}

                    {/* 🚩 접종 입력 필드 // dosenumber만큼 input태그 생성 */}
                    {Array.from({ length: dosenumber }).map((_, i) => {
                        let displayText = `${i + 1}차`; // 기본값

                        let isDisabled = false;

                        if (vaccinationid === 4) {
                            displayText = '6차';
                        } else if (vaccinationid === 8) {
                            displayText = '고위험군에 한하여 접종';
                        } else if (vaccinationid === 17) {
                            displayText = '매년 접종하세요';
                        }

                        const matchedDose = selectedBabyVaccinationData.find(
                            (data) =>
                                data.vaccinationid === vaccinationid &&
                                data.dosenumber === i + 1
                        );

                        console.log('matchedDose', matchedDose);

                        // input 태그의 날짜 기본값 설정: 접종일 있으면 접종일, 없으면 오늘 날짜
                        const defaultDate =
                            matchedDose?.dosedate || // matchedDose가 null/undefined인 경우 오류 없이 undefined 반환 // ||: 왼쪽값이 undefined, null, '', false면 오른쪽 값 실행
                            new Date().toISOString().split('T')[0];

                        // 이전 차수가 접종되지 않았으면 `disabled`
                        if (i > 0) {
                            const prevDose = selectedBabyVaccinationData.find(
                                (data) =>
                                    data.vaccinationid === vaccinationid &&
                                    data.dosenumber === i
                            );
                            if (!prevDose) {
                                isDisabled = true;
                            }
                        }

                        return (
                            <div key={i}>
                                <p
                                    className={
                                        vaccinationid === 17
                                            ? styles.every_year // 인플루인자일 때
                                            : styles.default
                                    }
                                >
                                    {displayText}
                                </p>

                                {/* vaccinationid === 17이면 input을 숨김 */}
                                {vaccinationid !== 17 && (
                                    <input
                                        className={
                                            matchedDose
                                                ? styles.completed // 접종 완료한 차수
                                                : !isDisabled
                                                  ? styles.current // 현재 맞아야 할 차수
                                                  : styles.disabled // 비활성화된 차수
                                        }
                                        type="date"
                                        disabled={isDisabled} // 비활성화 설정
                                        defaultValue={defaultDate} // 기본값을 데이터가 있으면 불러오고 없으면 오늘날짜로 new Date().toISOString().split('T')[0]

                                        // value={doseDates[i]}
                                        // onChange={(e) =>
                                        //     handleDateChange(i, e.target.value)
                                        // }

                                        // 여기는 필요 없을듯.. 어차피 disabled라 클릭 못함
                                        // onFocus={(e) => {
                                        //     if (isDisabled) {
                                        //         // disabled 시 이전 차수 input으로 focus 이동
                                        //         const prevInput = e.target
                                        //             .closest('div') // 현재 클릭한 input이 포함된 가장 가까운 div 찾기
                                        //             ?.previousElementSibling // 바로 이전의 형제 요소 (div) 찾기
                                        //             ?.querySelector('input'); // 이전 div 내부의 input 찾기
                                        //         if (prevInput) {
                                        //             prevInput.focus(); // 이전 input 요소로 focus
                                        //         }
                                        //     }
                                        // }}
                                    />
                                )}
                            </div>
                        );
                    })}

                    {/* 🚩 버튼 */}
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
                                    onClick={() => setIsOpen(false)}
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
