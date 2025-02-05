import { useRef } from 'react';

export type RefsType = {
    measurementDate: React.RefObject<HTMLInputElement | null>;
    height: React.RefObject<HTMLInputElement | null>;
    weight: React.RefObject<HTMLInputElement | null>;
    headCircumference: React.RefObject<HTMLInputElement | null>;

    province: React.RefObject<HTMLSelectElement | null>;
    city: React.RefObject<HTMLSelectElement | null>;
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
