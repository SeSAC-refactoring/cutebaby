import { ChartOptions } from 'chart.js';

export const calculateChartOptions: ChartOptions<'line'> = {
    responsive: true, // 차트를 반응형으로 설정
    maintainAspectRatio: false, // 차트의 가로세로비 유지 안함

    scales: {
        // X, Y 축 동작 설정
        x: {
            type: 'linear', // X축을 숫자(개월) 기반으로 설정
            title: {
                display: true, // 제목을 보이도록
                text: '만 나이 (개월)', // X축 라벨
                padding: { top: 10 }, // 축 제목과 축선 사이 간격 추가
            },
            ticks: {
                padding: 10, // 숫자(레이블)와 축선 사이 간격 추가
                // labelOffset: 5, // 숫자를 아래쪽으로 이동
            },
        },
        y: {
            title: {
                display: true,
                text: '신장 (cm)', // y축 라벨
            },
            // suggestedMin: 20, //  Y축 최소값 40cm (추천값으로 데이터에 따라 변경될 수 있음)
            // suggestedMax: 140, // y축 최대값 120cm
        },
    },

    plugins: {
        legend: {
            display: true, // 범례 활성화
            position: 'top', // 위치 (top, left, bottom, right 가능)
            align: 'end', // 정렬 (start, center, end 가능)
            labels: {
                boxWidth: 20, // 범례 박스 너비 (기본값: 40)
                boxHeight: 10, // 범례 박스 높이
                usePointStyle: true, // 포인트 스타일 사용 (true면 점 모양으로 표시)
                pointStyle: 'circle', // 점 모양 (circle, rect, triangle 등 가능)
                padding: 20, // 범례 아이템 간격
                font: {
                    size: 12, // 폰트 크기
                    weight: 600, // 폰트 굵기
                },
            },
        },
    },
};
