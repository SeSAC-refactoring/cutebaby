import { DiaryChart } from "../components/growth-diary-page/DiaryChart";
import { GrowthCalculate } from "../components/growth-diary-page/GrowthCalculate";
import { DiaryTable } from "../components/growth-diary-page/DiaryTable";
import { BabyList } from "../components/commons/BabyList";
import { DiaryInputArea } from "../components/growth-diary-page/DiaryInputArea";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useSelectBaby } from "../hooks/useSelectBaby";
import Header from "../components/commons/Header";
import styles from "../styles/GrowthDiary.module.scss";

export default function GrowthDiary() {
  const { babyInfo, nothingBaby } = useSelector(
    (state: RootState) => state.baby
  );
  const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);

  const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
  // const growInfo = sessionStorage.getItem('babygrow');

  console.log("애기 성장정보 입니다 >>>>", growInfo);
  return (
    <div className={styles.background}>
      {/* <Header></Header> */}
      <div className={styles.title_wrap}>
        <div>
          <div className={styles.title}>성장기록</div>
          <div className={styles.text}>
            우리 아이의 성장을 기록하고 상태를 확인해보세요 :)
          </div>
          <div>
            {Array.isArray(growInfo) && growInfo.length > 0 ? (
              <ul>
                {growInfo
                  .flat() // 중첩 배열을 평탄화
                  .filter((info) => info.babyid === selectedBabyId) // 선택한 아기 ID에 맞는 데이터만 필터링
                  .map((info, index) => (
                    <li key={index}>
                      {info.inputData} - 키: {info.height}cm, 몸무게:{" "}
                      {info.weight}kg
                    </li>
                  ))}
              </ul>
            ) : (
              <p>성장 기록이 없습니다.</p>
            )}
          </div>
        </div>
        <button className={styles.cal_btn}>성장상태 계산 {">"}</button>
      </div>
      <div className={styles.contents_wrap}>
        <BabyList
          babyInfo={babyInfo}
          nothingBaby={nothingBaby}
          handleSelectBaby={handleSelectBaby}
          selectedBabyId={selectedBabyId}
        />
        <div className={styles.block_record}>
          <div className={styles.add_wrap}>
            <DiaryInputArea />
            <button className={styles.add_btn}>+ 기록추가</button>
          </div>

          <DiaryTable
            babyInfo={babyInfo}
            nothingBaby={nothingBaby}
            selectedBabyId={selectedBabyId}
          />
          <DiaryChart />
        </div>
      </div>

      {/* 계산하는 페이지 / 모달 예정??  */}
      <br />
      <hr />
      {/* <GrowthCalculate /> */}
    </div>
  );
}
