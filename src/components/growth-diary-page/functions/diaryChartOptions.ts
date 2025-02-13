import { ChartOptions } from 'chart.js';

export const diaryChartOptions: ChartOptions<'line'> = {
    responsive: true, // 차트를 반응형으로 설정
    // maintainAspectRatio: false, // 차트의 가로세로비 유지 안함

    scales: {
        // X축 동작 설정
        x: {
            title: {
                display: true, // 제목을 보이도록
                text: '측정일', // X축 라벨
                // padding: { top: 10 }, // 축 제목과 축선 사이 간격 추가
                // align: 'end',
            },
            ticks: {
                display: false,
            },
        },

        //  Y축 동작 설정
        y: {
            type: 'linear',
            position: 'left',
            title: {
                display: false,
                // text: '측정값',
            },
            ticks: {
                display: false,
            },
            grid: {
                // drawOnChartArea: false, // 다른 Y축과 겹치는 그리드 제거
            },
        },
        yHeight: {
            // 키 (cm) Y축
            type: 'linear',
            position: 'left',
            title: {
                display: true,
                text: '키 (cm)',
            },
            grid: {
                drawOnChartArea: false, // 다른 Y축과 겹치는 그리드 제거
            },
            ticks: {
                display: true,
                // color: 'blue',
            },
            suggestedMin: 20, // 최소값 20
            suggestedMax: 180,
        },
        yWeight: {
            // 몸무게 (kg) Y축
            type: 'linear',
            position: 'left',
            title: {
                display: true,
                text: '몸무게 (kg)',
            },
            grid: {
                drawOnChartArea: false,
            },
            ticks: {
                display: true,
                // color: 'blue',
            },
            suggestedMin: 0, // 최소값 20
            suggestedMax: 100,
        },
        yHead: {
            // 머리둘레 (cm) Y축
            type: 'linear',
            position: 'right',
            suggestedMin: 30, // 최소값
            suggestedMax: 60, // 최대값
            title: {
                display: true,
                text: '머리둘레 (cm)',
            },
            grid: {
                drawOnChartArea: false,
            },
            ticks: {
                display: true,
                // color: 'blue',
            },
        },
    },

    plugins: {
        legend: {
            display: true, // 범례 활성화
            position: 'top',
            align: 'end',
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
