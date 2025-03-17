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
    <div className="sm:w-[30%] flex flex-col p-8 gap-4 rounded-2xl border-[3px] border-blue-3">
      <div className="gird grid-cols-1 flex flex-col gap-4">
        <span className="text-sm font-bd">가장 최근 기록</span>
        <span className="text-xs font-md text-gray-7">
          {new Date(growData[0].inputData).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex p-[0.875rem_1.625rem] justify-center items-center gap-[0.625rem] self-stretch rounded-lg bg-orange-3 text-bs font-rg h-[5rem]">
            키 <span className="text-bs font-bd">{growData[0].height} cm</span>
          </div>
          <div className="flex p-[0.875rem_1.625rem] justify-center items-center gap-[0.625rem] self-stretch rounded-lg bg-green-3 text-bs font-rg h-[5rem]">
            몸무게{" "}
            <span className="text-bs font-bd">{growData[0].weight} kg</span>
          </div>
          <div className="flex p-[0.875rem_1.625rem] justify-center items-center gap-[0.625rem] self-stretch rounded-lg bg-purple-3 text-bs font-rg h-[5rem]">
            머리 둘레{" "}
            <span className="text-bs font-bd">{growData[0].head} cm</span>
          </div>
        </div>
      </div>
      {/* <div>
        <button onClick={() => setOpenAddModal(true)}>성장기록 보러가기</button>
      </div> */}
    </div>
  );
};
