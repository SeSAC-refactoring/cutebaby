import React from 'react';
import { diseasesName } from './VaccinationTableData';

export const Disease: React.FC = () => {
    return (
        <div>
            <div
                style={{
                    width: '104px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '56px',
                    backgroundColor: '#93CBDF',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    borderBottomLeftRadius: '16px',
                    borderTopLeftRadius: '16px',
                    borderRight: '3px solid #E1E1E5',
                    boxSizing: 'border-box',
                    position: 'sticky',
                    top: '0',
                }}
            >
                대상 감염병
            </div>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                {diseasesName.map((disease, i) => (
                    <li
                        key={i}
                        style={{
                            whiteSpace: 'pre-line', // \n을 인식하여 줄바꿈 적용
                            width: '104px',
                            height:
                                i === 2 ||
                                i === 5 ||
                                i === 6 ||
                                i === 7 ||
                                i === 10
                                    ? '100px'
                                    : '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: '2px solid #E1E1E5',
                            borderRight: '3px solid #E1E1E5',
                            boxSizing: 'border-box',
                        }}
                    >
                        {disease}
                    </li>
                ))}
            </ul>
        </div>
    );
};
