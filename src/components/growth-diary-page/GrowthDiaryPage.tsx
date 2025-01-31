import { useState } from 'react';
import { ChartComponent } from './ChartComponent';
import { ChildData } from './types';
import { handleShowChart } from './handleShowChart';
import { useFetchData } from './hooks/useFetchData';
import { useCalculateMonths } from './hooks/useCalculateMonths';
import { useHandleInputChange } from './hooks/useHandleInputChange';
import { useRefs } from './hooks/useRefs';
import { useChildData } from './hooks/useChildData';
import { useShowChart } from './hooks/useShowChart';

export const GrowthDiaryPage = () => {
    // customHook 가져오기
    const {
        childData,
        setChildData,
    }: {
        childData: ChildData;
        setChildData: React.Dispatch<React.SetStateAction<ChildData>>;
    } = useChildData();
    const {
        showChart,
        setShowChart,
    }: {
        showChart: boolean;
        setShowChart: React.Dispatch<React.SetStateAction<boolean>>;
    } = useShowChart();
    const { lmsData, percentileData, isLoading } = useFetchData(
        childData,
        showChart
    );
    const handleInputChange = useHandleInputChange(setChildData);
    const refs = useRefs();
    useCalculateMonths(childData, setChildData);

    return (
        <div>
            <h1>GrowthDiaryPage</h1>
            <div>
                <h2>연령별 성장 곡선</h2>

                {/* 사용자 입력값 설정 */}
                <div>
                    <label htmlFor="">성별: </label>
                    <span>{childData.gender}</span>
                </div>

                <div>
                    <label htmlFor="">생년월일: </label>
                    <span>
                        {childData.birthDate.toISOString().split('T')[0]}
                    </span>
                </div>

                <div>
                    <label>측정일: </label>
                    <input
                        type="date"
                        name="measurementDate"
                        ref={refs.measurementDate}
                        value={
                            childData.measurementDate
                                ? childData.measurementDate
                                      .toISOString()
                                      .split('T')[0]
                                : ''
                        }
                        onChange={(e) => {
                            setChildData((prev) => ({
                                ...prev,
                                measurementDate: e.target.value
                                    ? new Date(e.target.value) // string을 Date 객체로 변환
                                    : null,
                            }));
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="">신장(cm): </label>
                    <input
                        type="number"
                        name="height"
                        ref={refs.height}
                        value={childData.height ?? ''}
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
                        value={childData.weight ?? ''}
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
                        value={childData.headCircumference ?? ''}
                        onChange={handleInputChange}
                        placeholder="머리둘레 입력"
                    />
                </div>

                {/* 차트 */}
                <button
                    onClick={() =>
                        handleShowChart(childData, refs, setShowChart)
                    }
                >
                    {showChart ? '차트 숨기기' : '차트 보기'}
                </button>
                {/* 로딩 중일 경우 */}
                {isLoading && <p>로딩 중...</p>}

                {/* 차트 표시 여부에 따라 렌더링 */}
                {showChart && !isLoading && (
                    <ChartComponent
                        childData={childData}
                        lmsData={lmsData}
                        percentileData={percentileData}
                    />
                )}
            </div>
        </div>
    );
};
