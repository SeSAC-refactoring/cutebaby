import React from 'react';
import { useRefs } from '../../hooks/useRefs';
import { ChildData } from '../types';

import { handleClearInput } from './functions/handleClearInput';
import { useHandleInputChange } from './hooks/useHandleInputChange';
import { handleKeyDown } from './functions/handleKeyDown';
import { handleCalculateChart } from './functions/handleCalculateChart';
import { Input } from '../commons/Input';

// 사용자 입력값 설정
interface CalculateInputAreaProps {
    childData: ChildData;
    setChildData: React.Dispatch<React.SetStateAction<ChildData>>;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenResultModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CalculateInputArea: React.FC<CalculateInputAreaProps> = ({
    childData,
    setChildData,
    setShow,
    setOpenResultModal,
}) => {
    const { handleInputChange, inputData, setInputData } =
        useHandleInputChange(childData);
    const refs = useRefs();

    return (
        <article className="inputArea">
            <div className="forms">
                <Input
                    label="측정날짜"
                    type="date"
                    name="measurementDate"
                    ref={refs.measurementDate}
                    value={
                        inputData.measurementDate
                            ? inputData.measurementDate
                                  .toISOString()
                                  .split('T')[0]
                            : ''
                    }
                    onChange={handleInputChange}
                />

                <div className="inputWrapper">
                    <Input
                        label="키"
                        type="number"
                        name="height"
                        ref={refs.height}
                        value={String(inputData.height ?? '')}
                        onChange={handleInputChange}
                        onKeyDown={(e: any) =>
                            handleKeyDown(
                                e,
                                refs,
                                inputData,
                                setChildData,
                                setShow
                            )
                        }
                        placeholder="61.1"
                    />
                    <span>cm</span>
                </div>

                <div className="inputWrapper">
                    <Input
                        label="몸무게"
                        type="number"
                        name="weight"
                        ref={refs.headCircumference}
                        value={String(inputData.weight ?? '')}
                        onChange={handleInputChange}
                        onKeyDown={(e: any) =>
                            handleKeyDown(
                                e,
                                refs,
                                inputData,
                                setChildData,
                                setShow
                            )
                        }
                        placeholder="6.4"
                    />
                    <span>kg</span>
                </div>

                <div className="inputWrapper">
                    <Input
                        label="머리둘레"
                        type="number"
                        name="headCircumference"
                        ref={refs.headCircumference}
                        value={String(inputData.headCircumference ?? '')}
                        onChange={handleInputChange}
                        onKeyDown={(e: any) =>
                            handleKeyDown(
                                e,
                                refs,
                                inputData,
                                setChildData,
                                setShow
                            )
                        }
                        placeholder="40.5"
                    />
                    <span>cm</span>
                </div>
            </div>

            <div className="btns">
                {/* <p>
          백분위수란 같은 성별과 연령을 가진 100명을 오름차순으로 나열했을 때 이
          중 몇 번째에 해당되는지를 의미합니다. (예: 97%는 상위 3%를 의미)
        </p> */}
                <button
                    className="button-yellow button-lg"
                    onClick={() =>
                        handleClearInput(setInputData, setChildData, setShow)
                    }
                >
                    초기화
                    <img
                        src="/img/arrow-rotate-left-01.png"
                        alt="초기화 아이콘"
                    ></img>
                </button>
                <button
                    className="button-black button-lg"
                    onClick={() => {
                        setOpenResultModal(true);
                        handleCalculateChart(
                            refs,
                            inputData,
                            setChildData,
                            setShow
                        );
                    }}
                >
                    계산하기
                </button>
            </div>
        </article>
    );
};
