import React from "react";
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
  return (
    <div className="min-h-0 flex flex-col sm:w-full">
      <div className="flex flex-row h-[3.5rem] sm:pl-[3.125rem] pr-[3.125rem] items-center bg-blue-3 rounded-[1rem] gap-4">
        <div className="sm:w-[12.375rem] w-[6.25rem] h-[3.5rem] text-xs sm:text-lg font-bd items-center flex justify-center">
          날짜
        </div>
        <div className="sm:w-[12.375rem] h-[3.5rem] text-xs sm:text-lg font-bd items-center flex justify-center flex-wrap w-[1.875rem] text-center">
          키(cm)
        </div>
        <div className="sm:w-[12.375rem] h-[3.5rem] text-xs sm:text-lg font-bd items-center flex justify-center flex-wrap w-[2.5rem] text-center">
          몸무게(kg)
        </div>
        <div className="sm:w-[12.375rem] h-[3.5rem] text-xs sm:text-lg font-bd items-center flex justify-center flex-wrap w-[1.875rem] text-center">
          머리둘레(cm)
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll pb-[3.5rem] text-lg font-rg">
        {growData.length > 0 ? (
          <ul className="text-lg font-rg">
            {growData.map((info, i) => (
              <li
                key={i}
                className="flex flex-row h-[4.5rem] sm:pl-[3.125rem] items-center rounded-[1rem] sm:justify-start even:bg-blue-1 justify-around"
              >
                <div className="sm:w-[12.375rem] h-full flex justify-center items-center text-center text-xs sm:text-lg font-rg mr-[1.25rem]">
                  {info.inputData}
                </div>
                <div className="sm:w-[12.375rem] h-full flex justify-center items-center text-center text-xs sm:text-lg font-rg mr-[1.25rem]">
                  {Number(info.height)}
                </div>
                <div className="sm:w-[12.375rem] h-full flex justify-center items-center text-center text-xs sm:text-lg font-rg mr-[1.25rem]">
                  {Number(info.weight)}
                </div>
                <div className="sm:w-[12.375rem] h-full flex justify-center items-center text-center text-xs sm:text-lg font-rg">
                  {Number(info.head)}
                </div>
                <div className="flex sm:w-[12.5rem] h-full sm:ml-4 sm:px-[1.75rem] py-[0.875rem] items-center justify-center gap-[0.125rem] sm:gap-[0.125rem]">
                  <button
                    onClick={() => onEdit(info.id)}
                    className="sm:h-[3rem] rounded-[0.75rem] text-xs sm:text-bs sm:font-bd flex bg-blue-4 justify-center items-center sm:p-[0.875rem_1.125rem]"
                  >
                    수정
                    <img
                      src="/img/edit-02.png"
                      alt="수정아이콘"
                      className="w-[1.25rem] h-[1.25rem]"
                    />
                  </button>
                  <button
                    onClick={() => onDelete(info.id)}
                    className="sm:h-[3rem] rounded-[0.75rem] text-xs sm:text-bs sm:font-bd bg-coral-4 sm:p-[0.875rem_1.125rem]"
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
