import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    fetchGrowthChartLms,
    fetchGrowthChartPercentile,
} from '../../api-data/growthChart';

import { ChartComponent } from './ChartComponent';
import { ChildData } from './types';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';

export const GrowthDiaryPage = () => {
    // 상태 관리
    const [growthData, setGrowthData] = useState([]); // 입력값에 따른 z-score
    const [percentileData, setPercentileData] = useState([]); // 퍼센타일
    const [childData, setChildData] = useState<ChildData>({
        gender: 'male',
        birthDate: new Date('2025-01-23'),
        measurementDate: null,
        height: null,
        weight: null,
        headCircumference: null,
    });
    const [showChart, setShowChart] = useState<boolean>(false); // 차트 표시 여부
    const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태

    // 입력 필드 ref
    const measurementDateRef = useRef<HTMLInputElement>(null);
    const heightRef = useRef<HTMLInputElement>(null);
    const weightRef = useRef<HTMLInputElement>(null);
    const headCircumferenceRef = useRef<HTMLInputElement>(null);

    // 개월 수 계산 // useMemo()로 최적화
    const months = useMemo(() => {
        if (!childData.birthDate || !childData.measurementDate) return null;

        const yearsDiff =
            childData.measurementDate.getFullYear() -
            childData.birthDate.getFullYear();
        const monthsDiff =
            childData.measurementDate.getMonth() -
            childData.birthDate.getMonth();

        return yearsDiff * 12 + monthsDiff;
    }, [childData.measurementDate]); // measurementDate 변경 시에만 실행

    // lms api 가져오기 // childData 변경 시 실행, showChart가 true일 때 실행 // useCallback()으로 최적화
    const fetchLmsData = useCallback(async () => {
        if (!showChart) return; // 차트보기를 안눌렀다면 실행 안함
        if (!months || !childData.gender) return; // 필수 정보가 없으면 실행 안함
        setIsLoading(true);

        try {
            const data = await fetchGrowthChartLms();
            setGrowthData(data);
        } catch (error) {
            console.error('Error fetching LMS data:', error);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    }, [childData, showChart]);
    useEffect(() => {
        fetchLmsData();
    }, [fetchLmsData]);

    // percentile api 가져오기 // 버튼 클릭 후 최초 1회만 실행
    useEffect(() => {
        const fetchPercentileData = async () => {
            if (showChart && percentileData.length === 0) {
                setIsLoading(true);
                try {
                    const data = await fetchGrowthChartPercentile();
                    setPercentileData(data);
                } catch (error) {
                    console.error('Error fetching percentile data:', error);
                } finally {
                    setIsLoading(false); // 로딩 종료
                }
            }
        };
        fetchPercentileData();
    }, [showChart]); // showChart가 true로 변경될 때 실행

    // 입력값 변경 (입력 필드 업데이트)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChildData((prev) => ({
            ...prev,
            [name]: value ? parseFloat(value) : null, // string -> number로 형변환하여 저장
        }));
    };

    // 차트를 보는 버튼 클릭 시
    const handleShowChart = () => {
        // 측정일 값 없으면 input focus
        if (!childData.measurementDate) {
            measurementDateRef.current?.focus();
            return;
        }

        // 신장, 몸무게, 머리둘레 값이 모두 없으면 input focus
        if (
            !childData.height &&
            !childData.weight &&
            !childData.headCircumference
        ) {
            heightRef.current?.focus();
            return;
        }

        setShowChart(!showChart);
    };

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
                        ref={measurementDateRef}
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
                        ref={heightRef}
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
                        ref={weightRef}
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
                        ref={headCircumferenceRef}
                        value={childData.headCircumference ?? ''}
                        onChange={handleInputChange}
                        placeholder="머리둘레 입력"
                    />
                </div>

                {/* 차트 */}
                <button onClick={handleShowChart}>
                    {showChart ? '차트 숨기기' : '차트 보기'}
                </button>
                {/* 로딩 중일 경우 */}
                {isLoading && <p>로딩 중...</p>}

                {/* 차트 표시 여부에 따라 렌더링 */}
                {showChart && !isLoading && (
                    <ChartComponent
                        childData={childData}
                        growthData={growthData}
                        percentileData={percentileData}
                    />
                )}
            </div>
        </div>
    );
};
