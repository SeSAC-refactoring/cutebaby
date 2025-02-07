import { useState, useEffect } from 'react';
import { ChildData, LmsData } from '../../types';

// lmsData // 성별+개월수까지 일치하는 데이터 필터링
export const useFilteredLmsDataByMonths = (
    filteredLmsDataByGender: LmsData[],
    childData: ChildData
) => {
    const [filteredLmsDataByMonths, setFilteredLmsDataByMonths] = useState<
        LmsData[]
    >([]);

    useEffect(() => {
        if (childData.months !== null && childData.months !== undefined) {
            const filtered = filteredLmsDataByGender.filter(
                (data) => data['개월수구분코드'] === childData.months
            );
            setFilteredLmsDataByMonths(filtered);
            console.log(
                '✅ useEffect - filteredLmsDataByMonths 업데이트:',
                filtered
            );
        }
    }, [childData.months, filteredLmsDataByGender]);

    return filteredLmsDataByMonths;
};
