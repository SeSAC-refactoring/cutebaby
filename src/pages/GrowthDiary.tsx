import { DiaryChart } from '../components/growth-diary-page/DiaryChart';
import { GrowthCalculate } from '../components/growth-diary-page/GrowthCalculate';
import { DiaryTable } from '../components/growth-diary-page/DiaryTable';
import { BabyList } from '../components/commons/BabyList';
import { DiaryInputArea } from '../components/growth-diary-page/DiaryInputArea';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useSelectBaby } from '../hooks/useSelectBaby';
import { useEffect, useState } from 'react';
import { useGrowData } from '../components/growth-diary-page/hooks/useGrowData';
import { RecentGrowthRecord } from '../components/growth-diary-page/RecentGrowthRecord';
import { useNavigate } from 'react-router-dom';
import { GrowRewriteModal } from '../components/growth-diary-page/GrowRewriteModal';
import { GrowDelModal } from '../components/growth-diary-page/GrowDelModal';
import { BabyInputPlus } from '../components/my-page/BabyInputPlus';
import { GrowthAddModal } from '../components/growth-diary-page/GrowthAddModal';

export default function GrowthDiary() {
    const [openCalModal, setOpenCalModal] = useState<boolean>(false);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [openAppendModal, setOpenAppendModal] = useState<boolean>(false);

    // 수정 및 삭제 모달 상태 추가
    const [openRewriteModal, setOpenRewriteModal] = useState<boolean>(false);
    const [openDelModal, setOpenDelModal] = useState<boolean>(false);
    const [selectedGrowId, setSelectedGrowId] = useState<number | null>(null);
    const [babyPlus, setBabyPlus] = useState<boolean>(false); // 아이 등록 모달 상태

    const { babyInfo, nothingBaby } = useSelector(
        (state: RootState) => state.baby
    );

    //  로그인 안했을 시 // 로그인 페이지로 리디렉션
    const user = sessionStorage.getItem('user');
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    });

    const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);
    const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
    const { growData } = useGrowData(growInfo, selectedBabyId);

    // console.log('애기 성장정보 입니다 >>>>', growInfo);
    // console.log('selectedBabyId에 따른 성장정보 입니다 >>>>', growData);

    //모달 열었을때 배경 스크롤방지
    useEffect(() => {
        if (
            openCalModal ||
            openAppendModal ||
            openAddModal ||
            openRewriteModal ||
            openDelModal ||
            babyPlus
        ) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [
        openCalModal,
        openAppendModal,
        openAddModal,
        openRewriteModal,
        openDelModal,
        babyPlus,
    ]);

    return (
        <main className="grow">
            {/* 성장 계산기 모달 */}
            {openCalModal && (
                <GrowthCalculate
                    setOpenCalModal={setOpenCalModal}
                    babyInfo={babyInfo}
                    selectedBabyId={selectedBabyId}
                />
            )}

            {/* 성장기록 보러가기 모달 */}
            {openAddModal && (
                <GrowthAddModal
                    setSelectedGrowId={setSelectedGrowId}
                    setOpenRewriteModal={setOpenRewriteModal}
                    setOpenAddModal={setOpenAddModal}
                    setOpenAppendModal={setOpenAppendModal}
                    setOpenDelModal={setOpenDelModal}
                    // growId={selectedGrowId}
                />
            )}

            {/* 성장기록 추가하기 모달 */}
            {openAppendModal && (
                <div
                    onClick={() => {
                        setOpenAppendModal(false);
                    }}
                    className="modalBg"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="whiteboxModal"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex justify-between">
                                <h2>성장기록 추가</h2>
                                <div
                                    onClick={() => {
                                        setOpenAppendModal(false);
                                    }}
                                >
                                    <img
                                        src="/img/Button-close.png"
                                        alt="닫기"
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>

                            <DiaryInputArea
                                setOpenAddModal={setOpenAddModal}
                                selectedBabyId={selectedBabyId}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* 수정 모달 */}
            {openRewriteModal && selectedGrowId !== null && (
                <GrowRewriteModal
                    growId={selectedGrowId}
                    growData={growData}
                    onClose={() => setOpenRewriteModal(false)}
                />
            )}

            {/* 삭제 모달 */}
            {openDelModal && selectedGrowId !== null && (
                <GrowDelModal
                    growId={selectedGrowId}
                    growData={growData}
                    onClose={() => setOpenDelModal(false)}
                />
            )}

            {/* 아기 등록 모달 */}
            {babyPlus && (
                <div onClick={() => setBabyPlus(false)}>
                    <BabyInputPlus
                        onClose={() => setBabyPlus(false)}
                        babyInfo={babyInfo}
                    />
                </div>
            )}

            <div className="whitebox">
                <div className="growthDiaryTopArea">
                    <div className="title">
                        <h2>성장일지</h2>
                        <p className="growthDiary">
                            <strong>우리 아이의 성장</strong>을 기록하고 상태를
                            확인해보세요:)
                        </p>
                    </div>

                    <div className="buttons">
                        <button onClick={() => setOpenAppendModal(true)}>
                            <p>성장기록 추가</p>
                            <img
                                src="../img/icons/i-chevron-right-s20.svg"
                                alt="*"
                            />
                        </button>

                        <button onClick={() => setOpenAddModal(true)}>
                            <p>성장기록</p>
                            <img
                                src="../img/icons/i-chevron-right-s20.svg"
                                alt="*"
                            />
                        </button>

                        <button onClick={() => setOpenCalModal(true)}>
                            <p>성장상태 계산</p>
                            <img
                                src="../img/icons/i-chevron-right-s20.svg"
                                alt="*"
                            />
                        </button>
                    </div>
                </div>

                <div className="growthDiaryContentsArea">
                    {babyInfo.length > 0 && (
                        <>
                            <BabyList
                                babyInfo={babyInfo}
                                handleSelectBaby={handleSelectBaby}
                                selectedBabyId={selectedBabyId}
                            />

                            {/* 성장기록 그래프 */}
                            {growData.length > 0 ? (
                                <>
                                    <div className="diaryInputArea-wrap">
                                        <DiaryInputArea
                                            setOpenAddModal={setOpenAddModal}
                                            selectedBabyId={selectedBabyId}
                                        />
                                    </div>

                                    <div className="recent-graph-wrap">
                                        <RecentGrowthRecord
                                            growData={growData}
                                            setOpenAddModal={setOpenAddModal}
                                        />

                                        <div className="graphArea">
                                            <h3>우리 아이 성장 추이</h3>
                                            <div className="graph-wrap">
                                                <DiaryChart
                                                    growData={growData}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}

                            {/* 해당 아기의 성장 기록이 없을 때 */}
                            {growData.length > 0 ? (
                                <></>
                            ) : (
                                <div className=" w-full ">
                                    <div className="w-full gap-3 flex justify-between mt-8 h-[18.75rem] ">
                                        <div className="w-[53.5rem] bg-gray-1 rounded-[2rem] h-[28rem] "></div>
                                        <div className="w-[17.5rem] bg-gray-1 rounded-[2rem] hidden sm:block h-[28rem]"></div>
                                    </div>
                                    <div className="w-full h-[31.25rem] relative bottom-[18.75rem] flex justify-center items-center backdrop-blur-sm ">
                                        <div className="flex flex-col items-center z-[100] gap-6 pb-20">
                                            <img src="/img/Ggoggo-002.png" />
                                            <div className="text-xl font-md text-gray-6">
                                                등록된 기록이 없습니다!
                                            </div>

                                            <button
                                                className="button-black button-md"
                                                onClick={() => {
                                                    setOpenAddModal(true);
                                                }}
                                            >
                                                성장기록 등록하기
                                                <img
                                                    src="../img/icons/i-chevron-right-s28.svg"
                                                    alt=">"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* 등록된 아기가 없을 때 화면 */}
                    {babyInfo.length === 0 && (
                        <div className=" w-full ">
                            <div className="flex flex-col gap-2 w-full h-[38.75rem]">
                                <div className="h-[4rem] bg-gray-1 rounded-[2rem]"></div>
                                <div className="flex justify-between w-full gap-3">
                                    <div className="w-[53.5rem] h-[30rem] bg-gray-1 rounded-[2rem]"></div>
                                    <div className="w-[17.5rem] h-[30rem] bg-gray-1 rounded-[2rem] hidden sm:block"></div>
                                </div>
                            </div>
                            <div className="w-full h-[34.75rem] relative bottom-[38.75rem] flex justify-center items-center backdrop-blur-sm ">
                                <div className="flex flex-col items-center z-[100] gap-6 ">
                                    <img src="/img/Ggoggo-002.png" />
                                    <div className="text-xl font-md text-gray-6 ">
                                        등록된 아이가 없습니다!
                                    </div>

                                    <button
                                        onClick={() => setBabyPlus(true)}
                                        className="button button-black button-lg"
                                    >
                                        아이 등록하기
                                        <img
                                            src="../img/icons/i-chevron-right-s28.svg"
                                            alt="바로가기 아이콘"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
