import { newGrowData } from '../../types';

// 그래프 데이터 생성
export const diaryChartData = (sortedGrowData: newGrowData[]) => {
    const data = {
        labels: sortedGrowData.map((data) => data.inputData), // X축 (날짜)
        datasets: [
            {
                label: '키 (cm)',
                data: sortedGrowData.map((data) => data.height),
                // yAxisID: 'y-height', // 개별 Y축 설정
                borderColor: '#FBD9C1',
                backgroundColor: '#FBD9C1',
            },
            {
                label: '몸무게 (kg)',
                data: sortedGrowData.map((data) => data.weight),
                // yAxisID: 'y-weight',
                borderColor: '#CCEBE3',
                backgroundColor: '#CCEBE3',
            },
            {
                label: '머리둘레 (cm)',
                data: sortedGrowData.map((data) => data.head),
                // yAxisID: 'y-head',
                borderColor: '#DDD8F5',
                backgroundColor: '#DDD8F5',
            },
        ],
    };

    return data;
};
