import React from 'react';
import { VaccinationData } from '../types';
import styles from '../../styles/Modal.module.scss';

interface VaccinationModalInputFieldsProps {
    dosenumber: number;
    vaccinationid: number;
    selectedBabyVaccinationData: VaccinationData[];
    setNewVaccinationData: React.Dispatch<
        React.SetStateAction<VaccinationData>
    >;
}

export const VaccinationModalInputFields: React.FC<
    VaccinationModalInputFieldsProps
> = ({
    dosenumber,
    vaccinationid,
    selectedBabyVaccinationData,
    setNewVaccinationData,
}) => {
    return (
        <>
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

                // input 태그의 날짜 기본값 설정: 접종일 있으면 접종일, 없으면 오늘 날짜
                const defaultDate =
                    matchedDose?.dosedate || // matchedDose가 null/undefined인 경우 오류 없이 undefined 반환 // ||: 왼쪽값이 undefined, null, '', false면 오른쪽 값 실행
                    new Date().toISOString().split('T')[0];

                // 이전 차수가 접종되지 않았으면 disabled
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
                                    : styles.default // 그 외
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
        </>
    );
};
