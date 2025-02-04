import React from 'react';
import { Centers } from '../types';
import { VaccineListComponent } from './VaccineListComponent';

interface CenterListProps {
    centers: Centers[];
    toggleVaccineList: (orgcd: number) => void;
    showVaccineList: { [key: number]: boolean };
}

export const CenterList: React.FC<CenterListProps> = ({
    centers,
    toggleVaccineList,
    showVaccineList,
}) => {
    return (
        <ul>
            {centers.map((center) => (
                <li key={center.orgcd}>
                    <strong>{center.orgnm}</strong>
                    <br />
                    {`주소: ${center.orgAddr}`}
                    <br />
                    {`전화번호: ${center.orgTlno}`}
                    <br />
                    <button onClick={() => toggleVaccineList(center.orgcd)}>
                        {showVaccineList[center.orgcd]
                            ? '접종 목록 숨기기▲'
                            : '접종 목록 보기▼'}
                    </button>

                    {/* 선택된 병원의 백신 목록 표시 */}
                    {showVaccineList[center.orgcd] && (
                        <VaccineListComponent center={center} />
                    )}
                </li>
            ))}
        </ul>
    );
};
