import React, { useState } from 'react';
import { useChatbot } from './hooks/useFetchChatbot';
import { useHandleKeyDown } from './useHandleKeyDown';
import { useInput } from '../hooks/useInput';

export const AiChatComponent = () => {
    const { input, setInput, handleInputChange } = useInput('');
    const { handleSendMessage, messages, isLoading } = useChatbot();
    const handleKeyDown = useHandleKeyDown(handleSendMessage, input, setInput);
    return (
        <div>
            <h1>챗봇</h1>
            <div>
                <div>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                margin: '10px 0',
                                textAlign:
                                    msg.role === 'user' ? 'right' : 'left',
                            }}
                        >
                            <strong>
                                {msg.role === 'user' ? '사용자 ' : '챗봇 '}:
                            </strong>
                            {` ${msg.content}`}
                        </div>
                    ))}
                    {isLoading && (
                        <span>
                            <strong>챗봇 : </strong>답변을 기다리고 있습니다.
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="메시지를 입력하세요."
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={() => handleSendMessage(input, setInput)}>
                        입력
                    </button>
                </div>
            </div>
        </div>
    );
};
