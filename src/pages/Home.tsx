import VaccinationCenters from '../components/vaccination-page/VaccinationCenters';
import VaccinationDetails from '../components/vaccination-page/VaccinationDetails';
import Loading from '../components/home-page/Loading';
import { useState } from 'react';
import { TopArea } from '../components/home-page/TopArea';
import { GrowthDiaryArea } from '../components/home-page/GrowthDiaryArea';
import { VaccinationArea } from '../components/home-page/VaccinationArea';
import { ChatbotArea } from '../components/home-page/ChatbotArea';

export default function Home() {
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
    const [openCentersModal, setOpenCentersModal] = useState<boolean>(false);
    const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);
    const [openChatbot, setOpenChatbot] = useState<boolean>(false); // 챗봇 영역 관리

    return (
        <main className="home">
            {/* 로딩 창 */}
            {loading && <Loading />}

            {/* 모달 */}
            {openCentersModal && (
                <VaccinationCenters setOpenCentersModal={setOpenCentersModal} />
            )}
            {openDetailsModal && (
                <VaccinationDetails setOpenDetailsModal={setOpenDetailsModal} />
            )}

            <section className="userArea">
                <TopArea />
                <section className="dashboard">
                    {/* 성장그래프 영역 */}
                    <GrowthDiaryArea setLoading={setLoading} />

                    {/* 예방접종관련 배너 영역 */}
                    <VaccinationArea
                        setOpenDetailsModal={setOpenDetailsModal}
                        setOpenCentersModal={setOpenCentersModal}
                    />
                </section>
            </section>

            {/* 챗봇 */}
            {openChatbot && (
                <div className="modalBg">
                    <ChatbotArea setOpenChatbot={setOpenChatbot} />
                </div>
            )}
            <div className="hidden md:block md:w-[25rem]">
                <ChatbotArea setOpenChatbot={setOpenChatbot} />
            </div>

            <button
                className="floatingBtn"
                onClick={() => setOpenChatbot(true)}
            >
                <img
                    src="img/icons/i-chatbot-solid-s36.svg"
                    alt="입력 아이콘"
                />
            </button>
        </main>
    );
}
