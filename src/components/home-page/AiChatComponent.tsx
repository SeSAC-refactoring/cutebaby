import React, { useState } from 'react';
import { useChatbot } from './hooks/useFetchChatbot';
import { useHandleKeyDown } from './hooks/useHandleKeyDown';
import { useInput } from '../../hooks/useInput';
import typography from '../../styles/commons/Typography.module.scss';
import styles from '../../styles/AIChatComponent.module.scss';
import { Input } from '../commons/Input';

export const AiChatComponent = () => {
    const { input, setInput, handleInputChange } = useInput('');
    const { handleSendMessage, messages, isLoading } = useChatbot();
    const handleKeyDown = useHandleKeyDown(handleSendMessage, input, setInput);

    return (
        <div className={styles.chatbotAreaWrap}>
            {/* 메세지를 보여주는 곳 */}
            <div className={styles.chat_wrapper}>
                <div className={styles.chatMessageAreaWrap}>
                    {messages.map((msg, i) => (
                        <div
                            className={styles.chatMessageArea}
                            key={i}
                            style={{
                                textAlign:
                                    msg.role === 'user' ? 'right' : 'left',
                            }}
                        >
                            <div
                                className={`${styles.chatMessageWrap} ${
                                    msg.role === 'user'
                                        ? styles.chat_user_message
                                        : styles.chat_ai_message
                                }`}
                            >
                                <strong className={typography.textXsBd}>
                                    {msg.role === 'user' ? '나' : '팀 꼬물'}
                                    <br />
                                </strong>
                                <div
                                    className={typography.textSmRg}
                                >{`${msg.content}`}</div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div
                            className={`${styles.chatLoadingMessage} ${typography.textBsMd}`}
                        >
                            답변을 기다리고 있어요, 조금만 기다려주세요..
                        </div>
                    )}
                </div>
            </div>

      {/* 입력받는 곳 */}
      <div className={styles.chat_input_wrapper}>
        <Input
          className={styles.inputWrap}
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="질문을 입력해주세요."
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={() => handleSendMessage(input, setInput)}
          disabled={isLoading}
          className={styles.chat_input_button}
        >
          {isLoading ? (
            <div className={`${styles.btnLoading}`}></div>
          ) : (
            <img src="img/icons/i-send-s32.svg" alt="입력 아이콘" />
          )}
        </button>
      </div>
    </div>
  );
            {/* 입력받는 곳 */}
            <div className={styles.chat_input_wrapper}>
                <Input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="질문을 입력해주세요."
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={() => handleSendMessage(input, setInput)}
                    disabled={isLoading}
                    className={styles.chat_input_button}
                >
                    {isLoading ? (
                        <div className={`${styles.btnLoading}`}></div>
                    ) : (
                        <img src="img/icons/i-send-s32.svg" alt="입력 아이콘" />
                    )}
                </button>
            </div>
        </div>
    );
};
