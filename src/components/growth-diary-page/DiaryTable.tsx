import React from 'react';
import { babyinfo } from '../types';

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
        <div>
            <div>성장기록의 목록이 있을 공간</div>
        </div>
    );
};
