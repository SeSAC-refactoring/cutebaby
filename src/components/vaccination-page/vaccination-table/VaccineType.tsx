import React, { useState } from 'react';
import { VaccinationModal } from '../VaccinationModal';
import { VaccinationData } from '../../types';

interface VaccineTypeProps {
    selectedBabyId: number;
}

export const VaccineType: React.FC<VaccineTypeProps> = ({ selectedBabyId }) => {
    const vaccines = [
        'HepB',
        'BCG(피내용)',
        'DTaP',
        'Tdap/Td',
        'IPV',
        'Hib',
        'PCV',
        'PPSV',
        'RV1',
        'RV5',
        'MMR',
        'VAR',
        'HepA',
        'IJEV\n(불활성화 백신)',
        'LJEV\n(약독화 생백신)',
        'HPV',
        'IIV',
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [newVaccinationData, setNewVaccinationData] =
        useState<VaccinationData>({
            babyid: selectedBabyId,
            vaccinationid: null,
            dosenumber: null,
            dosedate: null,
        });

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
                {vaccines.map((vaccine, i) => (
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
                        onClick={() => {
                            setIsOpen(true);
                        }}
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
                            onClick={() => {
                                setIsOpen(true);
                            }}
                        >
                            <img src="img/edit-contained.png"></img>
                            입력
                        </button>
                    </li>
                ))}
            </ul>
            {isOpen && (
                <VaccinationModal
                    setIsOpen={setIsOpen}
                    setNewVaccinationData={setNewVaccinationData}
                />
            )}
        </div>
    );
};
