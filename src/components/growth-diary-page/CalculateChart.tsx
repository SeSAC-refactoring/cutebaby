import React from 'react';
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
import { createChartData } from './functions/createChartData';
import { getP97P3Value } from './functions/getP97P3Value';
import { calculateChartOptions } from './functions/calculateChartOptions';

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

interface CalculateChartProps {
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

    // console.log("filteredLmsDataByGender", filteredLmsDataByGender);
    // console.log("filteredLmsDataByMonths", filteredLmsDataByMonths);
    // console.log("percentileData", percentileData);
    // console.log("percentiles", percentiles);

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
        : [null];
    const currentChildWeight = childData.weight
        ? [{ x: childData.months, y: childData.weight }]
        : [null];
    const currentChildHeadCircumference = childData.headCircumference
        ? [{ x: childData.months, y: childData.headCircumference }]
        : [null];

    // chartOptions
    const heightChartOptions = calculateChartOptions('신장 (cm)'); // 키 차트
    const weightChartOptions = calculateChartOptions('몸무게 (kg)'); // 몸무게 차트
    const headChartOptions = calculateChartOptions('머리둘레 (cm)'); // 머리둘레 차트

    return (
        <div className="results">
            <p>계산 결과</p>
            {/* 신장 그래프 */}
            {childData.height && (
                <div className="result">
                    <p className="result-title">키</p>
                    <div className="result-summary">
                        <div className="result-value">
                            <span>우리아이 키</span>
                            <strong>{childData.height} cm</strong>
                        </div>
                        <div className="result-percentile">
                            <p className="percentile-value">
                                <span>백분위</span>
                                <strong>{percentiles.height} %</strong>
                            </p>
                            <p className="percentile-description">
                                <span>또래의 </span>
                                <strong>
                                    {percentiles.height
                                        ? `상위 ${100 - percentiles.height}%`
                                        : '데이터 없음'}
                                </strong>
                                <span>에 해당</span>
                            </p>
                        </div>
                    </div>
                    <div className="result-chart">
                        <Line
                            data={createChartData(
                                p97Height,
                                p3Height,
                                currentChildHeight,
                                '키'
                            )}
                            options={heightChartOptions}
                        />
                    </div>
                </div>
            )}

            {/* 몸무게 그래프 */}
            {childData.weight && (
                <div className="result">
                    <p className="result-title">몸무게</p>
                    <div className="result-summary">
                        <div className="result-value">
                            <span>우리아이 몸무게:</span>
                            <strong>{childData.weight}cm</strong>
                        </div>
                        <div className="result-percentile">
                            <p className="percentile-value">
                                <span>백분위</span>
                                <strong>{percentiles.weight}%</strong>
                            </p>
                            <p className="percentile-discription">
                                또래의
                                <strong>
                                    {percentiles.weight
                                        ? `상위 ${100 - percentiles.weight}%`
                                        : '데이터 없음'}
                                </strong>
                                <span>에 해당</span>
                            </p>
                        </div>
                    </div>
                    <div className="result-chart">
                        <Line
                            data={createChartData(
                                p97Weight,
                                p3Weight,
                                currentChildWeight,
                                '몸무게'
                            )}
                            options={weightChartOptions}
                        />
                    </div>
                </div>
            )}

            {/* 머리둘레 그래프 */}
            {childData.headCircumference && (
                <div className="result">
                    <p className="result-title">머리둘레</p>
                    <div className="result-summary">
                        <div className="result-value">
                            <span>우리아이 머리둘레</span>
                            <strong>{childData.headCircumference}cm</strong>
                        </div>
                        <div className="result-percentile">
                            <p className="percentile-value">
                                <span>백분위</span>
                                <strong>
                                    {percentiles.headCircumference}%
                                </strong>
                            </p>
                            <p className="percentile-description">
                                <span>또래의</span>
                                <strong>
                                    {percentiles.headCircumference
                                        ? `상위 ${100 - percentiles.headCircumference}%`
                                        : '데이터 없음'}
                                </strong>
                                <span>에 해당</span>
                            </p>
                        </div>
                    </div>

                    <div className="result-chart">
                        <Line
                            data={createChartData(
                                p97HeadCircumference,
                                p3HeadCircumference,
                                currentChildHeadCircumference,
                                '머리둘레'
                            )}
                            options={headChartOptions}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
