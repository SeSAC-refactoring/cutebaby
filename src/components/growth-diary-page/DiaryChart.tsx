import React from 'react';
import { newGrowData } from '../types';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';

import { diaryChartOptions } from './functions/diaryChartOptions';
import { diaryChartData } from './functions/diaryChartData';

// Chart.js에 필요한 모듈
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface DiaryChartProps {
    growData: newGrowData[];
}

export const DiaryChart: React.FC<DiaryChartProps> = ({ growData }) => {
    const sortedGrowData = [...growData].sort(
        // [...]로 growData의 복사본을 만든 후 정렬 (원본 배열은 변경하지 않음)
        (a, b) =>
            new Date(a.inputData).getTime() - new Date(b.inputData).getTime()
    );

    // 그래프 옵션 설정
    return (
        <Line
            data={diaryChartData(sortedGrowData)}
            options={diaryChartOptions}
        />
    );
};
