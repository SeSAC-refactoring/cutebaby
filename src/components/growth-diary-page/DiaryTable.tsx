import React from 'react';
import { babyinfo } from '../types';
import styles from '../../styles/GrowthDiary.module.scss';

interface DiaryTableProps {
    babyInfo: babyinfo[];
    nothingBaby: boolean;
    selectedBabyId: number | null;
}

export const DiaryTable: React.FC<DiaryTableProps> = ({
    babyInfo,
    nothingBaby,
    selectedBabyId,
}) => {
    // 성장 기록 가져오기

    return (
        <div className={styles.list_wrap}>
            <div className={styles.row_title}>
                <div className={styles.list_title}>날짜</div>
                <div className={styles.list_title}>신장(cm)</div>
                <div className={styles.list_title}>체중(kg)</div>
                <div className={styles.list_title}>머리둘레(cm)</div>
            </div>
            <div className={styles.row_el}>
                <div className={styles.list_el}>2025-01-01</div>
                <div className={styles.list_el}>130</div>
                <div className={styles.list_el}>30</div>
                <div className={styles.list_el}>20</div>
            </div>
            <div className={styles.row_el}>
                <div className={styles.list_el}>2025-01-01</div>
                <div className={styles.list_el}>140</div>
                <div className={styles.list_el}>30</div>
                <div className={styles.list_el}>20</div>
            </div>
            <div className={styles.row_el}>
                <div className={styles.list_el}>2025-01-01</div>
                <div className={styles.list_el}>140</div>
                <div className={styles.list_el}>30</div>
                <div className={styles.list_el}>20</div>
            </div>
            <div className={styles.row_el}>
                <div className={styles.list_el}>2025-01-01</div>
                <div className={styles.list_el}>140</div>
                <div className={styles.list_el}>30</div>
                <div className={styles.list_el}>20</div>
            </div>
            <div className={styles.row_el}>
                <div className={styles.list_el}>2025-01-01</div>
                <div className={styles.list_el}>140</div>
                <div className={styles.list_el}>30</div>
                <div className={styles.list_el}>20</div>
            </div>
            <div className={styles.row_el}>
                <div className={styles.list_el}>2025-01-01</div>
                <div className={styles.list_el}>140</div>
                <div className={styles.list_el}>30</div>
                <div className={styles.list_el}>20</div>
            </div>
        </div>
    );
};
