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
    ChartOptions,
} from 'chart.js';

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
    // 그래프 데이터 생성
    const data = {
        labels: growData.map((data) => data.inputData), // X축 (날짜)
        datasets: [
            {
                label: '키 (cm)',
                data: growData.map((data) => data.height),
                borderColor: 'red',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.3,
            },
            {
                label: '몸무게 (kg)',
                data: growData.map((data) => data.weight),
                borderColor: 'blue',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.3,
            },
            {
                label: '머리둘레 (cm)',
                data: growData.map((data) => data.head),
                borderColor: 'green',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
            },
        ],
    };

    // 그래프 옵션 설정
    const diaryChartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '측정 날짜',
                },
            },
            y: {
                title: {
                    display: true,
                    text: '측정 값',
                },
                beginAtZero: false,
            },
        },
    };

    return (
        <div
            style={{
                width: '906px',
                height: '332px',
                marginTop: '24px',
                backgroundColor: 'skyblue',
            }}
        >
            <Line data={data} options={diaryChartOptions} />
        </div>
    );
};
