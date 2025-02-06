import React from 'react';

export const VaccineType: React.FC = () => {
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
        'LJEV(불활성화 백신)',
        'LJEV(약독화 생백신)',
        'HPV',
        'IIV',
    ];

    return (
        <div>
            <div>백신 종류 및 방법</div>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                {vaccines.map((vaccine, i) => (
                    <li key={i}>
                        <span>{vaccine}</span>
                        <span>{i + 1}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
