import React from 'react';
import { useRefs } from '../../hooks/useRefs';
import { ChildData, LmsData, PercentileData, Percentiles } from '../types';
import { handleCalculateChart } from './handleCalculateChart';
import { handleClearInput } from './handleClearInput';
import { useHandleInputChange } from './hooks/useHandleInputChange';
import { handleKeyDown } from './handleKeyDown';

// 사용자 입력값 설정
interface CalculateInputAreaProps {
    childData: ChildData;
    setChildData: React.Dispatch<React.SetStateAction<ChildData>>;
    filteredLmsDataByMonths: LmsData[];
    percentiles: Percentiles;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setPercentiles: React.Dispatch<React.SetStateAction<Percentiles>>;
}

export const CalculateInputArea: React.FC<CalculateInputAreaProps> = ({
    childData,
    filteredLmsDataByMonths,
    percentiles,
    setPercentiles,
    setChildData,
    setShow,
}) => {
    const { handleInputChange, inputData, setInputData } =
        useHandleInputChange(childData);
    const refs = useRefs();

    return (
        <div>
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
                    onKeyDown={(e) =>
                        handleKeyDown(
                            e,
                            refs,
                            inputData,
                            setChildData,
                            setShow,
                            percentiles,
                            setPercentiles
                        )
                    }
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
                    onKeyDown={(e) =>
                        handleKeyDown(
                            e,
                            refs,
                            inputData,
                            setChildData,
                            setShow,
                            percentiles,
                            setPercentiles
                        )
                    }
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
                    onKeyDown={(e) =>
                        handleKeyDown(
                            e,
                            refs,
                            inputData,
                            setChildData,
                            setShow,
                            percentiles,
                            setPercentiles
                        )
                    }
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
                    handleCalculateChart(
                        refs,
                        inputData,
                        setChildData,
                        setShow,
                        percentiles,
                        setPercentiles
                    )
                }
            >
                계산하기
            </button>
        </div>
    );
};
