import React, { useState } from "react";
import { useChatbot } from "./hooks/useFetchChatbot";
import { useHandleKeyDown } from "./hooks/useHandleKeyDown";
import { useInput } from "../../hooks/useInput";
import styles from "../../styles/AIChatComponent.module.scss";

export const AiChatComponent = () => {
  const { input, setInput, handleInputChange } = useInput("");
  const { handleSendMessage, messages, isLoading } = useChatbot();
  const handleKeyDown = useHandleKeyDown(handleSendMessage, input, setInput);

  return (
    <div>
      {/* 메세지를 보여주는 곳 */}
      <div className={styles.chat_wrapper}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              margin: "10px 0",
              textAlign: msg.role === "user" ? "right" : "left",
              //   border: "1px solid black",
            }}
            className={styles.chat_content}
          >
            <div
              className={
                msg.role === "user"
                  ? styles.chat_right_message_wrap
                  : styles.chat_left_message_wrap
              }
            >
              <strong>
                {msg.role === "user" ? "사용자 " : "꼬물"}
                <br />
              </strong>
              <div className={styles.chat_message}>{` ${msg.content}`}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <span>
            <strong>👼꼬물: </strong>답변을 기다리고 있습니다.
          </span>
        )}
      </div>

      {/* 입력받는 곳 */}
      <div className={styles.chat_input_wrapper}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="메시지를 입력해주세요."
          onKeyDown={handleKeyDown}
          className={styles.chat_input}
        />
        <button
          onClick={() => handleSendMessage(input, setInput)}
          disabled={isLoading}
          className={styles.chat_input_button}
        >
          {isLoading ? (
            "로딩중..."
          ) : (
            <img src="img/Send button.png" alt="입력 아이콘"></img>
          )}
        </button>
      </div>
    </div>
  );
};
