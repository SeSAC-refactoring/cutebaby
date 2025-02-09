import { newGrowData } from '../types';

// 그래프 데이터 생성
export const diaryChartData = (sortedGrowData: newGrowData[]) => {
    const data = {
        labels: sortedGrowData.map((data) => data.inputData), // X축 (날짜)
        datasets: [
            {
                label: '키 (cm)',
                data: sortedGrowData.map((data) => data.height),
                yAxisID: 'y-height', // 개별 Y축 설정
                borderColor: 'pink',
                backgroundColor: 'pink',
            },
            {
                label: '몸무게 (kg)',
                data: sortedGrowData.map((data) => data.weight),
                yAxisID: 'y-weight',
                borderColor: 'skyblue',
                backgroundColor: 'skyblue',
            },
            {
                label: '머리둘레 (cm)',
                data: sortedGrowData.map((data) => data.head),
                yAxisID: 'y-head',
                borderColor: 'grey',
                backgroundColor: 'grey',
            },
        ],
    };

    return data;
};
