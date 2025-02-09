import { CalculateChart } from './CalculateChart';
import { useFetchData } from './hooks/useFetchData';
import { useChildData } from '../../hooks/useChildData';
import { useShow } from '../../hooks/useShow';
import { CalculateInputArea } from './CalculateInputArea';
import { CalculateDefaultState } from './CalculateDefaultState';
import { usePercentiles } from './hooks/usePercentiles';
import { useFilteredLmsDataByMonths } from './hooks/useFilteredLmsDataByMonths ';
import { useFilteredLmsDataByGender } from './hooks/useFilteredLmsDataByGender ';
import { babyinfo } from '../types';
import { useUpdateChildData } from './hooks/useUpdateChildData';

interface GrowthCalculateProps {
    babyInfo: babyinfo[];
    selectedBabyId: number | null;
}

export const GrowthCalculate: React.FC<GrowthCalculateProps> = ({
    babyInfo,
    selectedBabyId,
}) => {
    // customHook 가져오기
    const { childData, setChildData } = useChildData(babyInfo, selectedBabyId);
    const { show, setShow } = useShow();
    const { lmsData, percentileData, isLoading } = useFetchData(
        childData,
        show
    );

    // selectedBabyId가 변경될 때 childData 업데이트
    useUpdateChildData(babyInfo, selectedBabyId, setChildData);

    // lmsData // 성별과 일치하는 데이터만 필터링
    const filteredLmsDataByGender = useFilteredLmsDataByGender(
        lmsData,
        childData
    );
    console.log(
        'GrowthCalculate: filteredLmsDataByGender>>>',
        filteredLmsDataByGender
    );

    // lmsData // 성별+개월수까지 일치하는 데이터 필터링
    const filteredLmsDataByMonths = useFilteredLmsDataByMonths(
        filteredLmsDataByGender,
        childData
    );

    const { percentiles, setPercentiles } = usePercentiles(
        childData,
        percentileData,
        filteredLmsDataByMonths
    );

    return (
        <div>
            <h1>성장상태 측정계산기</h1>
            <p>우리 아이의 성장 상태를 확인해보세요:)</p>
            <div>
                {/* 사용자 입력값 설정 */}
                <CalculateInputArea
                    childData={childData}
                    filteredLmsDataByMonths={filteredLmsDataByMonths}
                    percentiles={percentiles}
                    setChildData={setChildData}
                    setShow={setShow}
                    setPercentiles={setPercentiles}
                />

                {/* 차트 */}
                {/* 로딩 중일 경우 */}
                {isLoading && <p>로딩 중...</p>}

                {/* 차트 표시 여부에 따라 렌더링 */}
                {show && !isLoading && (
                    <CalculateChart
                        childData={childData}
                        filteredLmsDataByGender={filteredLmsDataByGender}
                        filteredLmsDataByMonths={filteredLmsDataByMonths}
                        percentileData={percentileData}
                        percentiles={percentiles}
                    />
                )}

                {!show && <CalculateDefaultState />}
            </div>
        </div>
    );
};
