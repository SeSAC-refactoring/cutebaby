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
    <div className="min-h-0 flex flex-col sm:w-full h-full">
      <div className="flex-grow overflow-y-scroll pb-[3.5rem] text-lg font-rg">
        {growData.length > 0 ? (
          <>
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
                  <div className="flex sm:w-[12.5rem] h-full sm:ml-4 sm:px-[1.75rem] py-[0.875rem] items-center justify-center gap-[0.125rem] sm:gap-2">
                    <button
                      onClick={() => onEdit(info.id)}
                      className="sm:h-[3rem] rounded-[0.75rem] text-xs font-rg sm:text-bs sm:font-bd flex bg-blue-4 sm:gap-1 justify-center items-center sm:p-[0.875rem_1.125rem] p-[0.125rem_0.125rem]"
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
                      className="sm:h-[3rem] rounded-[0.75rem] text-xs font-rg sm:text-bs sm:font-bd bg-coral-4 sm:p-[0.875rem_1.125rem] p-[0.125rem_0.125rem]"
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="bg-gray-1 rounded-[2rem] h-full">
            <div className="h-[35rem] sm:h-[20rem] bottom-0 sm:bottom-[1rem] flex justify-center items-center backdrop-blur-sm">
              <div className="flex flex-col items-center justify-center z-[100] gap-6 pb-25">
                <img src="/img/Ggoggo-003-2.svg" />
                <div className="sm:text-xl text-sm font-md text-gray-6">
                  입력하고 <strong>추가하기</strong>를 눌러보세요! <br /> 우리
                  아이의 성장기록을 보여드려요:)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
