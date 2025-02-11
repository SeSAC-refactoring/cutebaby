import { AiChatComponent } from "../components/home-page/AiChatComponent";
import layout from "../styles/commons/Layout.module.scss";
import typography from "../styles/commons/Typography.module.scss";
import button from "../styles/commons/Button.module.scss";
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

  // console.log('로그인성공시 babygrow 불러옴', growInfo);
  // console.log('로그인성공시 babyinfo불러옴', babyInfo);

  const userString = sessionStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const username = user?.username ?? '방문자님';
  

  return (
    <div className={layout.container}>
      <div className={`${styles.contentsArea}`}>
        <div className={styles.userArea}>
          <div className={styles.userGreeting}>
            <strong className={styles.user}>{username}</strong>님,
            <br />
            안녕하세요
          </div>
          <div className={styles.small_title}>
            우리아이 <span>예방접종을 관리하고, 성장일지를 기록</span>
            해보세요:)
          </div>
          <div className={styles.mainContents}>
            <BabyList
              babyInfo={babyInfo}
              handleSelectBaby={handleSelectBaby}
              selectedBabyId={selectedBabyId}
            />
            <div className={styles.graphArea}>
              <p>우리아이 성장그래프</p>
              <button>
                <Link to="/GrowthDiary">성장일지 보러가기</Link>
              </button>
            </div>
            <Link to="/GrowthDiary">
              <div>
                {growData.length > 0 ? (
                  <DiaryChart growData={growData} />
                ) : (
                  // 성장기록 데이터가 없을 때
                  <div style={{ backgroundColor: "green" }}>
                    데이터가 없습니다.
                  </div>
                )}
              </div>
            </Link>

            <div className={styles.bannerArea}>
              <div className={styles.bannerItem}>
                <div className={styles.bannerTopArea}>
                  <h4 className={`${styles.bannerTitle} ${typography.textSmBd}`}>다가오는 예방접종</h4>
                  <Link to="/Vaccination">접종관리</Link>
                </div>
                <MissingVaccinations
                  selectedBabyVaccinationData={selectedBabyVaccinationData}
                />
              </div>
              <div className={styles.bannerItem}>
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
              {new Date().toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <AiChatComponent />
        </div>
      </div>
    </div>
  );
}
