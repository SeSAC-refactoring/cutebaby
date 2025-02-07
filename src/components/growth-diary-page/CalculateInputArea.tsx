import React from 'react';
import { useRefs } from '../../hooks/useRefs';
import { ChildData } from '../types';
import { handleCalculateChart } from './handleCalculateChart';
import { handleHideChart } from './handleHideChart';
import { handleClearInput } from './handleClearInput';
import { useHandleInputChange } from './hooks/useHandleInputChange';

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
        <div>
            {/* <div>
                <label htmlFor="">성별: </label>
                <span>{childData.gender}</span>
            </div>

            <div>
                <label htmlFor="">생년월일: </label>
                <span>{childData.birthDate.toISOString().split('T')[0]}</span>
            </div> */}

            <div>
                <label>측정일: </label>
                <input
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
            </div>

            <div>
                <label htmlFor="">신장(cm): </label>
                <input
                    type="number"
                    name="height"
                    ref={refs.height}
                    value={inputData.height ?? ''}
                    onChange={handleInputChange}
                    placeholder="신장 입력"
                />
            </div>

            <div>
                <label htmlFor="">체중(kg): </label>
                <input
                    type="number"
                    name="weight"
                    ref={refs.headCircumference}
                    value={inputData.weight ?? ''}
                    onChange={handleInputChange}
                    placeholder="체중 입력"
                />
            </div>

            <div>
                <label htmlFor="">머리둘레(cm): </label>
                <input
                    type="number"
                    name="headCircumference"
                    ref={refs.headCircumference}
                    value={inputData.headCircumference ?? ''}
                    onChange={handleInputChange}
                    placeholder="머리둘레 입력"
                />
            </div>

            <button
                onClick={() => handleClearInput(setInputData, setChildData)}
            >
                초기화
            </button>
            <button
                onClick={() =>
                    handleCalculateChart(refs, inputData, setChildData, setShow)
                }
            >
                계산
            </button>

            <button onClick={() => handleHideChart(setShow)}>
                그래프 접기
            </button>
        </div>
    );
};
