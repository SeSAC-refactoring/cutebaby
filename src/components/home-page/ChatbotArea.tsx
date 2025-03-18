import React from 'react';
import { useInput } from '../../hooks/useInput';
import { useChatbot } from './hooks/useFetchChatbot';
import { useHandleKeyDown } from './hooks/useHandleKeyDown';
import ReactMarkdown from 'react-markdown';
import { Input } from '../commons/Input';

interface chatbotAreaProps {
    setOpenChatbot: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatbotArea = ({ setOpenChatbot }: chatbotAreaProps) => {
    const { input, setInput, handleInputChange } = useInput('');
    const { handleSendMessage, messages, isLoading } = useChatbot();
    const handleKeyDown = useHandleKeyDown(handleSendMessage, input, setInput);

    return (
        <div className="modalBg">
            <aside className="chatbotArea">
                <div className="topWrap">
                    <div className="dateArea">
                        <p>
                            {new Date().toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>

                        <button
                            className="close"
                            onClick={() => setOpenChatbot(false)}
                        >
                            <img
                                src="img/Button-close.png"
                                // srcSet="img/Button-close.png 767w, img/icons/i-modal-close-s32.svg 768w"
                                // className="w-8 h-8"
                                alt="닫기"
                            />
                        </button>
                    </div>

                    {messages.length > 1 || (
                        <div className="guideArea">
                            <img
                                src="/img/icons/i-headphones-s24.svg"
                                alt="챗봇 아이콘"
                            />
                            <div className="textWrap">
                                <h4>궁금한 내용이 있으신가요?</h4>
                                <p>
                                    무엇이든 <span>AI챗봇</span>
                                    에게 물어보세요😉
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="chatbotMsgAreaWrap">
                    {/* 메세지를 보여주는 곳 */}
                    <div className="msgAreaWrap">
                        <div className="msgArea">
                            {messages.map((msg, i) => (
                                <div
                                    className={`msgWrap ${
                                        msg.role === 'user'
                                            ? 'userMsg'
                                            : 'AiMsg'
                                    }`}
                                    key={i}
                                    style={{
                                        textAlign:
                                            msg.role === 'user'
                                                ? 'right'
                                                : 'left',
                                    }}
                                >
                                    <strong>
                                        {msg.role === 'user' ? '나' : '팀 꼬물'}
                                    </strong>
                                    <p className="msgContents">
                                        <ReactMarkdown>{`${msg.content}`}</ReactMarkdown>
                                    </p>
                                </div>
                            ))}
                            {isLoading && (
                                <p className="loadingMsg">
                                    답변을 기다리고 있어요, 조금만
                                    기다려주세요..
                                </p>
                            )}
                        </div>
                    </div>

                    {/* 입력받는 곳 */}
                    <div className="inputArea">
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
                                <div className="btnLoading"></div>
                            ) : (
                                <img
                                    src="img/icons/i-send-s32.svg"
                                    alt="입력 아이콘"
                                />
                            )}
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
};
