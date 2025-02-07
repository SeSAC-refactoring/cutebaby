import { useState } from 'react';
import { ChildData } from '../../types';

export const useHandleInputChange = (childData: ChildData) => {
    const [inputData, setInputData] = useState<ChildData>({
        gender: childData.gender,
        birthDate: childData.birthDate,
        measurementDate: null,
        months: null,
        height: null,
        weight: null,
        headCircumference: null,
    });

    // 입력 필드 변경 시
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'measurementDate') {
            setInputData((prev) => ({
                ...prev,
                [name]: value ? new Date(value) : null,
            }));
            return;
        }

        setInputData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return { inputData, setInputData, handleInputChange };
};
