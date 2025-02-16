import { useCallback, useState } from "react";
import { useLoading } from "../../../hooks/useLoading";
import { Message } from "../../types";
import { fetchGemini } from "../fetchChatGPT";

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "무엇이 궁금하신가요?" },
  ]);
  const { isLoading, startLoading, stopLoading } = useLoading(); // 커스텀 훅 사용

  const handleSendMessage = useCallback(
    async (
      input: string,
      setInput: React.Dispatch<React.SetStateAction<string>>
    ) => {
      if (!input.trim()) return; // 입력값 없으면 반환

      const userMessage: Message = {
        role: "user",
        content: input,
      };
      setMessages((prev) => [...prev, userMessage]); // 사용자 입력 메시지 추가
      setInput("");
      startLoading();
      // console.log('handleSendMessage');

      try {
        const response = await fetchGemini(input);
        if (!response) throw new Error("Gemini API 응답 없음");

        const chatbotMessage: Message = {
          role: "assistant",
          content: response,
        };
        setMessages((prev) => [...prev, chatbotMessage]); // Gemini 응답 추가
      } catch (error) {
        // console.error("Gemini 응답 처리 중 오류 발생", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "❗오류 발생: 응답이 없습니다.",
          },
        ]);
      } finally {
        stopLoading(); // 로딩 종료
      }
    },
    []
  );

  return { handleSendMessage, messages, isLoading };
};
