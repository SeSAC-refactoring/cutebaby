import React from 'react';
import { ChildData } from '../types';

export const handleClearInput = (
    setInputData: React.Dispatch<React.SetStateAction<ChildData>>,
    setChildData: React.Dispatch<React.SetStateAction<ChildData>>
) => {
    setInputData((prev) => ({
        ...prev,
        measurementDate: null,
        month: null,
        height: null,
        weight: null,
        headCircumference: null,
    }));

    setChildData((prev) => ({
        ...prev,
        measurementDate: null,
        month: null,
        height: null,
        weight: null,
        headCircumference: null,
    }));
};
