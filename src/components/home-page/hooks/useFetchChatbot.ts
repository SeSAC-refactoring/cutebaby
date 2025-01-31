import { useCallback, useState } from 'react';
import { useLoading } from '../../hooks/useLoading';
import { Message } from '../../types';
import { fetchChatGPT } from '../fetchChatGPT';

export const useChatbot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const { isLoading, startLoading, stopLoading } = useLoading(); // 커스텀 훅 사용

    const handleSendMessage = useCallback(
        async (
            input: string,
            setInput: React.Dispatch<React.SetStateAction<string>>
        ) => {
            if (!input.trim()) return; // 입력값 없으면 반환

            const userMessage: Message = {
                role: 'user',
                content: input,
            };
            setMessages((prev) => [...prev, userMessage]);
            setInput('');
            startLoading();

            try {
                const response: string = await fetchChatGPT(input);
                const chatbotMessage: Message = {
                    role: 'assistant',
                    content: response,
                };
                setMessages((prev) => [...prev, chatbotMessage]);
            } catch (error) {
                console.error('ChatGPT 응답 처리 중 오류 발생', error);
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: '❗오류 발생' },
                ]);
            } finally {
                stopLoading(); // 로딩 종료
            }
        },
        []
    );

    return { handleSendMessage, messages, isLoading };
};
