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
        'IJEV\n(불활성화 백신)',
        'LJEV\n(약독화 생백신)',
        'HPV',
        'IIV',
    ];

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
                    >
                        <span>{vaccine} </span>
                        <span style={{ fontSize: '10px', color: 'red' }}>
                            {i + 1}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
