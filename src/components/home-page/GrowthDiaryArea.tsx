import React, { useEffect } from 'react';
import { ButtonArea } from './ButtonArea';
import { BabyList } from '../commons/BabyList';
import { DiaryChart } from '../growth-diary-page/DiaryChart';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchgrowInfo } from '../../store/GrowthDiarySlice';
import { useSelectBaby } from '../../hooks/useSelectBaby';
import { useGrowData } from '../growth-diary-page/hooks/useGrowData';

interface GrowthDiaryAreaProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GrowthDiaryArea: React.FC<GrowthDiaryAreaProps> = ({
    setLoading,
}) => {
    // store에서 정보 가져오기
    const dispatch = useDispatch<AppDispatch>();
    const { babyInfo } = useSelector((state: RootState) => state.baby);
    const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);
    const username = sessionStorage.getItem('username') ?? '방문자'; // userinfo 및 성장 정보 가져오기

    useEffect(() => {
        setLoading(true); // 로딩 시작

        const fetchData = async () => {
            try {
                // userinfo 가져오기
                const userinfo = sessionStorage.getItem('user'); // 올바른 키 이름 사용
                if (!userinfo) {
                    // console.warn("Userinfo not found in sessionStorage");
                    return; // userinfo가 없으면 로딩 종료
                }

                // 성장 정보 가져오기
                if (username !== '방문자' && babyInfo.length > 0) {
                    await dispatch(fetchgrowInfo(babyInfo));
                }
            } catch (error) {
                // console.error("데이터 가져오기 실패:", error);
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchData();
    }, [babyInfo, dispatch, username]);

    // 커스텀 훅 사용
    const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
    const { growData } = useGrowData(growInfo, selectedBabyId);

    return (
        <article className="growthDiaryArea">
            <h3>우리 아이 성장 그래프</h3>
            {/* 로그인 X */}
            {username === '방문자' ? (
                <figure className="noBabyList">
                    <div className="chartImgWrapper ">
                        <img
                            src="img/visuals/visuals-home-barLineChart.svg"
                            alt="그래프 이미지"
                        />
                        <ButtonArea
                            link="/SelectLogin"
                            buttonText="로그인하기"
                        />
                    </div>
                </figure>
            ) : babyInfo.length === 0 ? (
                // 로그인 O + 아기등록 X
                <figure className="noBabyList">
                    <div className="chartImgWrapper">
                        <img
                            src="img/visuals/visuals-home-barLineChart.svg"
                            alt="그래프 이미지"
                        />
                        <ButtonArea link="/Mypage" buttonText="아이 등록하기" />
                    </div>
                </figure>
            ) : (
                <figure className="GrowData">
                    {/* 로그인 O + 아기등록 O + 성장기록 X */}
                    <BabyList
                        babyInfo={babyInfo}
                        handleSelectBaby={handleSelectBaby}
                        selectedBabyId={selectedBabyId}
                    />
                    {growData.length === 0 ? (
                        <div className="chartImgWrapper">
                            <img
                                src="img/visuals/visuals-home-barLineChart.svg"
                                alt="그래프 이미지"
                            />
                            <ButtonArea
                                link="/GrowthDiary"
                                buttonText="성장기록 추가하기"
                            />
                        </div>
                    ) : (
                        // 로그인 O + 아기등록 O + 성장기록 O
                        <div className="graphArea">
                            <DiaryChart growData={growData} />
                            <button className="buttonArea">
                                <Link
                                    to="/GrowthDiary"
                                    className="button button-sm button-black"
                                >
                                    <p className="gotoDiaryText">
                                        성장일지 보러가기
                                    </p>
                                    <img
                                        src="../img/icons/i-chevron-right-gray3.svg"
                                        alt=""
                                    />
                                </Link>
                            </button>
                        </div>
                    )}
                </figure>
            )}
        </article>
    );
};
