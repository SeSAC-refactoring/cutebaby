import React, { useCallback, useEffect, useState } from 'react';
import { ChildData } from '../../types';
import {
    fetchGrowthChartLms,
    fetchGrowthChartPercentile,
} from '../../api-data/growthChart';
import { useLoading } from '../../../hooks/useLoading';

// LMS와 퍼센타일 api 가져오기
export const useFetchData = (childData: ChildData, show: boolean) => {
    const [lmsData, setLmsData] = useState([]); // 입력값에 따른 z-score
    const [percentileData, setPercentileData] = useState([]); // 퍼센타일
    const { isLoading, startLoading, stopLoading } = useLoading(); // 커스텀 훅 사용

    // lms api 가져오기 // childData 변경 시 실행, showChart가 true일 때 실행 // useCallback()으로 최적화
    useEffect(() => {
        console.log('🔍 useEffect 실행됨!');
        console.log('🟡 show 상태:', show);
        console.log('🟡 childData:', childData);

        const fetchLmsData = async () => {
            if (!show) return; // 계산하기를 안눌렀다면 실행 안함
            if (!childData.months || !childData.gender) return; // 필수 정보가 없으면 실행 안함
            startLoading();

            try {
                const data = await fetchGrowthChartLms();
                setLmsData(data);
            } catch (error) {
                console.error('Error fetching LMS data:', error);
            } finally {
                stopLoading(); // 로딩 종료
            }
        };

        fetchLmsData();
    }, [childData, show]);

    // percentile api 가져오기 // 버튼 클릭 후 최초 1회만 실행
    useEffect(() => {
        const fetchPercentileData = async () => {
            if (show && percentileData.length === 0) {
                startLoading();
                try {
                    const data = await fetchGrowthChartPercentile();
                    setPercentileData(data);
                } catch (error) {
                    console.error('Error fetching percentile data:', error);
                } finally {
                    stopLoading(); // 로딩 종료
                }
            }
        };
        fetchPercentileData();
    }, [show]); // show가 true로 변경될 때 실행

    return { lmsData, percentileData, isLoading };
};
