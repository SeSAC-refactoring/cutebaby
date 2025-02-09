import { CalculateChart } from './CalculateChart';
import { useFetchData } from './hooks/useFetchData';
import { useChildData } from './hooks/useChildData';
import { useShow } from '../../hooks/useShow';
import { CalculateInputArea } from './CalculateInputArea';
import { CalculateDefaultState } from './CalculateDefaultState';
import { usePercentiles } from './hooks/usePercentiles';
import { useFilteredLmsDataByMonths } from './hooks/useFilteredLmsDataByMonths ';
import { useFilteredLmsDataByGender } from './hooks/useFilteredLmsDataByGender ';
import { babyinfo } from '../types';
import { handleCalculateChart } from './handleCalculateChart';

interface GrowthCalculateProps {
    setOpenCalModal: React.Dispatch<React.SetStateAction<boolean>>;
    babyInfo: babyinfo[];
    selectedBabyId: number | null;
}

export const GrowthCalculate: React.FC<GrowthCalculateProps> = ({
    setOpenCalModal,
    babyInfo,
    selectedBabyId,
}) => {
    // customHook 가져오기
    const { childData, setChildData } = useChildData(babyInfo, selectedBabyId); // babyInfo / selectedBabyId가 변경될 때 childData 업데이트
    const { show, setShow } = useShow();
    const { lmsData, percentileData, isLoading } = useFetchData(
        childData,
        show
    );
    const { filteredLmsDataByGender } = useFilteredLmsDataByGender(
        lmsData,
        childData
    ); // lmsData -> 성별과 일치하는 데이터만 필터링
    const { filteredLmsDataByMonths } = useFilteredLmsDataByMonths(
        filteredLmsDataByGender,
        childData
    ); // lmsData -> 성별+개월수까지 일치하는 데이터 필터링
    const { percentiles, setPercentiles } = usePercentiles(
        childData,
        percentileData,
        filteredLmsDataByMonths
    );

    return (
        <div
            style={{
                backgroundColor: 'white',
                width: '1160px',
                // height: "1148px",
                position: 'absolute',
                top: '30%',
                left: '20%',
                border: '2px solid #838391',
                borderRadius: '40px',
                // transform: "translate(-50%,-50%)",
                display: 'flex',
                // justifyContent: "center",
                padding: '80px',
                boxSizing: 'border-box',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '1000px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '48px',
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontSize: '40px',
                                fontWeight: 'bold',
                                marginBottom: '16px',
                            }}
                        >
                            성장상태 측정계산기
                        </div>
                        <p style={{ color: '#9999A5' }}>
                            우리 아이의 성장 상태를 확인해보세요:)
                        </p>
                    </div>
                    <div
                        style={{
                            color: '#3B3B41',
                            fontSize: '48px',
                            height: '48px',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            setOpenCalModal(false);
                        }}
                    >
                        X
                    </div>
                </div>
                <div style={{ width: '1000px' }}>
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
                    {/* 차트 표시 여부에 따라 렌더링 */}{' '}
                    {show ? (
                        isLoading ? (
                            <p>로딩 중...</p>
                        ) : (
                            <CalculateChart
                                childData={childData}
                                filteredLmsDataByGender={
                                    filteredLmsDataByGender
                                }
                                filteredLmsDataByMonths={
                                    filteredLmsDataByMonths
                                }
                                percentileData={percentileData}
                                percentiles={percentiles}
                            />
                        )
                    ) : (
                        <CalculateDefaultState />
                    )}
                </div>
            </div>
        </div>
    );
};
