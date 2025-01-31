import { useRef } from 'react';

// 입력 필드 ref
export const useRefs = () => {
    return {
        measurementDate: useRef<HTMLInputElement>(null),
        height: useRef<HTMLInputElement>(null),
        weight: useRef<HTMLInputElement>(null),
        headCircumference: useRef<HTMLInputElement>(null),
    };
};
