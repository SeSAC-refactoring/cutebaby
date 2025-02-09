import { DiaryChart } from '../components/growth-diary-page/DiaryChart';
import { GrowthCalculate } from '../components/growth-diary-page/GrowthCalculate';
import { DiaryTable } from '../components/growth-diary-page/DiaryTable';
import { BabyList } from '../components/commons/BabyList';
import { DiaryInputArea } from '../components/growth-diary-page/DiaryInputArea';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useSelectBaby } from '../hooks/useSelectBaby';

import styles from '../styles/GrowthDiary.module.scss';
import { useState } from 'react';
import { useGrowData } from '../components/growth-diary-page/hooks/useGrowData';

export default function GrowthDiary() {
    const [openCalModal, setOpenCalModal] = useState<boolean>(false);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);

    const { babyInfo, nothingBaby } = useSelector(
        (state: RootState) => state.baby
    );
    const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);

    const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
    const { growData, setGrowData } = useGrowData(growInfo, selectedBabyId); // growData = growInfo를 selectedBabyId에 따라 필터링 // selectedBabyId가 변경될 때 growData 업데이트

    // const growInfo = sessionStorage.getItem('babygrow');

    console.log('애기 성장정보 입니다 >>>>', growInfo);
    console.log('selectedBabyId에 따른 성장정보 입니다 >>>>', growData);

    return (
        <div className={styles.background}>
            <div className={styles.title_wrap}>
                <div>
                    <div className={styles.title}>성장일지</div>
                    <div className={styles.text}>
                        우리 아이의 성장을 기록하고 상태를 확인해보세요 :)
                    </div>
                </div>
                <button
                    className={styles.cal_btn}
                    onClick={() => {
                        setOpenCalModal(true);
                    }}
                >
                    성장상태 계산 {'>'}
                </button>
            </div>
            <div className={styles.contents_wrap}>
                <BabyList
                    babyInfo={babyInfo}
                    handleSelectBaby={handleSelectBaby}
                    selectedBabyId={selectedBabyId}
                />

                <div className={styles.recent_container}>
                    <div className={styles.recent_record_wrap}>
                        <div>
                            <span className={styles.recent_title}>
                                가장 최근 기록
                            </span>
                            <span className={styles.recent_date}>
                                {new Date(
                                    growData[0].inputData
                                ).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                        <div className={styles.recent_wrap}>
                            <div className={styles.recent_detail}>
                                <div className={styles.height}>
                                    키{' '}
                                    <span className={styles.strong}>
                                        {growData[0].height} cm
                                    </span>
                                </div>
                                <div className={styles.weight}>
                                    몸무게{' '}
                                    <span className={styles.strong}>
                                        {growData[0].weight} kg
                                    </span>
                                </div>
                                <div className={styles.head}>
                                    머리 둘레{' '}
                                    <span className={styles.strong}>
                                        {growData[0].head} cm
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setOpenAddModal(true);
                                }}
                                className={styles.recent_add}
                            >
                                성장기록
                            </button>
                        </div>
                    </div>
                    <DiaryChart />
                </div>
            </div>

            {/* 성장 계산기 모달  */}
            {openCalModal && (
                <GrowthCalculate
                    setOpenCalModal={setOpenCalModal}
                    babyInfo={babyInfo}
                    selectedBabyId={selectedBabyId}
                />
            )}

            {/* 기록추가 모달 */}
            {openAddModal && (
                <div className={styles.block_record}>
                    <div className={styles.add_wrap}>
                        <DiaryInputArea
                            setOpenAddModal={setOpenAddModal}
                            selectedBabyId={selectedBabyId}
                        />
                    </div>

                    <DiaryTable growData={growData} />
                </div>
            )}
        </div>
    );
}
