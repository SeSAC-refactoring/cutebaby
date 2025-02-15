import layout from "../styles/commons/Layout.module.scss";
import typography from "../styles/commons/Typography.module.scss";
import button from "../styles/commons/Button.module.scss";
import styles from "../styles/Vaccination.module.scss";

import { VaccinationTable } from "../components/vaccination-page/vaccination-table/VaccinationTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { fetchVaccinationData } from "../store/vaccinationSlice";
import { BabyList } from "../components/commons/BabyList";
import { useSelectBaby } from "../hooks/useSelectBaby";
import { VaccineInfo } from "../components/vaccination-page/VaccineInfo";
import VaccinationCenters from "./VaccinationCenters";
import VaccinationDetails from "./VaccinationDetails";
import { useNavigate } from "react-router-dom";

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

  const user = sessionStorage.getItem("user");
  const babyId: number = selectedBabyId ?? 0;
  console.log("👼👼👼👼👼👼user", user);

  //  로그인 안했을 시 로그인 페이지로 리디렉션 // 로그인 되면 데이터 가져오기
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (babyId) {
      dispatch(fetchVaccinationData(babyId));
    }
  }, [dispatch, babyId]);

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
    <div className={layout.container}>
      {/* 모달 */}
      {/* {openLoginModal && (
                <NeedLoginModal modalState={() => setOpenLoginModal(false)} />
            )} */}
      {openCentersModal && (
        <VaccinationCenters setOpenCentersModal={setOpenCentersModal} />
      )}
      {openDetailsModal && (
        <VaccinationDetails setOpenDetailsModal={setOpenDetailsModal} />
      )}
      {openInfoModal && <VaccineInfo setOpenInfoModal={setOpenInfoModal} />}

      <div className={`${layout.contentsArea} ${styles.contentsArea}`}>
        <div className={layout.titleArea}>
          <div className={layout.textWrap}>
            <div className={[layout.title, typography.text4xlBd].join(" ")}>
              예방접종 관리
            </div>
            <div className={[layout.pageGuide, typography.textXlMd].join(" ")}>
              <strong className={typography.textXlBd}>
                표준 예방접종 일정표
              </strong>
              를 기준으로 관리할 수 있어요:)
            </div>
          </div>
          <div className={styles.button_wrap}>
            <button
              className={`${button.btnSmYw} ${typography.textBsBd}`}
              onClick={() => setOpenCentersModal(true)}
            >
              위탁의료기관{" "}
              <img src="img/icons/i-search-s20.svg" alt="성장일지 이미지" />
            </button>
            <button
              className={`${button.btnSmYw} ${typography.textBsBd}`}
              onClick={() => setOpenDetailsModal(true)}
            >
              감염병 정보
            </button>
            <button
              className={`${button.btnSmYw} ${typography.textBsBd}`}
              onClick={() => setOpenInfoModal(true)}
            >
              백신 정보
            </button>
          </div>
        </div>

        <div className={styles.contentsWrap}>
          <BabyList
            babyInfo={babyInfo}
            handleSelectBaby={handleSelectBaby}
            selectedBabyId={selectedBabyId}
          />

          <VaccinationTable selectedBabyId={selectedBabyId} />
        </div>
      </div>
    </div>
  );
}
