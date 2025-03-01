import { AiChatComponent } from './AiChatComponent';

export const ChatbotArea = () => {
    return (
        <aside className="chatbotArea hidden xl:block xs:w-[400px] xs:mt-20 bg-white border-2">
            <div>
                <div>
                    <img
                        src="/img/icons/i-headphones-s24.svg"
                        alt="챗봇 아이콘"
                    />
                </div>
                <div>
                    <div>궁금한 내용이 있으신가요?</div>
                    <div>
                        무엇이든 <span>AI챗봇</span>
                        에게 물어보세요😉
                    </div>
                </div>
            </div>
            <div>
                {new Date().toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </div>
            <AiChatComponent />
        </aside>
    );
};
