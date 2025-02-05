import React from 'react';
import { babyinfo } from '../types';

interface DiaryTableProps {
    babyInfo: babyinfo[];
    nothingBaby: boolean;
}

export const DiaryTable: React.FC<DiaryTableProps> = ({
    babyInfo,
    nothingBaby,
}) => {
    // 성장 기록 가져오기

    return (
        <div>
            <div>성장기록의 목록이 있을 공간</div>
        </div>
    );
};
