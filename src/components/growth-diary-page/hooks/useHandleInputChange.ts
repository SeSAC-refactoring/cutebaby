import { useEffect, useState } from 'react';
import { ChildData } from '../../types';
import { calculateMonths } from '../calculateMonths';

export const useHandleInputChange = (childData: ChildData) => {
    const [inputData, setInputData] = useState<ChildData>({
        gender: childData.gender,
        birthDate: childData.birthDate,
        measurementDate: new Date(),
        months: null,
        height: null,
        weight: null,
        headCircumference: null,
    });

    // measurementDate가 변경될 때 useCalculateMonths 실행
    useEffect(() => {
        if (inputData.birthDate && inputData.measurementDate) {
            const newMonths = calculateMonths(inputData);
            setInputData((prev) => ({
                ...prev,
                months: newMonths,
            }));
        }
    }, [inputData.measurementDate, inputData.birthDate]); // 의존성 배열 추가

    // 입력 필드 변경 시
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData((prev) => ({
            ...prev,
            [name]:
                name === 'measurementDate'
                    ? value
                        ? new Date(value)
                        : null
                    : value,
        }));
    };

    return { inputData, setInputData, handleInputChange };
};
