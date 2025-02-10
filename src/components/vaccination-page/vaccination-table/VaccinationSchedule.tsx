import React from 'react';
import { useState } from 'react';
import { VaccinationData } from '../../types';
import { vaccinationScheduleData } from '../../commons/vaccinationScheduleData';
import VaccinationModal from '../VaccinationModal';

interface VaccinationScheduleProps {
    selectedBabyVaccinationData: VaccinationData[];
}
export const VaccinationSchedule: React.FC<VaccinationScheduleProps> = ({
    selectedBabyVaccinationData,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(15, 1fr)', // 15개의 동일한 너비의 컬럼 생성 // 1fr 말고 px ,% 등 사용 가능
                    overflowX: 'auto', // 표가 화면을 벗어나면 가로 스크롤 추가
                }}
            >
                {vaccinationScheduleData.flat().map((dose, i) => (
                    // flat()을 사용해 2차원 배열을 1차원 배열로 변환
                    <div
                        key={i}
                        style={{
                            // colSpan 값이 있으면 해당 크기만큼 병합
                            gridColumn: dose.colSpan
                                ? `span ${dose.colSpan}`
                                : 'span 1',
                            backgroundColor: dose.text
                                ? '#F7F6FD'
                                : 'transparent',
                            height: i >= 137 && i <= 149 ? '100px' : '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: '2px solid #E1E1E5',
                            borderRight: '3px solid #E1E1E5',
                            boxSizing: 'border-box',
                            fontSize: '16px',
                            flexDirection: 'column',
                            // cursor: dose.text ? "pointer" : "default",
                        }}
                    >
                        {dose.text}

                        {/* 접종일 보여주기 // 없으면 입력 버튼 */}
                        {dose.text &&
                            (() => {
                                const matchedVaccine =
                                    selectedBabyVaccinationData.find(
                                        (item) =>
                                            item.vaccinationid ===
                                                dose.vaccinationid &&
                                            item.dosenumber === dose.dosenumber
                                    );

                                return matchedVaccine?.dosedate ? (
                                    <p
                                        style={{
                                            width: '93px',
                                            height: '28px',
                                            backgroundColor: '#F3FAF8',
                                            borderRadius: '8px',
                                            border: '1px solid #B5E2D5',
                                            color: '#619486',
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        {matchedVaccine.dosedate}
                                        <img src="img/Button.png"></img>
                                    </p>
                                ) : (
                                    <button
                                        style={{
                                            width: '53px',
                                            height: '28px',
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '8px',
                                            border: '1px solid #FED7D9',
                                            color: '#FD757D',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            marginBottom: '4px',
                                        }}
                                        onClick={() => {
                                            setIsOpen(true);
                                        }}
                                    >
                                        <img src="img/edit-contained.png"></img>
                                        입력
                                    </button>
                                );
                            })()}
                    </div>
                ))}
            </div>
            {isOpen && <VaccinationModal setIsOpen={setIsOpen} />}
        </>
    );
};
