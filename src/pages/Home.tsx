import { AiChatComponent } from "../components/home-page/AiChatComponent";
import layout from "../styles/commons/Layout.module.scss";
import typography from "../styles/commons/Typography.module.scss";
import button from "../styles/commons/Button.module.scss";
import AI from "../styles/AIChatComponent.module.scss";
import styles from "../styles/Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { BabyList } from "../components/commons/BabyList";
import { useSelectBaby } from "../hooks/useSelectBaby";
import { useGrowData } from "../components/growth-diary-page/hooks/useGrowData";
import { DiaryChart } from "../components/growth-diary-page/DiaryChart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import VaccinationCenters from "./VaccinationCenters";
import VaccinationDetails from "./VaccinationDetails";
import { fetchgrowInfo } from "../store/GrowthDiarySlice";
import Loading from "../components/home-page/Loading";
import { userInfo } from "os";

export default function Home() {
  const [openCentersModal, setOpenCentersModal] = useState<boolean>(false);
  const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);
  // const dispatch = useDispatch<AppDispatch>();

  //로딩 상태 관리
  const [loading, setLoading] = useState<boolean>(true);

  // store에서 정보 가져오기
  const dispatch = useDispatch<AppDispatch>();
  const { babyInfo } = useSelector((state: RootState) => state.baby);
  const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);
  const username = sessionStorage.getItem("username") ?? "방문자";

  useEffect(() => {
    setLoading(true); // 처음엔 무조건 로딩 시작해야하는데...

    const fetchData = async () => {
      if (username !== "방문자" && babyInfo.length > 0) {
        try {
          await dispatch(fetchgrowInfo(babyInfo)); // 성장 정보 가져오기
        } catch (error) {
          console.error("데이터 가져오기 실패:", error);
        }
      }
      setLoading(false); // 데이터 가져오기 완료 후 로딩 종료
    };

    fetchData();
  }, [babyInfo, dispatch, username]);

  useEffect(() => {
    if (babyInfo.length === 0) {
      setLoading(false); // babyInfo가 없으면 즉시 로딩 종료
    } else if (growInfo.length > 0) {
      setLoading(false); // 성장 정보가 있으면 로딩 종료
    }
  }, [babyInfo, growInfo]);

  // 커스텀 훅 사용
  const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
  const { growData } = useGrowData(growInfo, selectedBabyId); // growInfo를 selectedBabyId에 따라 필터링 // selectedBabyId가 변경될 때 growData 업데이트

  console.log("로그인성공시 babygrow 불러옴", growInfo);
  console.log("로그인성공시 babyinfo불러옴", babyInfo);

  // const userString = sessionStorage.getItem('user');
  // const user = userString ? JSON.parse(userString) : null;
  // const username = user?.username ?? "방문자";

  return (
    <div className={layout.container}>
      {/* 모달 */}
      {loading && <Loading />}
      {openCentersModal && (
        <VaccinationCenters setOpenCentersModal={setOpenCentersModal} />
      )}
      {openDetailsModal && (
        <VaccinationDetails setOpenDetailsModal={setOpenDetailsModal} />
      )}

      <div className={`${styles.contentsArea}`}>
        {/* 왼쪽 | 사용자 영역 */}
        <div className={styles.userArea}>
          <div className={`${styles.userGreeting} ${typography.text4xlMd}`}>
            <div>
              <strong className={`${styles.user} ${typography.text4xlBd}`}>
                {username}
              </strong>
              님,
              <br />
              안녕하세요👋🏼
            </div>
            <div className={`${styles.pageGuide} ${typography.textLgRg}`}>
              우리아이{" "}
              <span className={typography.textLgMd}>예방접종을 관리</span>
              하고, <span className={typography.textLgMd}>성장일지를 기록</span>
              해보세요:)
            </div>
          </div>
          <div className={styles.mainContents}>
            {/* <BabyList
              babyInfo={babyInfo}
              handleSelectBaby={handleSelectBaby}
              selectedBabyId={selectedBabyId}
            /> */}

            <div className={styles.diaryChartWrap}>
              {growData.length > 0 ? (
                <div className={styles.chartContentsArea}>
                  <div className={styles.titleArea}>
                    <h4 className={typography.textLgBd}>
                      우리 아이 성장 그래프
                    </h4>
                    <button
                      className={`${button.btnSmYw} ${typography.textBsBd}`}
                    >
                      <Link to="/GrowthDiary">
                        성장일지 보러가기
                        <img
                          src="../img/icons/i-chevron-right-s20.svg"
                          alt=""
                        />
                      </Link>
                    </button>
                  </div>
                  <div className={styles.dataChartArea}>
                    <DiaryChart growData={growData} />
                  </div>
                </div>
              ) : (
                // 성장기록 데이터가 없을 때
                <div className={styles.no_diary_chart}>
                  <div className={styles.no_diary_chart_top}>
                    <img
                      src="img/BarLineChart.png"
                      alt="그래프 이미지"
                      className={styles.no_diary_chart_img}
                    ></img>
                  </div>
                  <div className={styles.no_diary_chart_bottom}>
                    <div className={typography.textBsRg}>
                      우리아이의 성장상태 확인하고
                      <br />
                      <span className={styles.highlight}>성장추이 그래프</span>
                      로 확인할 수 있어요!
                    </div>
                    <button
                      className={`${button.btnSmBl} ${typography.textBsBd}`}
                    >
                      바로 시작하기 {">"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.banner_wrap}>
              <div
                className={`${styles.banner_container} ${styles.banner_vac}`}
                onClick={() => setOpenDetailsModal(true)}
              >
                <h4 className={`${styles.banner_title} ${typography.textSmBd}`}>
                  예방접종 대상 감염병 정보
                </h4>
                <div className={`${styles.banner_link} ${typography.textBsBd}`}>
                  바로가기 {">"}
                </div>
              </div>
              <div
                className={`${styles.banner_container} ${styles.banner_search}`}
                onClick={() => setOpenCentersModal(true)}
              >
                <h4 className={`${styles.banner_title} ${typography.textSmBd}`}>
                  위탁의료기관 찾기
                </h4>
                <div className={`${styles.banner_link} ${typography.textBsBd}`}>
                  바로가기 {">"}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 오른쪽 | 챗봇 */}
        <div className={AI.chatbotArea}>
          <div className={AI.chatbotWrap}>
            <div className={AI.chatHeaderWrap}>
              <div className={AI.chat_header}>
                <div className={AI.headerIconWrap}>
                  <img
                    src="/img/icons/i-headphones-s24.svg"
                    alt="챗봇 아이콘"
                  />
                </div>
                <div className={AI.chat_header_title_wrap}>
                  <div className={typography.textSmBd}>
                    궁금한 내용이 있으신가요?
                  </div>
                  <div className={AI.chatTitleGuide}>
                    무엇이든 <span>AI챗봇</span>에게 물어보세요😉
                  </div>
                </div>
                <div></div>{" "}
              </div>
              <div className={`${AI.chat_date} ${typography.textBsRg}`}>
                {new Date().toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <AiChatComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
