import React from 'react';
import { newGrowData } from '../types';
import styles from '../../styles/GrowthDiary.module.scss';
import { useGrowData } from './hooks/useGrowData';

interface DiaryTableProps {
    growData: newGrowData[];
    // selectedBabyId: number | null;
}

export const DiaryTable: React.FC<DiaryTableProps> = ({ growData }) => {
    return (
        <div className={styles.list_wrap}>
            <div className={styles.row_title}>
                <div className={styles.list_title}>날짜</div>
                <div className={styles.list_title}>키(cm)</div>
                <div className={styles.list_title}>몸무게(kg)</div>
                <div className={styles.list_title}>머리둘레(cm)</div>
            </div>

            <div>
                {Array.isArray(growData) && growData.length > 0 ? (
                    <ul>
                        {growData.map((info, i) => (
                            <li key={i} className={styles.row_el}>
                                <div className={styles.list_el}>
                                    {info.inputData}
                                </div>
                                <div className={styles.list_el}>
                                    {info.height}
                                </div>
                                <div className={styles.list_el}>
                                    {info.weight}
                                </div>
                                <div className={styles.list_el}>
                                    {info.head}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul>
                        <li className={styles.row_el}>성장 기록이 없습니다.</li>
                    </ul>
                )}
            </div>
        </div>
    );
};
