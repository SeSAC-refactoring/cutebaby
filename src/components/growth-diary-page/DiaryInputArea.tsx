import React from "react";
import styles from "../../styles/GrowthDiary.module.scss";
import typography from "../../styles/commons/Typography.module.scss";
import button from "../../styles/commons/Button.module.scss";
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
  } = useDiaryHandler(selectedBabyId);

  return (
    <div className={styles.modalWrap}>
      <div className={styles.modal_title_wrap}>
        <div>성장기록</div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpenAddModal(false);
          }}
        >
          X
        </div>
      </div>
      <div className={styles.input_background}>
        <div className={styles.inputArea_wrap}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "32px 48px",
              marginBottom: "48px",
              backgroundColor: "#FEF9F1",
              borderRadius: "32px",
              width: "1000px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "48px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Input
                  label="측정날짜"
                  className={styles.input}
                  type="date"
                  id="inputData"
                  value={newGrowData.inputData}
                  onChange={handleDiaryInputChange}
                  ref={(el) => {
                    inputRef.current.inputData = el;
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Input
                    label="키"
                    className={styles.input}
                    type="number"
                    id="height"
                    placeholder="숫자 입력"
                    // value={newGrowData.height}
                    value={String(newGrowData.height)}
                    onChange={handleDiaryInputChange}
                    onKeyDown={handleKeyDown}
                    ref={(el) => {
                      inputRef.current.height = el;
                    }}
                  />
                  <span style={{ marginLeft: "8px", marginRight: "12px" }}>
                    cm
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Input
                    label="몸무게"
                    className={styles.input}
                    type="number"
                    id="weight"
                    placeholder="숫자 입력"
                    // value={newGrowData.weight}
                    value={String(newGrowData.weight)}
                    onChange={handleDiaryInputChange}
                    onKeyDown={handleKeyDown}
                    ref={(el) => {
                      inputRef.current.weight = el;
                    }}
                  />
                  <span style={{ marginLeft: "8px", marginRight: "12px" }}>
                    kg
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Input
                    label="머리둘레"
                    className={styles.input}
                    type="number"
                    id="head"
                    placeholder="숫자 입력"
                    value={newGrowData.head}
                    onChange={handleDiaryInputChange}
                    onKeyDown={handleKeyDown}
                    ref={(el) => {
                      inputRef.current.head = el;
                    }}
                  />
                  <span style={{ marginLeft: "8px" }}>cm</span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "32px",
                width: "100%",
                gap: "16px",
              }}
            >
              {/* <p>
          백분위수란 같은 성별과 연령을 가진 100명을 오름차순으로 나열했을 때 이
          중 몇 번째에 해당되는지를 의미합니다. (예: 97%는 상위 3%를 의미)
        </p> */}
              <button
                className={`${button.btnLgYw} ${typography.textLgBd}`}
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
              >
                초기화
                <img
                  src="/img/arrow-rotate-left-01.png"
                  alt="초기화 아이콘"
                ></img>
              </button>
              <button
                className={`${button.btnLgGr} ${typography.textLgBd}`}
                onClick={handleDiarySubmit}
              >
                계산하기
              </button>
            </div>
          </div>
        </div>
        {/* ----------------------------------- */}
      </div>
    </div>
  );
};
