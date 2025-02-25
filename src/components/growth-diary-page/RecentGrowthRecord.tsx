import React from "react";
import { newGrowData } from "../types";
import styles from "../../styles/GrowthDiary.module.scss";
import button from "../../styles/commons/Button.module.scss";
import typography from "../../styles/commons/Typography.module.scss";
import { DiaryInputArea } from "./DiaryInputArea";
import { DiaryTable } from "./DiaryTable";

interface RecentGrowthRecordProps {
  growData: newGrowData[];
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RecentGrowthRecord: React.FC<RecentGrowthRecordProps> = ({
  growData,
  setOpenAddModal,
}) => {
  return (
    <div>
      <div>
        <span>가장 최근 기록</span>
        <span>
          {new Date(growData[0].inputData).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <div>
        <div>
          <div>
            키 <span>{growData[0].height} cm</span>
          </div>
          <div>
            몸무게 <span>{growData[0].weight} kg</span>
          </div>
          <div>
            머리 둘레 <span>{growData[0].head} cm</span>
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => setOpenAddModal(true)}>성장기록 보러가기</button>
      </div>
    </div>
  );
};
