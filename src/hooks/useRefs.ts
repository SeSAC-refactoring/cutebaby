import { useRef } from 'react';

export type RefsType = {
    measurementDate: React.RefObject<HTMLInputElement>;
    height: React.RefObject<HTMLInputElement>;
    weight: React.RefObject<HTMLInputElement>;
    headCircumference: React.RefObject<HTMLInputElement>;

    province: React.RefObject<HTMLSelectElement>;
    city: React.RefObject<HTMLSelectElement>;
};

// ref 설정
export const useRefs = () => {
    return {
        measurementDate: useRef<HTMLInputElement>(null),
        height: useRef<HTMLInputElement>(null),
        weight: useRef<HTMLInputElement>(null),
        headCircumference: useRef<HTMLInputElement>(null),

        province: useRef<HTMLSelectElement>(null),
        city: useRef<HTMLSelectElement>(null),
    };
};
