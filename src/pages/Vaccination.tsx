import { VaccinationTable } from '../components/vaccination-page/vaccination-table/VaccinationTable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useEffect, useState } from 'react';
import { fetchVaccinationData } from '../store/vaccinationSlice';
import { BabyList } from '../components/commons/BabyList';
import { useSelectBaby } from '../hooks/useSelectBaby';
import { VaccineInfo } from '../components/vaccination-page/VaccineInfo';
import VaccinationCenters from '../components/vaccination-page/VaccinationCenters';
import VaccinationDetails from '../components/vaccination-page/VaccinationDetails';
import { useNavigate } from 'react-router-dom';

export default function Vaccination() {
    // const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
    const [openCentersModal, setOpenCentersModal] = useState<boolean>(false);
    const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);
    const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    // Redux에서 정보 가져오기
    const { babyInfo } = useSelector((state: RootState) => state.baby);
    // const { vaccinationData } = useSelector(
    //     (state: RootState) => state.vaccination
    // );

    // 훅 사용
    const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
    // const { selectedBabyVaccinationData } = useVaccinationData(
    //     vaccinationData,
    //     selectedBabyId
    // ); // selectedBabyVaccinationData = vaccinationData selectedBabyId에 따라 필터링 // selectedBabyId가 변경될 때 vaccinationData 업데이트

    const user = sessionStorage.getItem('user');
    const babyId: number = selectedBabyId ?? 0;
    // console.log("👼👼👼👼👼👼user", user);

    //  로그인 안했을 시 로그인 페이지로 리디렉션 // 로그인 되면 데이터 가져오기
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/');
        } else if (babyId) {
            dispatch(fetchVaccinationData(babyId));
        }
    }, [dispatch, babyId]);

    //모달열었을때 배경 스크롤방지
    useEffect(() => {
        if (openDetailsModal || openInfoModal || openCentersModal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [openCentersModal, openDetailsModal, openInfoModal]);

    // useEffect(
    //     () =>
    //         console.log(
    //             'vaccinationData, selectedBabyVaccinationData',
    //             vaccinationData,
    //             selectedBabyVaccinationData
    //         ),
    //     [vaccinationData, selectedBabyVaccinationData]
    // );

    return (
        <main>
            {/* 모달 */}
            {openCentersModal && (
                <VaccinationCenters setOpenCentersModal={setOpenCentersModal} />
            )}
            {openDetailsModal && (
                <VaccinationDetails setOpenDetailsModal={setOpenDetailsModal} />
            )}
            {openInfoModal && (
                <VaccineInfo setOpenInfoModal={setOpenInfoModal} />
            )}

            <div className="whitebox">
                <div className="flex justify-between w-full max-sm:flex-col">
                    <div className="title">
                        <h2>예방접종 관리</h2>
                        <p className="vaccination ">
                            <strong>표준 예방접종 일정표</strong>를 기준으로
                            관리할 수 있어요:)
                        </p>
                    </div>
                    <div className="ml-4 flex gap-2 max-sm:ml-0 max-sm:mt-6">
                        <button
                            className="w-full button button-yellow button-xs  max-sm:button-xm"
                            onClick={() => setOpenCentersModal(true)}
                        >
                            위탁의료기관{' '}
                            <img
                                src="img/icons/i-search-s20.svg"
                                alt="성장일지 이미지"
                            />
                        </button>
                        <button
                            className="w-full button button-yellow button-xs max-sm:button-xm"
                            onClick={() => setOpenDetailsModal(true)}
                        >
                            감염병 정보
                        </button>
                        <button
                            className="w-full button button-yellow button-xs  max-sm:button-xm"
                            onClick={() => setOpenInfoModal(true)}
                        >
                            백신 정보
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-4 h-full">
                    <BabyList
                        babyInfo={babyInfo}
                        handleSelectBaby={handleSelectBaby}
                        selectedBabyId={selectedBabyId}
                    />

                    <VaccinationTable selectedBabyId={selectedBabyId} />
                </div>
            </div>
        </main>
    );
}
