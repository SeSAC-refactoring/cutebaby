import React from 'react';
import { diseasesName } from './VaccinationTableData';
import typography from '../../../styles/commons/Typography.module.scss';
import styles from '../../../styles/Vaccination.module.scss';

export const Disease: React.FC = () => {
    return (
        <div>
            <div
                className={`${styles.cell} ${styles.th} ${styles.thDiseases} ${typography.textBsBd}`}
            >
                대상 감염병
            </div>
            <ul className={`${typography.textSmRg} ${styles.ulDiseases}`}>
                {diseasesName.map((disease, i) => (
                    <li
                        className={`${styles.cell} ${styles.td} ${styles.li} ${styles.liDiseases}`}
                        key={i}
                        style={{
                            height:
                                i === 2 ||
                                i === 5 ||
                                i === 6 ||
                                i === 7 ||
                                i === 10
                                    ? '100px'
                                    : '50px',
                        }}
                    >
                        {disease}
                    </li>
                ))}
            </ul>
        </div>
    );
};
