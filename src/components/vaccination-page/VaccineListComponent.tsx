import React from 'react';
import { Centers } from '../types';

interface VaccineListProps {
    center: Centers;
}

export const VaccineListComponent = ({ center }: VaccineListProps) => {
    return (
        <ul>
            {/* 데이터가 여러개면 (배열이면) */}
            {Array.isArray(center.vcnList.vcnInfo) ? (
                center.vcnList.vcnInfo.map((vaccine, i) => (
                    <li key={i}>{vaccine.vcnNm}</li>
                ))
            ) : (
                // 데이터가 한개이면 (배열이 아니면)
                <li>{center.vcnList.vcnInfo.vcnNm}</li>
            )}
        </ul>
    );
};
