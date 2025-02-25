import React, { useState } from "react";
import { useChatbot } from "./hooks/useFetchChatbot";
import { useHandleKeyDown } from "./hooks/useHandleKeyDown";
import { useInput } from "../../hooks/useInput";
import { Input } from "../commons/Input";
import ReactMarkdown from "react-markdown";

export const AiChatComponent = () => {
  const { input, setInput, handleInputChange } = useInput("");
  const { handleSendMessage, messages, isLoading } = useChatbot();
  const handleKeyDown = useHandleKeyDown(handleSendMessage, input, setInput);

  return (
    <div>
      {/* 메세지를 보여주는 곳 */}
      <div>
        <div>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.role === "user" ? "right" : "left",
              }}
            >
              <div
              // ${
              //     msg.role === 'user'
              //         ? styles.chat_user_message
              //         : styles.chat_ai_message
              // }`}
              >
                <strong>
                  {msg.role === "user" ? "나" : "팀 꼬물"}
                  <br />
                </strong>
                <div>
                  <ReactMarkdown>{`${msg.content}`}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div>답변을 기다리고 있어요, 조금만 기다려주세요..</div>
          )}
        </div>
      </div>

      {/* 입력받는 곳 */}
      <div>
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
        >
          {isLoading ? (
            <div></div>
          ) : (
            <img src="img/icons/i-send-s32.svg" alt="입력 아이콘" />
          )}
        </button>
      </div>
    </div>
  );
};
