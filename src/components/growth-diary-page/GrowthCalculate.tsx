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
import { useState } from 'react';

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

    // console.log("GrowthCalculate 모달의 childData", childData);

    const [openResultModal, setOpenResultModal] = useState<boolean>(false);

    return (
        <div
            onClick={() => {
                setOpenCalModal(false);
            }}
            className="modalBg"
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="whiteboxModal growthCalculate"
            >
                <section className="topArea">
                    <div className="title">
                        <h2>성장상태 측정계산기</h2>
                        <p>우리 아이의 성장 상태를 확인해보세요:)</p>
                    </div>

                    <div
                        className="close"
                        onClick={() => {
                            setOpenCalModal(false);
                        }}
                    >
                        <img
                            src="/img/icons/i-modal-close-s32.svg"
                            alt="닫기"
                        />
                    </div>
                </section>

                <section className="contentsArea">
                    {/* 사용자 입력값 설정 */}
                    <CalculateInputArea
                        childData={childData}
                        setChildData={setChildData}
                        setShow={setShow}
                        setOpenResultModal={setOpenResultModal}
                    />

                    {/* 결과 (차트) 모달 */}
                    {openResultModal && (
                        <article className="resultArea">
                            <div
                                onClick={() => {
                                    setOpenResultModal(false);
                                }}
                                className="resultModalBg"
                            >
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="resultWhiteboxModal"
                                >
                                    <section className="topArea sm:hidden">
                                        <div className="title">
                                            <h2>계산 결과</h2>
                                        </div>

                                        <div
                                            className="close"
                                            onClick={() => {
                                                setOpenResultModal(false);
                                            }}
                                        >
                                            <img
                                                src="/img/icons/i-modal-close-s32.svg"
                                                alt="닫기"
                                            />
                                        </div>
                                    </section>

                                    {show ? (
                                        isLoading ? (
                                            <div className="response-state">
                                                <img
                                                    src="/img/visuals/visual_loading_ggomul_04.svg"
                                                    alt="이미지"
                                                />
                                                <div className="text">
                                                    <p>
                                                        자료를 가져오고 있어요..
                                                    </p>
                                                    <p>조금만 기다려주세요..</p>
                                                </div>
                                            </div>
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
                        </article>
                    )}
                </section>
            </div>
        </div>
    );
};
