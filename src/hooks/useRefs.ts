import { useRef } from 'react';

// ref 설정
export const useRefs = () => {
    return {
        measurementDate: useRef<HTMLInputElement>(null),
        height: useRef<HTMLInputElement>(null),
        weight: useRef<HTMLInputElement>(null),
        headCircumference: useRef<HTMLInputElement>(null),
    };
};
