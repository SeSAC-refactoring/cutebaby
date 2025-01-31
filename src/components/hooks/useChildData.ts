import React, { useState } from 'react';
import { ChildData } from '../types';

export const useChildData = () => {
    const [childData, setChildData] = useState<ChildData>({
        gender: 'male',
        birthDate: new Date('2025-01-23'),
        measurementDate: null,
        months: null,
        height: null,
        weight: null,
        headCircumference: null,
    });

    return { childData, setChildData };
};
