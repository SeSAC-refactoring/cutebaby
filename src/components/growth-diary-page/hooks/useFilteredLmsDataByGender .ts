import { useState, useEffect } from 'react';
import { ChildData, LmsData } from '../../types';

// lmsData // 성별과 일치하는 데이터만 필터링
export const useFilteredLmsDataByGender = (
    lmsData: LmsData[],
    childData: ChildData
) => {
    const [filteredLmsDataByGender, setFilteredLmsDataByGender] = useState<
        LmsData[]
    >([]);

    useEffect(() => {
        if (!lmsData || lmsData.length === 0 || !childData.gender) return;

        const genderCode = childData.gender === 'male' ? 1 : 2; // 남자는 1, 여자는 2
        const filtered = lmsData.filter(
            (data) => data['성별코드'] === genderCode
        );

        setFilteredLmsDataByGender(filtered);
        // console.log(
        //     '✅ useEffect - filteredLmsDataByGender 업데이트:',
        //     filtered
        // );
    }, [childData.gender, lmsData]);

    return { filteredLmsDataByGender };
};
