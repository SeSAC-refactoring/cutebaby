import React from 'react';
import { ChildData, LmsData, PercentileData } from '../types';
import { calculatePercentile } from './Calculate';

export const getPercentileValue = (
    growthType: string,
    percentileData: PercentileData[],
    childValue: number | null,
    filteredLmsDataByMonths: LmsData[]
) => {
    const currentChildLms = filteredLmsDataByMonths.find(
        (data) => data['영유아성장종류코드명'] === growthType
    );

    let percentileValue = null;
    if (currentChildLms) {
        percentileValue = calculatePercentile(
            percentileData,
            childValue,
            Number(currentChildLms['영유아성장도표L값']),
            Number(currentChildLms['영유아성장도표M값']),
            Number(currentChildLms['영유아성장도표S값'])
        );
    }

    return percentileValue;
};
