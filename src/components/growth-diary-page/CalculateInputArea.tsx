import React from "react";
import { useRefs } from "../../hooks/useRefs";
import { ChildData, LmsData, Percentiles } from "../types";

import { handleClearInput } from "./functions/handleClearInput";
import { useHandleInputChange } from "./hooks/useHandleInputChange";
import { handleKeyDown } from "./functions/handleKeyDown";
import { handleCalculateChart } from "./functions/handleCalculateChart";
import { Input } from "../commons/Input";

import typography from "../../styles/commons/Typography.module.scss";
import button from "../../styles/commons/Button.module.scss";

// 사용자 입력값 설정
interface CalculateInputAreaProps {
  childData: ChildData;
  setChildData: React.Dispatch<React.SetStateAction<ChildData>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CalculateInputArea: React.FC<CalculateInputAreaProps> = ({
  childData,
  setChildData,
  setShow,
}) => {
  const { handleInputChange, inputData, setInputData } =
    useHandleInputChange(childData);
  const refs = useRefs();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "32px 48px",
        marginBottom: "48px",
        backgroundColor: "#FEF9F1",
        borderRadius: "32px",
        // width: "1000px",
        width: "100%",
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
            type="date"
            name="measurementDate"
            ref={refs.measurementDate}
            value={
              inputData.measurementDate
                ? inputData.measurementDate.toISOString().split("T")[0]
                : ""
            }
            onChange={handleInputChange}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              label="키"
              type="number"
              name="height"
              ref={refs.height}
              //   value={inputData.height ?? ""}
              value={String(inputData.height ?? "")}
              onChange={handleInputChange}
              onKeyDown={(e: any) =>
                handleKeyDown(e, refs, inputData, setChildData, setShow)
              }
              placeholder="숫자만"
            />
            <span style={{ marginLeft: "8px", marginRight: "12px" }}>cm</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              label="몸무게"
              type="number"
              name="weight"
              ref={refs.headCircumference}
              value={String(inputData.weight ?? "")}
              //   value={inputData.weight ?? ""}
              onChange={handleInputChange}
              onKeyDown={(e: any) =>
                handleKeyDown(e, refs, inputData, setChildData, setShow)
              }
              placeholder="숫자만"
            />
            <span style={{ marginLeft: "8px", marginRight: "12px" }}>kg</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              label="머리둘레"
              type="number"
              name="headCircumference"
              ref={refs.headCircumference}
              //   value={inputData.headCircumference ?? ""}
              value={String(inputData.headCircumference ?? "")}
              onChange={handleInputChange}
              onKeyDown={(e: any) =>
                handleKeyDown(e, refs, inputData, setChildData, setShow)
              }
              placeholder="숫자만"
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
          onClick={() => handleClearInput(setInputData, setChildData, setShow)}
        >
          초기화
          <img src="/img/arrow-rotate-left-01.png" alt="초기화 아이콘"></img>
        </button>
        <button
          className={`${button.btnLgGr} ${typography.textLgBd}`}
          onClick={() =>
            handleCalculateChart(refs, inputData, setChildData, setShow)
          }
        >
          계산하기
        </button>
      </div>
    </div>
  );
};
