import { AiChatComponent } from '../components/home-page/AiChatComponent';
import styles from '../styles/Home.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { BabyList } from '../components/commons/BabyList';
import { useSelectBaby } from '../hooks/useSelectBaby';
import { useGrowData } from '../components/growth-diary-page/hooks/useGrowData';
import { DiaryChart } from '../components/growth-diary-page/DiaryChart';
import { Link } from 'react-router-dom';
import { useVaccinationData } from '../components/vaccination-page/hooks/useVaccinationData';
import { MissingVaccinations } from '../components/home-page/MissingVaccinations';

export default function Home() {
    const { babyInfo } = useSelector((state: RootState) => state.baby);
    const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);
    const { vaccinationData } = useSelector(
        (state: RootState) => state.vaccination
    );

    const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
    const { growData } = useGrowData(growInfo, selectedBabyId);
    const { selectedBabyVaccinationData } = useVaccinationData(
        vaccinationData,
        selectedBabyId
    );

    return (
        <div className={styles.background}>
            <div className={styles.block_user}>
                <div className={styles.big_title}>
                    땡땡이님,
                    <br />
                    안녕하세요
                </div>
                <div className={styles.small_title}>
                    우리아이{' '}
                    <span>예방접종을 관리하고, 성장일지를 기록</span>
                    해보세요:)
                </div>

                

                <div className={styles.main_content_section}>
                    <div className={styles.content_container}>
                    <BabyList
                    babyInfo={babyInfo}
                    handleSelectBaby={handleSelectBaby}
                    selectedBabyId={selectedBabyId}
                />
                        <div className={styles.growth_chart_section}>
                            <div className={styles.header}>
                                <p>우리아이 성장그래프</p>
                                <button>
                                    <Link to="/GrowthDiary">성장일지 보러가기</Link>
                                </button>
                            </div>
                            <Link to="/GrowthDiary">
                                <div className={styles.chart_container}>
                                    {growData.length > 0 ? (
                                        <DiaryChart growData={growData} />
                                    ) : (
                                        <div className={styles.empty}>
                                            데이터가 없습니다.
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </div>

                        <div className={styles.vaccination_section}>
                            <Link to="/Vaccination" className={styles.info_card}>
                                <p>다가오는 예방접종</p>
                                <MissingVaccinations
                                    selectedBabyVaccinationData={selectedBabyVaccinationData}
                                />
                            </Link>
                            <Link to="/VaccinationDetails" className={styles.info_card}>
                                <p>예방접종 대상 감염병 정보</p>
                                <p>바로가기</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.block_chatbot}>
                <div className={styles.chatbot}>
                    <div className={styles.chat_header}>
                        <div className={styles.icon}>🤖</div>
                        <div className={styles.text}>
                            <p className={styles.title}>궁금한 내용이 있으신가요?</p>
                            <p className={styles.subtitle}>우리아이도 AI챗봇에게 물어볼수있죠😊</p>
                            <p className={styles.date}>2024년 9월 24일</p>
                        </div>
                    </div>
                    <div className={styles.chat_content}>
                        {/* 채팅 내용이 여기에 들어갑니다 */}
                    </div>
                    <div className={styles.chat_input}>
                        
                       
                    </div>
                </div>
                <AiChatComponent />
            </div>
        </div>
    );
}