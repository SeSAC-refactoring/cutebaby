// Chart.js 설정
export const createChartData = (
    p97: { x: number; y: number }[],
    p3: { x: number; y: number }[],
    child: any,
    label: string
) => ({
    // 차트에 들어갈 데이터 세트
    datasets: [
        // P97 데이터
        {
            label: `P97 (상단선)`,
            data: p97, // { x: 개월수, y: 신장 } 형식
            borderColor: 'pink',
            backgroundColor: 'pink',
            pointRadius: 2, // 점 크기 // 기본값(3)
        },
        // P3 데이터
        {
            label: `P3 (하단선)`,
            data: p3,
            borderColor: 'skyblue',
            backgroundColor: 'skyblue',
            pointRadius: 2,
            // borderDash: [5, 5],
        },
        // 아이의 데이터
        {
            label: `아이의 ${label}`,
            data: child,
            borderColor: 'yellowgreen',
            backgroundColor: 'yellowgreen',
            pointRadius: 8,
        },
    ],
});
