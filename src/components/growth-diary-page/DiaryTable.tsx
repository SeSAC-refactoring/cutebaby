import React, { useEffect, useState } from "react";
import { newGrowData } from "../types";

interface DiaryTableProps {
  growData: newGrowData[];
  onEdit: (growId: number) => void;
  onDelete: (growId: number) => void;
}

export const DiaryTable: React.FC<DiaryTableProps> = ({
  growData,
  onEdit,
  onDelete,
}) => {
  console.log(growData);
  return (
    <div className="min-h-0 flex flex-col w-1/3 sm:w-full">
      <div className="flex flex-row h-14 pl-[50px] items-center bg-blue-3 rounded-[16px]">
        <div className="w-[198px] h-14 text-lg font-bd items-center flex justify-center">
          날짜
        </div>
        <div className="w-[198px] h-14 text-lg font-bd items-center flex justify-center">
          키(cm)
        </div>
        <div className="w-[198px] h-14 text-lg font-bd items-center flex justify-center">
          몸무게(kg)
        </div>
        <div className="w-[198px] h-14 text-lg font-bd items-center flex justify-center">
          머리둘레(cm)
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll pb-14 text-lg font-rg">
        {growData.length > 0 ? (
          <ul className="text-lg font-rg">
            {growData.map((info, i) => (
              <li
                key={i}
                className="flex flex-row h-18 pl-[50px] items-center rounded-[16px] justify-start even:bg-blue-1"
              >
                <div className="w-[198px] h-full flex justify-center items-center text-center text-lg font-rg">
                  {info.inputData}
                </div>
                <div className="w-[198px] h-full flex justify-center items-center text-center text-lg font-rg">
                  {Number(info.height)}
                </div>
                <div className="w-[198px] h-full flex justify-center items-center text-center text-lg font-rg">
                  {Number(info.weight)}
                </div>
                <div className="w-[198px] h-full flex justify-center items-center text-center text-lg font-rg">
                  {Number(info.head)}
                </div>
                <div className="flex w-[200px] h-full ml-4 px-7 py-[14px] items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(info.id)}
                    className="h-12 rounded-[12px] text-bs font-bd flex bg-blue-4 justify-center items-center p-[14px_18px]"
                  >
                    수정
                    <img
                      src="/img/edit-02.png"
                      alt="수정아이콘"
                      className="w-5 h-5"
                    ></img>
                  </button>
                  <button
                    onClick={() => onDelete(info.id)}
                    className="h-12 rounded-[12px] text-bs font-bd bg-coral-4 p-[14px_18px]"
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            <li>성장 기록이 없습니다.</li>
          </ul>
        )}
      </div>
    </div>
  );
};
