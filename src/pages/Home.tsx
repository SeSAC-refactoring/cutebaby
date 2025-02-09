import { AiChatComponent } from '../components/home-page/AiChatComponent';
import styles from '../styles/Home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { Root } from 'react-dom/client';
import { BabyList } from '../components/commons/BabyList';
import { useSelectBaby } from '../hooks/useSelectBaby';
import { useGrowData } from '../components/growth-diary-page/hooks/useGrowData';
import { DiaryChart } from '../components/growth-diary-page/DiaryChart';
import { Link } from 'react-router-dom';
import { useVaccinationData } from '../components/vaccination-page/hooks/useVaccinationData';
import { MissingVaccinations } from '../components/home-page/MissingVaccinations';
import { vaccinationScheduleData } from '../components/commons/vaccinationScheduleData';

export default function Home() {
    // const dispatch = useDispatch<AppDispatch>();

    // userSlice로 user정보 받아와야 함

    const { babyInfo } = useSelector((state: RootState) => state.baby);
    const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);
    const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
    const { growData } = useGrowData(growInfo, selectedBabyId); // growData = growInfo를 selectedBabyId에 따라 필터링 // selectedBabyId가 변경될 때 growData 업데이트
    const { vaccinationData } = useSelector(
        (state: RootState) => state.vaccination
    );
    const { selectedBabyVaccinationData } = useVaccinationData(
        vaccinationData,
        selectedBabyId
    ); // selectedBabyVaccinationData = vaccinationData selectedBabyId에 따라 필터링 // selectedBabyId가 변경될 때 vaccinationData 업데이트

    console.log('로그인성공시 babygrow 불러옴', growInfo);
    console.log('로그인성공시 babyinfo불러옴', babyInfo);
    console.log('selectedBabyVaccinationData', selectedBabyVaccinationData);

    return (
        <div className={styles.background}>
            <div>
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
                </div>

                <div>
                    <BabyList
                        babyInfo={babyInfo}
                        handleSelectBaby={handleSelectBaby}
                        selectedBabyId={selectedBabyId}
                    />
                    <div>
                        <p>우리아이 성장그래프</p>
                        <button>성장일지 보러가기</button>
                    </div>

                    <div>
                        {growData.length > 0 ? (
                            <DiaryChart growData={growData} />
                        ) : (
                            // 성장기록 데이터가 없을 때
                            <div style={{ backgroundColor: 'green' }}>
                                데이터가 없습니다.
                            </div>
                        )}
                    </div>

                    <div>
                        <div>
                            <Link to="/Vaccination">
                                <p>다가오는 예방접종</p>
                                <MissingVaccinations
                                    selectedBabyVaccinationData={
                                        selectedBabyVaccinationData
                                    }
                                />
                            </Link>
                        </div>
                        <div>
                            <Link to="/VaccinationDetails">
                                <p>예방접종 대상 감염병 정보</p>
                                <p>바로가기</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.block_chatbot}>
                <div className={styles.chatbot}>
                    <div>
                        <p>궁금한 내용이 있으신가요?</p>
                        <p>
                            무엇이든 <span>AI챗봇</span>에게 물어보세요😉
                        </p>
                    </div>
                    <p>
                        {new Date().toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                </div>
                <AiChatComponent />
            </div>
        </div>
    );
}
