import { AiChatComponent } from '../components/home-page/AiChatComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useSelectBaby } from '../hooks/useSelectBaby';
import { useGrowData } from '../components/growth-diary-page/hooks/useGrowData';
import { DiaryChart } from '../components/growth-diary-page/DiaryChart';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchgrowInfo } from '../store/GrowthDiarySlice';
import { BabyList } from '../components/commons/BabyList';
import { ButtonArea } from '../components/home-page/ButtonArea';
import VaccinationCenters from './VaccinationCenters';
import VaccinationDetails from './VaccinationDetails';
import Loading from '../components/home-page/Loading';

export default function Home() {
    const [openCentersModal, setOpenCentersModal] = useState<boolean>(false);
    const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리

    // store에서 정보 가져오기
    const dispatch = useDispatch<AppDispatch>();
    const { babyInfo } = useSelector((state: RootState) => state.baby);
    const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);
    const username = sessionStorage.getItem('username') ?? '방문자';

    // userinfo 및 성장 정보 가져오기
    useEffect(() => {
        setLoading(true); // 로딩 시작

        const fetchData = async () => {
            try {
                // userinfo 가져오기
                const userinfo = sessionStorage.getItem('user'); // 올바른 키 이름 사용
                if (!userinfo) {
                    // console.warn("Userinfo not found in sessionStorage");
                    return; // userinfo가 없으면 로딩 종료
                }

                // 성장 정보 가져오기
                if (username !== '방문자' && babyInfo.length > 0) {
                    await dispatch(fetchgrowInfo(babyInfo));
                }
            } catch (error) {
                // console.error("데이터 가져오기 실패:", error);
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchData();
    }, [babyInfo, dispatch, username]);

    // 커스텀 훅 사용
    const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
    const { growData } = useGrowData(growInfo, selectedBabyId);

    return (
        <main>
            <h1>홈페이지</h1>
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
                <section className="topArea">
                    <div className="greeting">
                        <strong>{username}</strong>
                        님,
                        <br />
                        안녕하세요👋🏼
                    </div>
                    <div className="description">
                        우리아이 예방접종을 관리 하고, 성장일지를 기록
                        해보세요:)
                    </div>
                </section>

                <section className="dashboard">
                    <article className="growthDiaryArea">
                        <h2>우리 아이 성장 그래프</h2>
                        {/* 로그인 X */}
                        {username === '방문자' ? (
                            <figure className="noBabyList">
                                <img
                                    src="img/visuals/visuals-home-barLineChart.svg"
                                    alt="그래프 이미지"
                                />
                                <ButtonArea
                                    link="/SelectLogin"
                                    buttonText="로그인하기"
                                />
                            </figure>
                        ) : babyInfo.length === 0 ? (
                            // 로그인 O + 아기등록 X
                            <figure className="noBabyList">
                                <img
                                    src="img/visuals/visuals-home-barLineChart.svg"
                                    alt="그래프 이미지"
                                />
                                <ButtonArea
                                    link="/Mypage"
                                    buttonText="아이 등록하기"
                                />
                            </figure>
                        ) : (
                            <figure className="GrowData">
                                {/* 로그인 O + 아기등록 O + 성장기록 X */}
                                <BabyList
                                    babyInfo={babyInfo}
                                    handleSelectBaby={handleSelectBaby}
                                    selectedBabyId={selectedBabyId}
                                />
                                {growData.length === 0 ? (
                                    <div className="graphBtnArea">
                                        <img
                                            src="img/visuals/visuals-home-barLineChart.svg"
                                            alt="그래프 이미지"
                                        />
                                        <ButtonArea
                                            link="/GrowthDiary"
                                            buttonText="성장기록 추가하기"
                                        />
                                    </div>
                                ) : (
                                    // 로그인 O + 아기등록 O + 성장기록 O
                                    <div className="graphBtnArea">
                                        <div className="graphArea">
                                            <DiaryChart growData={growData} />
                                        </div>
                                        <button className="buttonArea">
                                            <Link to="/GrowthDiary">
                                                <p>성장일지 보러가기</p>
                                                <img
                                                    src="../img/icons/i-chevron-right-s20.svg"
                                                    alt=""
                                                />
                                            </Link>
                                        </button>
                                    </div>
                                )}
                            </figure>
                        )}
                    </article>

                    {/* 배너 영역 */}
                    <article className="vaccinationArea">
                        <h2>예방접종 관련 정보</h2>
                        <div
                            className="banner banner_first"
                            onClick={() => setOpenDetailsModal(true)}
                        >
                            <h3>예방접종 대상 감염병 정보</h3>
                            <button>
                                <p>바로가기</p>
                                <img
                                    src="/img/icons/i-chevron-right-s20-gray6.svg"
                                    alt="바로가기 아이콘"
                                />
                            </button>
                        </div>
                        <div
                            className="banner banner_second"
                            onClick={() => setOpenCentersModal(true)}
                        >
                            <h3>위탁의료기관 찾기</h3>
                            <button>
                                <p>바로가기</p>
                                <img
                                    src="/img/icons/i-chevron-right-s20-gray6.svg"
                                    alt="바로가기 아이콘"
                                />
                            </button>
                        </div>
                    </article>
                </section>
            </section>

            {/* 챗봇 */}
            {/* <aside>
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
            </aside> */}
        </main>
    );
}
