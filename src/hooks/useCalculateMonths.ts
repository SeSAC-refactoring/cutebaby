import React from 'react';
import { useEffect } from 'react';
import { ChildData } from '../components/types';

// 개월 수 계산하여 childData 업데이트
export const useCalculateMonths = (
    childData: ChildData,
    setChildData: React.Dispatch<React.SetStateAction<ChildData>>
) => {
    useEffect(() => {
        if (!childData.birthDate || !childData.measurementDate) return;

        const yearsDiff =
            childData.measurementDate.getFullYear() -
            childData.birthDate.getFullYear();
        const monthsDiff =
            childData.measurementDate.getMonth() -
            childData.birthDate.getMonth();

        const calculatedMonths = yearsDiff * 12 + monthsDiff;
        setChildData((prev) => ({
            ...prev,
            months: calculatedMonths,
        }));
    }, [childData.measurementDate]); // measurementDate 변경 시에만 실행
};
