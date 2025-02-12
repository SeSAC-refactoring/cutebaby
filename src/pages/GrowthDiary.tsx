import { DiaryChart } from '../components/growth-diary-page/DiaryChart';
import { GrowthCalculate } from '../components/growth-diary-page/GrowthCalculate';
import { DiaryTable } from '../components/growth-diary-page/DiaryTable';
import { BabyList } from '../components/commons/BabyList';
import { DiaryInputArea } from '../components/growth-diary-page/DiaryInputArea';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useSelectBaby } from '../hooks/useSelectBaby';
import layout from '../styles/commons/Layout.module.scss';
import typography from '../styles/commons/Typography.module.scss';
import button from '../styles/commons/Button.module.scss';
import styles from '../styles/GrowthDiary.module.scss';
import { useEffect, useState } from 'react';
import { useGrowData } from '../components/growth-diary-page/hooks/useGrowData';
import { RecentGrowthRecord } from '../components/growth-diary-page/RecentGrowthRecord';
import { NeedLoginModal } from '../components/my-page/NeedLoginModal';
import { BabyListColumn } from '../components/commons/BabyListColumn';
import { Link } from 'react-router-dom';

export default function GrowthDiary() {
    const [openCalModal, setOpenCalModal] = useState<boolean>(false);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

    const { babyInfo, nothingBaby } = useSelector(
        (state: RootState) => state.baby
    );
    const user = sessionStorage.getItem('user');

    useEffect(() => {
        if (!user) {
            setOpenLoginModal(true);
        }
    });
    const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);
    console.log(growInfo, '1234');

    const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
    const { growData } = useGrowData(growInfo, selectedBabyId); // growData = growInfo를 selectedBabyId에 따라 필터링 // selectedBabyId가 변경될 때 growData 업데이트
    console.log(growData, 'asdf');
    // const growInfo = sessionStorage.getItem('babygrow');

    console.log('애기 성장정보 입니다 >>>>', growInfo);
    console.log('selectedBabyId에 따른 성장정보 입니다 >>>>', growData);

    return (
        <div className={layout.container}>
            {openLoginModal && (
                <NeedLoginModal modalState={() => setOpenLoginModal(false)} />
            )}
            <div className={layout.contentsArea}>
                <div className={layout.titleArea}>
                    <div className={layout.textWrap}>
                        <div
                            className={[
                                layout.title,
                                typography.text4xlBd,
                            ].join(' ')}
                        >
                            성장일지
                        </div>
                        <div
                            className={[
                                layout.pageGuide,
                                typography.textXlMd,
                            ].join(' ')}
                        >
                            <strong className={typography.textXlBd}>
                                우리 아이의 성장
                            </strong>
                            을 기록하고 상태를 확인해보세요:)
                        </div>
                    </div>
                    <button
                        className={[button.btnSmYw, typography.textBsBd].join(
                            ' '
                        )}
                        onClick={() => setOpenCalModal(true)}
                    >
                        성장상태 계산 {'>'}
                    </button>
                </div>

                <div className={styles.contentsArea}>
                    {growData.length > 0 ? (
                        <BabyList
                            babyInfo={babyInfo}
                            handleSelectBaby={handleSelectBaby}
                            selectedBabyId={selectedBabyId}
                        />
                    ) : (
                        // 등록된 아기가 없을 때
                        <>
                            <img src="img/Contents.png" alt="성장일지 이미지" />
                            <Link to="/Mypage">
                                <button
                                    className={[
                                        button.btnLgBk,
                                        typography.textLgBd,
                                    ].join(' ')}
                                >
                                    아이 등록하기 {'>'}
                                </button>
                            </Link>
                        </>
                    )}

                    <div className={styles.recent_container}>
                        {growData.length > 0 ? (
                            <>
                                <div className={styles.recent_record_wrap}>
                                    {/* 성장기록 그래프 */}
                                    <div
                                        style={{
                                            width: '808px',
                                            height: '476px',
                                            marginTop: '24px',
                                            border: '3px solid #D1E9F1',
                                            borderRadius: '32px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                margin: '32px 0px 0px 40px',
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            우리아이 성장 추이
                                        </div>
                                        {growData.length > 0 ? (
                                            <DiaryChart growData={growData} />
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                    <RecentGrowthRecord
                                        growData={growData}
                                        setOpenAddModal={setOpenAddModal}
                                    />
                                </div>
                            </>
                        ) : (
                            <p style={{ visibility: 'hidden' }}>데이터 없음</p>
                        )}
                    </div>
                </div>

                {/* 성장 계산기 모달 */}
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
        </div>
    );
}
