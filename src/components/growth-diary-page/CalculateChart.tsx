import React, { useState } from 'react';
import { ChildData, LmsData, PercentileData, Percentiles } from '../types';
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
} from 'chart.js';
import { chartOptions } from './chartOptions';
import { createChartData } from './createChartData';
import { getP97P3Value } from './getP97P3Value';

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

export interface CalculateChartProps {
    childData: ChildData;
    filteredLmsDataByGender: LmsData[];
    filteredLmsDataByMonths: LmsData[];
    percentileData: PercentileData[]; // API에서 가져온 데이터 배열
    percentiles: Percentiles;
}

// 버튼 클릭 시 보여지는 차트 컴포넌트 (입력값에 따라 차트 변경)
export const CalculateChart: React.FC<CalculateChartProps> = ({
    childData,
    filteredLmsDataByGender,
    filteredLmsDataByMonths,
    percentileData,
    percentiles,
}) => {
    if (
        !childData ||
        !filteredLmsDataByGender ||
        !filteredLmsDataByMonths ||
        !percentileData
    )
        return <p>데이터가 부족합니다.</p>;

    let p97Height: { x: number; y: number }[] = [];
    let p3Height: { x: number; y: number }[] = [];
    let p97Weight: { x: number; y: number }[] = [];
    let p3Weight: { x: number; y: number }[] = [];
    let p97HeadCircumference: { x: number; y: number }[] = [];
    let p3HeadCircumference: { x: number; y: number }[] = [];

    const heightData = getP97P3Value('키', filteredLmsDataByGender);
    const weightData = getP97P3Value('몸무게', filteredLmsDataByGender);
    const headCircumferenceData = getP97P3Value(
        '머리둘레',
        filteredLmsDataByGender
    );

    // 신장 데이터
    if (childData.height) {
        p97Height = heightData.p97;
        p3Height = heightData.p3;
    }

    // 몸무게 데이터
    if (childData.weight) {
        p97Weight = weightData.p97;
        p3Weight = weightData.p3;
    }

    // 머리둘레 데이터
    if (childData.headCircumference) {
        p97HeadCircumference = headCircumferenceData.p97;
        p3HeadCircumference = headCircumferenceData.p3;
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

    return (
        <div>
            {/* 백분위수 */}
            <div>
                {childData.height && (
                    <div>
                        <p>신장 백분위수: {percentiles.height}</p>
                    </div>
                )}
                {childData.weight && (
                    <div>
                        <p>무게 백분위수: {percentiles.weight}</p>
                    </div>
                )}
                {childData.headCircumference && (
                    <div>
                        <p>
                            머리둘레레 백분위수:
                            {percentiles.headCircumference}
                        </p>
                    </div>
                )}
            </div>

            {/* 그래프 */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '40px',
                }}
            >
                {/* 신장 그래프 */}
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

                {/* 몸무게 그래프 */}
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

                {/* 머리둘레 그래프 */}
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
        </div>
    );
};
