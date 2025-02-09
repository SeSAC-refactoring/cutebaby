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

export default function GrowthDiary() {
    const [openCalModal, setOpenCalModal] = useState<boolean>(false);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);

    const { babyInfo, nothingBaby } = useSelector(
        (state: RootState) => state.baby
    );
    const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);

    const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
    // const growInfo = sessionStorage.getItem('babygrow');

    console.log('애기 성장정보 입니다 >>>>', growInfo);
    return (
        <div className={styles.background}>
            <div className={styles.title_wrap}>
                <div>
                    <div className={styles.title}>성장기록</div>
                    <div className={styles.text}>
                        우리 아이의 성장을 기록하고 상태를 확인해보세요 :)
                    </div>

                    <div>
                        {Array.isArray(growInfo) && growInfo.length > 0 ? (
                            <ul>
                                {growInfo
                                    .flat() // 중첩 배열을 평탄화
                                    .filter(
                                        (info) => info.babyid === selectedBabyId
                                    ) // 선택한 아기 ID에 맞는 데이터만 필터링
                                    .map((info, index) => (
                                        <li key={index}>
                                            {info.inputData} - 키: {info.height}
                                            cm, 몸무게: {info.weight}kg
                                        </li>
                                    ))}
                            </ul>
                        ) : (
                            <p>성장 기록이 없습니다.</p>
                        )}
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
                    nothingBaby={nothingBaby}
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
                                2025년 2월 8일
                            </span>
                        </div>
                        <div className={styles.recent_wrap}>
                            <div className={styles.recent_detail}>
                                <div className={styles.height}>
                                    키{' '}
                                    <span className={styles.strong}>
                                        100 cm
                                    </span>
                                </div>
                                <div className={styles.weight}>
                                    몸무게{' '}
                                    <span className={styles.strong}>30 kg</span>
                                </div>
                                <div className={styles.head}>
                                    머리 둘레{' '}
                                    <span className={styles.strong}>20 cm</span>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setOpenAddModal(true);
                                }}
                                className={styles.recent_add}
                            >
                                기록 추가
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

                    <DiaryTable
                        babyInfo={babyInfo}
                        nothingBaby={nothingBaby}
                        selectedBabyId={selectedBabyId}
                    />
                </div>
            )}
        </div>
    );
}
