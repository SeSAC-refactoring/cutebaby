import React from "react";
import { newGrowData } from "../types";
import styles from "../../styles/GrowthDiary.module.scss";
import { DiaryInputArea } from "./DiaryInputArea";
import { DiaryTable } from "./DiaryTable";

interface RecentGrowthRecordProps {
  growData: newGrowData[];
}

export const RecentGrowthRecord: React.FC<RecentGrowthRecordProps> = ({
  growData,
}) => {
  return (
    <div className={styles.recent_background}>
      <div className={styles.recent_title_wrap}>
        <span className={styles.recent_title}>가장 최근 기록</span>
        <span className={styles.recent_date}>
          {new Date(growData[0].inputData).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <div className={styles.recent_wrap}>
        <div className={styles.recent_detail}>
          <div className={styles.height}>
            키 <span className={styles.strong}>{growData[0].height} cm</span>
          </div>
          <div className={styles.weight}>
            몸무게{" "}
            <span className={styles.strong}>{growData[0].weight} kg</span>
          </div>
          <div className={styles.head}>
            머리 둘레{" "}
            <span className={styles.strong}>{growData[0].head} cm</span>
          </div>
        </div>
      </div>
      <div className={styles.recent_add_button_wrap}>
        <button
          // onClick={() => setOpenAddModal(true)}
          className={styles.recent_add}
        >
          성장기록 보러가기
        </button>
      </div>
    </div>
  );
};
