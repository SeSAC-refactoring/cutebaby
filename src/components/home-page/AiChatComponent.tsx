import React, { useState } from 'react';
import { useChatbot } from './hooks/useFetchChatbot';
import { useHandleKeyDown } from './hooks/useHandleKeyDown';
import { useInput } from '../../hooks/useInput';

export const AiChatComponent = () => {
    const { input, setInput, handleInputChange } = useInput('');
    const { handleSendMessage, messages, isLoading } = useChatbot();
    const handleKeyDown = useHandleKeyDown(handleSendMessage, input, setInput);

    return (
        <div>
            {/* 메세지를 보여주는 곳 */}
            <div>
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        style={{
                            margin: '10px 0',
                            textAlign: msg.role === 'user' ? 'right' : 'left',
                            border: '1px solid black',
                        }}
                    >
                        <strong>
                            {msg.role === 'user' ? '🙋‍♂️사용자 ' : '👼꼬물'}
                            <br />
                        </strong>
                        {` ${msg.content}`}
                    </div>
                ))}
                {isLoading && (
                    <span>
                        <strong>👼꼬물: </strong>답변을 기다리고 있습니다.
                    </span>
                )}
            </div>

            {/* 입력받는 곳 */}
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="메시지를 입력하세요."
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={() => handleSendMessage(input, setInput)}
                    disabled={isLoading}
                >
                    {isLoading ? '로딩중...' : '입력'}
                </button>
            </div>
        </div>
    );
};
