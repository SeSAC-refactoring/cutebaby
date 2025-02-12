import { useEffect, useState } from 'react';
import { ChildData, LmsData, PercentileData, Percentiles } from '../../types';
import { getPercentileValue } from '../functions/getPercentileValue';

// childData useState
export const usePercentiles = (
    childData: ChildData,
    percentileData: PercentileData[],
    filteredLmsDataByMonths: LmsData[]
) => {
    const [percentiles, setPercentiles] = useState<Percentiles>({
        height: null,
        weight: null,
        headCircumference: null,
    });

    useEffect(() => {
        if (!filteredLmsDataByMonths.length) return;

        const percentileHeight = getPercentileValue(
            '키',
            percentileData,
            childData.height,
            filteredLmsDataByMonths
        );
        const percentileWeight = getPercentileValue(
            '몸무게',
            percentileData,
            childData.weight,
            filteredLmsDataByMonths
        );
        const percentileHeadCircumference = getPercentileValue(
            '머리둘레',
            percentileData,
            childData.headCircumference,
            filteredLmsDataByMonths
        );

        setPercentiles({
            height: percentileHeight,
            weight: percentileWeight,
            headCircumference: percentileHeadCircumference,
        });
    }, [filteredLmsDataByMonths, percentileData, childData]);

    return { percentiles, setPercentiles };
};
