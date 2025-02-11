import React, { useEffect, useState } from 'react';
import { VaccinationModal } from '../VaccinationModal';
import { VaccinationData } from '../../types';
import { doses, vaccinesName } from './VaccinationTableData';

interface VaccineTypeProps {
    selectedBabyId: number | null;
    selectedBabyVaccinationData: VaccinationData[];
}

export const VaccineType: React.FC<VaccineTypeProps> = ({
    selectedBabyId,
    selectedBabyVaccinationData,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newVaccinationData, setNewVaccinationData] = useState<
        VaccinationData[]
    >([]); // 서버로 보낼 추가/수정된 백신 정보

    const [selectedVaccineId, setSelectedVaccineId] = useState<number | null>(
        null
    );
    const [selectedDoseNumber, setSelectedDoseNumber] = useState<number>(1); // 기본값 1
    const handleOpenModal = (vaccinationid: number) => {
        const doseValue = doses[vaccinationid - 1]; // doses 배열에서 해당 백신의 dose 값 가져오기
        const doseNumber = doseValue === '-' ? 1 : Number(doseValue); // dose 값이 '-'이면 1로 변경
        setSelectedVaccineId(vaccinationid);
        setSelectedDoseNumber(doseNumber);
        setIsOpen(true);
    };

    // useEffect(() => console.log(newVaccinationData), [newVaccinationData]); // 서버로 보낼 추가/수정된 백신 정보

    return (
        <div>
            <div
                style={{
                    width: '108px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '56px',
                    backgroundColor: '#93CBDF',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    borderRight: '3px solid #E1E1E5',
                    boxSizing: 'border-box',
                    position: 'sticky',
                    top: '0',
                }}
            >
                백신 종류 및 방법
            </div>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                {vaccinesName.map((vaccine, i) => (
                    <li
                        key={i}
                        style={{
                            whiteSpace: 'pre-line', // \n을 인식하여 줄바꿈 적용
                            width: '108px',
                            height: i === 10 ? '100px' : '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: '2px solid #E1E1E5',
                            borderRight: '3px solid #E1E1E5',
                            boxSizing: 'border-box',
                        }}
                        onClick={() => handleOpenModal(i + 1)} // 클릭 시 해당 백신의 vaccinationid 저장
                    >
                        <span>{vaccine} </span>
                        <span style={{ fontSize: '10px', color: 'red' }}>
                            {i + 1}
                        </span>
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
                        >
                            <img src="img/edit-contained.png"></img>
                            입력
                        </button>
                    </li>
                ))}
            </ul>

            {/* 선택된 백신접종 CURD 모달 열기 */}
            {isOpen && selectedVaccineId !== null && (
                <VaccinationModal
                    setIsOpen={setIsOpen}
                    vaccinationid={selectedVaccineId}
                    dosenumber={selectedDoseNumber}
                    selectedBabyVaccinationData={selectedBabyVaccinationData}
                    setNewVaccinationData={setNewVaccinationData}
                    selectedBabyId={selectedBabyId}
                />
            )}
        </div>
    );
};
