import { AiChatComponent } from "../components/home-page/AiChatComponent";
import layout from "../styles/commons/Layout.module.scss";
import typography from "../styles/commons/Typography.module.scss";
import button from "../styles/commons/Button.module.scss";
import AI from "../styles/AIChatComponent.module.scss";
import styles from "../styles/Home.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { BabyList } from "../components/commons/BabyList";
import { useSelectBaby } from "../hooks/useSelectBaby";
import { useGrowData } from "../components/growth-diary-page/hooks/useGrowData";
import { DiaryChart } from "../components/growth-diary-page/DiaryChart";
import { Link } from "react-router-dom";
import { useVaccinationData } from "../components/vaccination-page/hooks/useVaccinationData";
import { MissingVaccinations } from "../components/home-page/MissingVaccinations";

export default function Home() {
  // const dispatch = useDispatch<AppDispatch>();

  // store에서 정보 가져오기
  const { babyInfo } = useSelector((state: RootState) => state.baby);
  const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);
  const { vaccinationData } = useSelector(
    (state: RootState) => state.vaccination
  );

  // 커스텀 훅 사용
  const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
  const { growData } = useGrowData(growInfo, selectedBabyId); // growInfo를 selectedBabyId에 따라 필터링 // selectedBabyId가 변경될 때 growData 업데이트
  const { selectedBabyVaccinationData } = useVaccinationData(
    vaccinationData,
    selectedBabyId
  ); // vaccinationData selectedBabyId에 따라 필터링 // selectedBabyId가 변경될 때 vaccinationData 업데이트

  console.log("로그인성공시 babygrow 불러옴", growInfo);
  console.log("로그인성공시 babyinfo불러옴", babyInfo);

  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const username = user?.username ?? "방문자";

  return (
    <div className={layout.container}>
      <div className={`${styles.contentsArea}`}>
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
            <BabyList
              babyInfo={babyInfo}
              handleSelectBaby={handleSelectBaby}
              selectedBabyId={selectedBabyId}
            />
            {/* <div className={styles.graphArea}>
              <p className={typography.textLgBd}>우리아이 성장그래프</p>
              <button className={`${button.btnSmYw} ${typography.textBsBd}`}>
                <Link to="/GrowthDiary">
                  성장일지 보러가기
                  <img src="../img/icons/i-chevron-right-s20.svg" alt="" />
                </Link>
              </button>
            </div> */}
            <div className={styles.diary_chart}>
              {growData.length > 0 ? (
                <>
                  <div className={styles.graphArea}>
                    <p className={typography.textLgBd}>우리아이 성장그래프</p>
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
                  <div style={{ height: "330px" }}>
                    <DiaryChart growData={growData} />
                  </div>
                </>
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
                    <div className={styles.bottom_text}>
                      우리아이의 성장상태 확인하고
                      <br />
                      <span className={styles.highlight}>성장추이 그래프</span>
                      로 확인할 수 있어요!
                    </div>
                    <div className={styles.bottom_button}>
                      바로 시작하기 {">"}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.banner_wrap}>
              <div className={styles.banner_container}>
                <div className={styles.banner_left}>
                  <div className={styles.banner_title}>
                    예방접종 대상 감염병 정보
                  </div>
                  <div className={styles.banner_link}>바로가기 {">"}</div>
                </div>
                <div className={styles.banner_right}>
                  <img src="img/Visual.png" alt=""></img>
                </div>
              </div>
              <div className={styles.banner_container}>
                <div className={styles.banner_left}>
                  <div className={styles.banner_title}>위탁의료기관 찾기</div>
                  <div className={styles.banner_link}>바로가기 {">"}</div>
                </div>
                <div className={styles.banner_right}>
                  <img src="img/Visual2.png" alt=""></img>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={AI.chatbotArea}>
          <div className={AI.chat_header}>
            <img
              src="img/Icon.png"
              alt="아이콘"
              style={{ width: "34px", height: "34px" }}
            />
            <div className={AI.chat_header_title_wrap}>
              <div className={AI.chat_header_title}>
                궁금한 내용이 있으신가요?
              </div>
              <div>
                무엇이든 <span>AI챗봇</span>에게 물어보세요😉
              </div>
            </div>
            <div></div>{" "}
          </div>
          <div className={AI.chat_date}>
            {new Date().toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <AiChatComponent />
        </div>
      </div>
    </div>
  );
}
