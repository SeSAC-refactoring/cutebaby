import { useEffect, useState } from 'react';
import { ChildData, LmsData, PercentileData, Percentiles } from '../../types';
import { getPercentileValue } from '../getPercentileValue';

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

        console.log('✅ usePercentiles 실행됨');
        console.log('📌 filteredLmsDataByMonths:', filteredLmsDataByMonths);
        console.log('📌 percentileData:', percentileData);
        console.log('📌 childData:', childData);

        console.log(
            '함수에몯ㅈ 랴ㅐ쟈돌미ㅏ너 ㅗㄻ🔵🔵🔵🔵🔵🔵🔵',
            getPercentileValue(
                '키',
                percentileData,
                childData.height,
                filteredLmsDataByMonths
            )
        );

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

        console.log(
            '✅ usePercentiles - percentile 값들:',
            percentileHeight,
            percentileWeight,
            percentileHeadCircumference
        );

        setPercentiles({
            height: percentileHeight,
            weight: percentileWeight,
            headCircumference: percentileHeadCircumference,
        });
    }, [filteredLmsDataByMonths, percentileData, childData]);

    return { percentiles, setPercentiles };
};
