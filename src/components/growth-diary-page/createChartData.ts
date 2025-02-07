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
            borderWidth: 2,
            pointRadius: 2, // 점 크기 // 기본값(3)
            fill: false, // 선 아래를 색칠하지 않음 (꽉 찬 영역이 아님)
        },
        // P3 데이터
        {
            label: `P3 (하단선)`,
            data: p3,
            borderColor: 'skyblue',
            borderWidth: 2,
            pointRadius: 2,
            fill: false,
            borderDash: [5, 5],
        },
        // 아이의 데이터
        {
            label: `아이의 ${label}`,
            data: child,
            borderColor: 'green',
            backgroundColor: 'yellowgreen',
            pointRadius: 5,
            fill: false,
        },
    ],
});
