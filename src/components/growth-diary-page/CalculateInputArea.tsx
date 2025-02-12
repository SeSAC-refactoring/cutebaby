import React from 'react';
import { useRefs } from '../../hooks/useRefs';
import { ChildData, LmsData, Percentiles } from '../types';

import { handleClearInput } from './functions/handleClearInput';
import { useHandleInputChange } from './hooks/useHandleInputChange';
import { handleKeyDown } from './functions/handleKeyDown';
import { handleCalculateChart } from './functions/handleCalculateChart';

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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '32px 48px',
                marginBottom: '48px',
                backgroundColor: '#FEF9F1',
                borderRadius: '32px',
                width: '1000px',
                boxSizing: 'border-box',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label
                        style={{
                            color: '#5D5D67',
                            marginBottom: '8px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                        }}
                    >
                        측정날짜
                    </label>
                    <input
                        style={{
                            width: '280px',
                            height: '84px',
                            borderRadius: '16px',
                            border: '2px solid #838391',
                            color: '#B1B1BA',
                            fontSize: '22px',
                            paddingLeft: '24px',
                            paddingRight: '24px',
                            marginRight: '12px',
                        }}
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

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label
                        style={{
                            color: '#5D5D67',
                            marginBottom: '8px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                        }}
                        htmlFor=""
                    >
                        키{' '}
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            style={{
                                width: '126px',
                                height: '84px',
                                borderRadius: '16px',
                                border: '2px solid #838391',
                                color: '#B1B1BA',
                                fontSize: '22px',
                                paddingLeft: '24px',
                            }}
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
                                    setShow
                                )
                            }
                            placeholder="숫자만"
                        />
                        <span
                            style={{ marginLeft: '8px', marginRight: '12px' }}
                        >
                            cm
                        </span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label
                        style={{
                            color: '#5D5D67',
                            marginBottom: '8px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                        }}
                        htmlFor=""
                    >
                        몸무게{' '}
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            style={{
                                width: '126px',
                                height: '84px',
                                borderRadius: '16px',
                                border: '2px solid #838391',
                                color: '#B1B1BA',
                                fontSize: '22px',
                                paddingLeft: '24px',
                            }}
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
                                    setShow
                                )
                            }
                            placeholder="숫자만"
                        />
                        <span
                            style={{ marginLeft: '8px', marginRight: '12px' }}
                        >
                            kg
                        </span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label
                        style={{
                            color: '#5D5D67',
                            marginBottom: '8px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                        }}
                        htmlFor=""
                    >
                        머리둘레
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            style={{
                                width: '126px',
                                height: '84px',
                                borderRadius: '16px',
                                border: '2px solid #838391',
                                color: '#B1B1BA',
                                fontSize: '22px',
                                paddingLeft: '24px',
                            }}
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
                                    setShow
                                )
                            }
                            placeholder="숫자만"
                        />
                        <span style={{ marginLeft: '8px' }}>cm</span>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '32px',
                }}
            >
                <p>
                    백분위수란 같은 성별과 연령을 가진 100명을 오름차순으로
                    나열했을 때 이 중 몇 번째에 해당되는지를 의미합니다. (예:
                    97%는 상위 3%를 의미)
                </p>
                <button
                    style={{
                        width: '142px',
                        height: '64px',
                        marginRight: '16px',
                        backgroundColor: '#F6D9A7',
                        fontSize: '22px',
                        borderRadius: '16px',
                        border: 'none',
                    }}
                    onClick={() =>
                        handleClearInput(setInputData, setChildData, setShow)
                    }
                >
                    초기화
                </button>
                <button
                    style={{
                        width: '142px',
                        height: '64px',
                        backgroundColor: '#3B3B41',
                        color: 'white',
                        fontSize: '22px',
                        borderRadius: '16px',
                        border: 'none',
                    }}
                    onClick={() =>
                        handleCalculateChart(
                            refs,
                            inputData,
                            setChildData,
                            setShow
                        )
                    }
                >
                    계산하기
                </button>
            </div>
        </div>
    );
};
