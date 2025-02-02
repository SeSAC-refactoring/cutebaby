import { useCallback } from 'react';

export const useHandleKeyDown = (
    handleSendMessage: (
        input: string,
        setInput: React.Dispatch<React.SetStateAction<string>>
    ) => void,
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>
) => {
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                handleSendMessage(input, setInput);
            }
        },
        [handleSendMessage, input, setInput]
    );

    return handleKeyDown;
};
