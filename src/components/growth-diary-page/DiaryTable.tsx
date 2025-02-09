import React from 'react';
import { newGrowData } from '../types';
import styles from '../../styles/GrowthDiary.module.scss';

interface DiaryTableProps {
    selectedBabyId: number | null;
    growInfo: newGrowData[];
}

export const DiaryTable: React.FC<DiaryTableProps> = ({ selectedBabyId }) => {
    // 성장 기록 가져오기

    return (
        <div className={styles.list_wrap}>
            <div className={styles.row_title}>
                <div className={styles.list_title}>날짜</div>
                <div className={styles.list_title}>신장(cm)</div>
                <div className={styles.list_title}>체중(kg)</div>
                <div className={styles.list_title}>머리둘레(cm)</div>
            </div>

            {/* <div>
                {Array.isArray(growInfo) && growInfo.length > 0 ? (
                    <ul>
                        {growInfo
                            .flat() // 중첩 배열을 평탄화
                            .filter((info) => info.babyid === selectedBabyId) // 선택한 아기 ID에 맞는 데이터만 필터링
                            .map((info, index) => (
                                <li key={index}>
                                    {info.inputData} - 키: {info.height}
                                    cm, 몸무게: {info.weight}kg
                                </li>
                            ))}
                    </ul>
                ) : (
                    <p>성장 기록이 없습니다.</p>
                )}
            </div> */}

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
