import React from 'react';
import { doses } from './VaccinationTableData';

export const TotalDoses: React.FC = () => {
    return (
        <div>
            <div
                style={{
                    width: '20px',
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
                횟수
            </div>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                {doses.map((dose, i) => (
                    <li
                        key={i}
                        style={{
                            whiteSpace: 'pre-line', // \n을 인식하여 줄바꿈 적용
                            width: '20px',
                            height: i === 10 ? '100px' : '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: '2px solid #E1E1E5',
                            borderRight: '3px solid #E1E1E5',
                            boxSizing: 'border-box',
                        }}
                    >
                        {dose}
                    </li>
                ))}
            </ul>
        </div>
    );
};
