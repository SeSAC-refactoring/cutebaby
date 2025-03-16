import React from "react";

import { useDiaryHandler } from "./hooks/useDiaryHandler";
import { Input } from "../commons/Input";

interface DiaryInputAreaProps {
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBabyId: number | null;
}

export const DiaryInputArea: React.FC<DiaryInputAreaProps> = ({
  setOpenAddModal,
  selectedBabyId,
}) => {
  const {
    newGrowData,
    setNewGrowData,
    inputRef,
    handleDiaryInputChange,
    handleKeyDown,
    handleDiarySubmit,
    isSubmitting,
  } = useDiaryHandler(selectedBabyId);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="sm:text-4xl text-2xl font-bd mb-4">성장기록</h2>
        <div
          onClick={() => {
            setOpenAddModal(false);
          }}
        >
          <img src="/img/icons/i-modal-close-s32.svg" alt="" />
        </div>
      </div>
      <article className="inputArea">
        <div className="forms">
          <Input
            label="측정날짜"
            type="date"
            id="inputData"
            value={newGrowData.inputData}
            onChange={handleDiaryInputChange}
            ref={(el) => {
              inputRef.current.inputData = el;
            }}
          />

          <div className="inputWrapper">
            <Input
              label="키"
              type="number"
              id="height"
              placeholder="숫자 입력"
              value={String(newGrowData.height)}
              onChange={handleDiaryInputChange}
              onKeyDown={handleKeyDown}
              ref={(el) => {
                inputRef.current.height = el;
              }}
            />
            <span>cm</span>
          </div>

          <div className="inputWrapper">
            <Input
              label="몸무게"
              type="number"
              id="weight"
              placeholder="숫자 입력"
              value={String(newGrowData.weight)}
              onChange={handleDiaryInputChange}
              onKeyDown={handleKeyDown}
              ref={(el) => {
                inputRef.current.weight = el;
              }}
            />
            <span>kg</span>
          </div>

          <div className="inputWrapper">
            <Input
              label="머리둘레"
              type="number"
              id="head"
              placeholder="숫자 입력"
              value={String(newGrowData.head)}
              onChange={handleDiaryInputChange}
              onKeyDown={handleKeyDown}
              ref={(el) => {
                inputRef.current.head = el;
              }}
            />
            <span>cm</span>
          </div>
        </div>
        <div className="btns mt-4 mb-4">
          <button
            onClick={() =>
              setNewGrowData({
                babyid: newGrowData.babyid,
                id: 0,
                height: "",
                weight: "",
                head: "",
                inputData: new Date().toISOString().split("T")[0],
              })
            }
            className="button-yellow button-lg"
          >
            초기화
            <img src="/img/arrow-rotate-left-01.png" alt="초기화 아이콘"></img>
          </button>
          <button
            onClick={handleDiarySubmit}
            style={{
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
            className="button-black button-lg"
          >
            {isSubmitting ? "저장 중" : "추가하기"}
          </button>
        </div>
      </article>
      <p>
        백분위수란 같은 성별과 연령을 가진 100명을 오름차순으로 나열했을 때 이
        중 몇 번째에 해당되는지를 의미합니다. (예: 97%는 상위 3%를 의미)
      </p>
    </div>
  );
};
