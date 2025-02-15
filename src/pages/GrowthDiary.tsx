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
import { Link, useNavigate } from 'react-router-dom';
import { GrowRewriteModal } from '../components/growth-diary-page/GrowRewriteModal';
import { GrowDelModal } from '../components/growth-diary-page/GrowDelModal';
import { CenterList } from '../components/vaccination-page/CenterList';

export default function GrowthDiary() {
    const [openCalModal, setOpenCalModal] = useState<boolean>(false);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);

    // 수정 및 삭제 모달 상태 추가
    const [openRewriteModal, setOpenRewriteModal] = useState<boolean>(false);
    const [openDelModal, setOpenDelModal] = useState<boolean>(false);
    const [selectedGrowId, setSelectedGrowId] = useState<number | null>(null);

    const { babyInfo, nothingBaby } = useSelector(
        (state: RootState) => state.baby
    );

    //  로그인 안했을 시 // 로그인 페이지로 리디렉션
    const user = sessionStorage.getItem('user');
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            // navigate("/");
        }
    });

    const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);
    const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
    const { growData } = useGrowData(growInfo, selectedBabyId);
    const [page1, setPage1] = useState(false);
    const [page2, setPage2] = useState(false);
    const [page3, setPage3] = useState(false);

    useEffect(() => {
        if (babyInfo.length > 0 && growData.length > 0) {
            //모든 데이터 다 있음
            setPage1(true);
            setPage2(false);
            setPage3(false);
        } else if (babyInfo.length > 0 && growData.length === 0) {
            //아기 데이터 O, 성장 데이터 X
            setPage2(true);
            setPage1(false);
            setPage3(false);
        } else {
            //모든 데이터 X
            setPage3(true);
            setPage1(false);
            setPage2(false);
        }
    });

    console.log('애기 성장정보 입니다 >>>>', growInfo);
    console.log('selectedBabyId에 따른 성장정보 입니다 >>>>', growData);

    // 수정 모달 열기
    const handleEdit = (growId: number) => {
        setSelectedGrowId(growId);
        setOpenRewriteModal(true);
    };

    // 삭제 모달 열기
    const handleDelete = (growId: number) => {
        setSelectedGrowId(growId);
        setOpenDelModal(true);
    };
    console.log(page1, page2, page3);

    return (
        <div className={layout.container}>
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
                <div
                    className={styles.modal_background_wrap}
                    onClick={() => setOpenAddModal(false)}
                >
                    <div
                        className={styles.block_record}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.add_wrap}>
                            <DiaryInputArea
                                setOpenAddModal={setOpenAddModal}
                                selectedBabyId={selectedBabyId}
                            />
                        </div>
                        <DiaryTable
                            growData={growData}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
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
                                    <div className={styles.recent_record_wrap}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignContent: 'center',
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '808px',
                                                    height: '476px',
                                                    marginTop: '24px',
                                                    border: '3px solid #D1E9F1',
                                                    borderRadius: '32px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        margin: '32px 0px 0px 40px',
                                                        fontSize: '18px',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    우리 아이 성장 추이
                                                </div>
                                                <div
                                                    style={{
                                                        padding: '2%',
                                                    }}
                                                >
                                                    <DiaryChart
                                                        growData={growData}
                                                    />
                                                </div>
                                            </div>
                                            <RecentGrowthRecord
                                                growData={growData}
                                                setOpenAddModal={
                                                    setOpenAddModal
                                                }
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}

                            {growData.length > 0 ? (
                                <></>
                            ) : (
                                <>
                                    <div
                                        style={{ marginTop: '32px' }}
                                        className={styles.no_baby_box2_Wrap}
                                    >
                                        <div
                                            className={styles.no_baby_box2_1}
                                        ></div>
                                        <div
                                            className={styles.no_baby_box2_2}
                                        ></div>
                                    </div>
                                    <div
                                        style={{
                                            height: '512px',
                                            bottom: '512px',
                                        }}
                                        className={styles.blur_background}
                                    >
                                        <div className={styles.blur_container}>
                                            <img src="/img/Ggoggo-002.png" />
                                            <div className={styles.blur_text}>
                                                등록된 기록이 없습니다!
                                            </div>

                                            <button
                                                onClick={() => {
                                                    setOpenAddModal(true);
                                                }}
                                                className={
                                                    styles.baby_enroll_btn
                                                }
                                            >
                                                성장일지 등록하기 {'>'}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    {babyInfo.length === 0 && (
                        <>
                            <div className={styles.no_baby_wrap}>
                                <div className={styles.no_baby_box1}></div>
                                <div className={styles.no_baby_box2_Wrap}>
                                    <div
                                        className={styles.no_baby_box2_1}
                                    ></div>
                                    <div
                                        className={styles.no_baby_box2_2}
                                    ></div>
                                </div>
                            </div>
                            <div className={styles.blur_background}>
                                <div className={styles.blur_container}>
                                    <img src="/img/Ggoggo-002.png" />
                                    <div className={styles.blur_text}>
                                        등록된 아이가 없습니다!
                                    </div>
                                    <Link to="/Mypage">
                                        <button
                                            className={styles.baby_enroll_btn}
                                        >
                                            아이 등록하기 {'>'}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                    {/* {babyInfo.length > 0 ? (
            <BabyList
              babyInfo={babyInfo}
              handleSelectBaby={handleSelectBaby}
              selectedBabyId={selectedBabyId}
            />
          ) : (
            <></>
          )}
          {growData.length > 0 ? (
            <BabyList
              babyInfo={babyInfo}
              handleSelectBaby={handleSelectBaby}
              selectedBabyId={selectedBabyId}
            />
          ) : (
            <>
              <div className={styles.no_baby_wrap}>
                <div className={styles.no_baby_box1}></div>
                <div className={styles.no_baby_box2_Wrap}>
                  <div className={styles.no_baby_box2_1}></div>
                  <div className={styles.no_baby_box2_2}></div>
                </div>
              </div>
              <div className={styles.blur_background}>
                <div className={styles.blur_container}>
                  <img src="/img/Ggoggo-002.png" />
                  <div className={styles.blur_text}>
                    등록된 아이가 없습니다!
                  </div>
                  <Link to="/Mypage">
                    <button className={styles.baby_enroll_btn}>
                      아이 등록하기 {">"}
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )} */}
                </div>
            </div>
        </div>
    );
}
