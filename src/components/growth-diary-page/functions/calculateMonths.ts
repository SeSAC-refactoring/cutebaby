import React from 'react';
import { useEffect } from 'react';
import { ChildData } from '../../types';

// 개월 수 계산하여 childData 업데이트
export const calculateMonths = (inputData: ChildData) => {
    if (!inputData.birthDate || !inputData.measurementDate) {
        return null;
    }

    const yearsDiff =
        inputData.measurementDate.getFullYear() -
        inputData.birthDate.getFullYear();
    const monthsDiff =
        inputData.measurementDate.getMonth() - inputData.birthDate.getMonth();

    const calculatedMonths = yearsDiff * 12 + monthsDiff;

    return calculatedMonths;
};
