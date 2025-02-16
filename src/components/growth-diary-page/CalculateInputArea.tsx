import React from "react";
import { useRefs } from "../../hooks/useRefs";
import { ChildData, LmsData, Percentiles } from "../types";

import { handleClearInput } from "./functions/handleClearInput";
import { useHandleInputChange } from "./hooks/useHandleInputChange";
import { handleKeyDown } from "./functions/handleKeyDown";
import { handleCalculateChart } from "./functions/handleCalculateChart";

import input from "../../styles/commons/Input.module.scss";
import typography from "../../styles/commons/Typography.module.scss";
import styles from "../../styles/GrowthCalculate.module.scss";
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
    <div className={styles.contentsArea}>
      <div className={styles.formArea}>
        <div className={`${input.inputWrap} ${styles.inputDate}`}>
          <label>측정날짜</label>
          <input
            className={typography.textLgRg}
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
        <div className={input.inputWrap}>
          <label htmlFor="">키 </label>
          <div className={input.showUnitWrap}>
            <input
              className={typography.textLgRg}
              type="number"
              name="height"
              ref={refs.height}
              value={inputData.height ?? ""}
              onChange={handleInputChange}
              onKeyDown={(e) =>
                handleKeyDown(e, refs, inputData, setChildData, setShow)
              }
              placeholder="숫자만"
            />
            <span className={input.inputUnit}>cm</span>
          </div>
        </div>
        <div className={input.inputWrap}>
          <label htmlFor="">몸무게 </label>
          <div className={input.showUnitWrap}>
            <input
              className={typography.textLgRg}
              type="number"
              name="weight"
              ref={refs.headCircumference}
              value={inputData.weight ?? ""}
              onChange={handleInputChange}
              onKeyDown={(e) =>
                handleKeyDown(e, refs, inputData, setChildData, setShow)
              }
              placeholder="숫자만"
            />
            <span className={input.inputUnit}>kg</span>
          </div>
        </div>
        <div className={input.inputWrap}>
          <label htmlFor="">머리둘레</label>
          <div className={input.showUnitWrap}>
            <input
              className={typography.textLgRg}
              type="number"
              name="headCircumference"
              ref={refs.headCircumference}
              value={inputData.headCircumference ?? ""}
              onChange={handleInputChange}
              onKeyDown={(e) =>
                handleKeyDown(e, refs, inputData, setChildData, setShow)
              }
              placeholder="숫자만"
            />
            <span className={input.inputUnit}>cm</span>
          </div>
        </div>
      </div>
        {/* <p>
            백분위수란 같은 성별과 연령을 가진 100명을 오름차순으로 나열했을 때 이
            중 몇 번째에 해당되는지를 의미합니다. (예: 97%는 상위 3%를 의미)
        </p> */}
      <div className={styles.buttonsArea}>
        <button className={button.btnLgYw}
          onClick={() => handleClearInput(setInputData, setChildData, setShow)}
        >
          초기화
        </button>
        <button className={button.btnLgGr}
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
