// 버튼 클릭 시 보여지는 차트 컴포넌트 (입력값에 따라 차트 변경)

import React from 'react';
import { ChartComponentProps } from './types';

export const ChartComponent = ({
    childData,
    growthData,
    percentileData,
}: ChartComponentProps) => {
    // 카테고리별 데이터 가공 (P3, P97)
    // const p3Height = percentileData.map((d) => ({
    //     age: d['개월수구분코드'],
    //     value: d['신장_P3'],
    // }));
    // const p97Height = percentileData.map((d) => ({
    //     age: d['개월수구분코드'],
    //     value: d['신장_P97'],
    // }));

    // const p3Weight = percentileData.map((d) => ({
    //     age: d['개월수구분코드'],
    //     value: d['체중_P3'],
    // }));
    // const p97Weight = percentileData.map((d) => ({
    //     age: d['개월수구분코드'],
    //     value: d['체중_P97'],
    // }));

    // const p3HeadCircumference = percentileData.map((d) => ({
    //     age: d['개월수구분코드'],
    //     value: d['머리둘레_P3'],
    // }));
    // const p97HeadCircumference = percentileData.map((d) => ({
    //     age: d['개월수구분코드'],
    //     value: d['머리둘레_P97'],
    // }));

    // 차트 데이터 필터링 (입력된 값이 있는 항목만 포함)
    // const datasets = [];

    // if (childData.height) {
    //     datasets.push(
    //         {
    //             label: '신장 P97 (상단선)',
    //             data: p97Height.map((d) => d.value),
    //             borderColor: 'red',
    //             borderWidth: 2,
    //             pointRadius: 2,
    //             fill: false,
    //         },
    //         {
    //             label: '신장 P3 (하단선)',
    //             data: p3Height.map((d) => d.value),
    //             borderColor: 'orange',
    //             borderWidth: 2,
    //             pointRadius: 2,
    //             fill: false,
    //         }
    //     );
    // }

    // if (childData.weight) {
    //     datasets.push(
    //         {
    //             label: '체중 P97 (상단선)',
    //             data: p97Weight.map((d) => d.value),
    //             borderColor: 'green',
    //             borderWidth: 2,
    //             pointRadius: 2,
    //             fill: false,
    //         },
    //         {
    //             label: '체중 P3 (하단선)',
    //             data: p3Weight.map((d) => d.value),
    //             borderColor: 'lightgreen',
    //             borderWidth: 2,
    //             pointRadius: 2,
    //             fill: false,
    //         }
    //     );
    // }

    // if (childData.headCircumference) {
    //     datasets.push(
    //         {
    //             label: '머리둘레 P97 (상단선)',
    //             data: p97HeadCircumference.map((d) => d.value),
    //             borderColor: 'purple',
    //             borderWidth: 2,
    //             pointRadius: 2,
    //             fill: false,
    //         },
    //         {
    //             label: '머리둘레 P3 (하단선)',
    //             data: p3HeadCircumference.map((d) => d.value),
    //             borderColor: 'pink',
    //             borderWidth: 2,
    //             pointRadius: 2,
    //             fill: false,
    //         }
    //     );
    // }

    // const chartData = {
    //     labels: growthData.map((d) => `${d['개월수구분코드']}개월`),
    //     datasets,
    // };

    return (
        <div>
            <h3>chart</h3>
            {/* <Line
                data={chartData}
                options={{ responsive: true, maintainAspectRatio: false }}
            /> */}
        </div>
    );
};
