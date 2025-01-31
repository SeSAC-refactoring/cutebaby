import React from 'react';
import { ChartComponentProps } from '../types';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { CalculateP3, CalculateP97 } from './Calculate';

// Chart.js에서 필요한 요소 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// 버튼 클릭 시 보여지는 차트 컴포넌트 (입력값에 따라 차트 변경)
export const ChartComponent = ({
    childData,
    lmsData,
    percentileData,
}: ChartComponentProps) => {
    if (!childData || !lmsData || !percentileData)
        return <p>데이터가 부족합니다.</p>;

    // lmsData에서 아이의 성별과 일치하는 데이터만 필터링
    const genderCode = childData.gender === 'male' ? 1 : 2; // 아이의 성별을 숫자 코드로 변환 (1: 남자, 2: 여자)
    const filteredLmsDataByGender = lmsData.filter(
        (data) => data['성별코드'] === genderCode
    );

    let p97Height: { x: number; y: number }[] = [];
    let p3Height: { x: number; y: number }[] = [];
    let p97Weight: { x: number; y: number }[] = [];
    let p3Weight: { x: number; y: number }[] = [];
    let p97HeadCircumference: { x: number; y: number }[] = [];
    let p3HeadCircumference: { x: number; y: number }[] = [];

    // 신장 데이터
    if (childData.height) {
        // filteredLmsDataByGender에서 성장종류코드가 키인 데이터만 필터링
        const filteredLmsDataByHeight = filteredLmsDataByGender.filter(
            (data) => data['영유아성장종류코드명'] === '키'
        );

        // LMS값을 이용해 개월수에 따른 p97값 구하기
        p97Height = filteredLmsDataByHeight.map((data) => ({
            x: data['개월수구분코드'],
            y: CalculateP97(
                data['영유아성장도표L값'],
                data['영유아성장도표M값'],
                data['영유아성장도표S값']
            ),
        }));
        p3Height = filteredLmsDataByHeight.map((data) => ({
            x: data['개월수구분코드'],
            y: CalculateP3(
                data['영유아성장도표L값'],
                data['영유아성장도표M값'],
                data['영유아성장도표S값']
            ),
        }));
    }

    // 몸무게 데이터
    if (childData.weight) {
        // filteredLmsDataByGender에서 성장종류코드가 몸무게인 데이터만 필터링
        const filteredLmsDataByWeight = filteredLmsDataByGender.filter(
            (data) => data['영유아성장종류코드명'] === '몸무게'
        );

        p97Weight = filteredLmsDataByWeight.map((data) => ({
            x: data['개월수구분코드'],
            y: CalculateP97(
                data['영유아성장도표L값'],
                data['영유아성장도표M값'],
                data['영유아성장도표S값']
            ),
        }));
        p3Weight = filteredLmsDataByWeight.map((data) => ({
            x: data['개월수구분코드'],
            y: CalculateP3(
                data['영유아성장도표L값'],
                data['영유아성장도표M값'],
                data['영유아성장도표S값']
            ),
        }));
    }

    // 머리둘레 데이터
    if (childData.headCircumference) {
        // filteredLmsDataByGender에서 성장종류코드가 머리둘레인 데이터만 필터링
        const filteredLmsDataByHeadCircumference =
            filteredLmsDataByGender.filter(
                (data) => data['영유아성장종류코드명'] === '머리둘레'
            );
        p97HeadCircumference = filteredLmsDataByHeadCircumference.map(
            (data) => ({
                x: data['개월수구분코드'],
                y: CalculateP97(
                    data['영유아성장도표L값'],
                    data['영유아성장도표M값'],
                    data['영유아성장도표S값']
                ),
            })
        );
        p3HeadCircumference = filteredLmsDataByHeadCircumference.map(
            (data) => ({
                x: data['개월수구분코드'],
                y: CalculateP3(
                    data['영유아성장도표L값'],
                    data['영유아성장도표M값'],
                    data['영유아성장도표S값']
                ),
            })
        );
    }

    // 아이의 현재 데이터 (childData의 months를 X축 값으로 사용)
    const currentChildHeight = childData.height
        ? [{ x: childData.months, y: childData.height }]
        : [];
    const currentChildWeight = childData.weight
        ? [{ x: childData.months, y: childData.weight }]
        : [];
    const currentChildHeadCircumference = childData.headCircumference
        ? [{ x: childData.months, y: childData.headCircumference }]
        : [];

    // Chart.js 설정
    const createChartData = (
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

    const chartOptions: ChartOptions<'line'> = {
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {childData.height && (
                <div style={{ height: '400px' }}>
                    <p>연령별 신장</p>
                    <Line
                        data={createChartData(
                            p97Height,
                            p3Height,
                            currentChildHeight,
                            '신장'
                        )}
                        options={chartOptions}
                    />
                </div>
            )}
            {childData.weight && (
                <div style={{ height: '400px' }}>
                    <p>연령별 몸무게</p>
                    <Line
                        data={createChartData(
                            p97Weight,
                            p3Weight,
                            currentChildWeight,
                            '몸무게'
                        )}
                        options={chartOptions}
                    />
                </div>
            )}
            {childData.headCircumference && (
                <div style={{ height: '400px' }}>
                    <p>연령별 머리둘레</p>
                    <Line
                        data={createChartData(
                            p97HeadCircumference,
                            p3HeadCircumference,
                            currentChildHeadCircumference,
                            '머리둘레'
                        )}
                        options={chartOptions}
                    />
                </div>
            )}
        </div>
    );
};
