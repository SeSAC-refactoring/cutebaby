import { AiChatComponent } from "./AiChatComponent";

export const ChatbotArea = () => {
  return (
    <aside className="chatbotArea">
      <div className="topWrap">
        <div className="guideArea">
          <img src="/img/icons/i-headphones-s24.svg" alt="챗봇 아이콘" />
          <div className="textWrap">
            <h4>궁금한 내용이 있으신가요?</h4>
            <p>
              무엇이든 <span>AI챗봇</span>
              에게 물어보세요😉
            </p>
          </div>
        </div>
        <div className="dateArea">
          {new Date().toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <AiChatComponent />
    </aside>
  );
};
