import { useState } from 'react';

// input태그에서 현재 값 가져오는 hook
export const useInput = (initialValue: string = '') => {
    const [input, setInput] = useState<string>(initialValue);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    return { input, setInput, handleInputChange };
};
