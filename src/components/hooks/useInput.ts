import { useState } from 'react';

export const useInput = (initialValue: string = '') => {
    const [input, setInput] = useState<string>(initialValue);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    return { input, setInput, handleInputChange };
};
