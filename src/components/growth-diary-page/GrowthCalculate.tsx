import { CalculateChart } from './CalculateChart';
import { ChildData } from '../types';
import { useFetchData } from './hooks/useFetchData';
import { useCalculateMonths } from '../../hooks/useCalculateMonths';
import { useRefs } from '../../hooks/useRefs';
import { useChildData } from '../../hooks/useChildData';
import { useShow } from '../../hooks/useShow';
import { CalculateInputArea } from './CalculateInputArea';

export const GrowthCalculate = () => {
    // customHook 가져오기
    const { childData, setChildData } = useChildData();
    const { show, setShow } = useShow();
    const { lmsData, percentileData, isLoading } = useFetchData(
        childData,
        show
    );

    useCalculateMonths(childData, setChildData);

    return (
        <div>
            <h1>성장상태 측정계산기</h1>
            <p>우리 아이의 성장 상태를 확인해보세요:)</p>
            <div>
                {/* 사용자 입력값 설정 */}
                <CalculateInputArea
                    childData={childData}
                    setChildData={setChildData}
                    setShow={setShow}
                />

                {/* 차트 */}

                {/* 로딩 중일 경우 */}
                {isLoading && <p>로딩 중...</p>}

                {/* 차트 표시 여부에 따라 렌더링 */}
                {show && !isLoading && (
                    <CalculateChart
                        childData={childData}
                        lmsData={lmsData}
                        percentileData={percentileData}
                        setShow={setShow}
                    />
                )}
            </div>
        </div>
    );
};
