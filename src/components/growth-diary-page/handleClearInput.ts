import React from 'react';
import { ChildData } from '../types';

export const handleClearInput = (
    setInputData: React.Dispatch<React.SetStateAction<ChildData>>,
    setChildData: React.Dispatch<React.SetStateAction<ChildData>>,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setInputData((prev) => ({
        ...prev,
        measurementDate: new Date(),
        months: null,
        height: null,
        weight: null,
        headCircumference: null,
    }));

    setChildData((prev) => ({
        ...prev,
        measurementDate: new Date(),
        months: null,
        height: null,
        weight: null,
        headCircumference: null,
    }));

    setShow(false);
};
