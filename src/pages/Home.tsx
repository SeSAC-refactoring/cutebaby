import VaccinationCenters from '../components/vaccination-page/VaccinationCenters';
import VaccinationDetails from '../components/vaccination-page/VaccinationDetails';
import Loading from '../components/home-page/Loading';
import { useState } from 'react';
import { TopArea } from '../components/home-page/TopArea';
import { GrowthDiaryArea } from '../components/home-page/GrowthDiaryArea';
import { VaccinationArea } from '../components/home-page/VaccinationArea';
import { ChatbotArea } from '../components/home-page/ChatbotArea';

export default function Home() {
    const [openCentersModal, setOpenCentersModal] = useState<boolean>(false);
    const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리

    return (
        <main className="home relative mt-0 sm:mt-12">
            {/* 로딩 창 */}
            {loading && <Loading />}

            {/* 모달 */}
            {openCentersModal && (
                <VaccinationCenters setOpenCentersModal={setOpenCentersModal} />
            )}
            {openDetailsModal && (
                <VaccinationDetails setOpenDetailsModal={setOpenDetailsModal} />
            )}

            <section className="userArea min-h-0 grow flex flex-col">
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
            <ChatbotArea />
            <button className="sm:hidden btnShowChatbot absolute bottom-6 right-6 w-16 h-16 bg-orange-6 border-2 border-gray-6 rounded-2xl shadow-md">
                <img
                    src="img/icons/i-chatbot-solid-s36.svg"
                    alt="입력 아이콘"
                />
            </button>
        </main>
    );
}
