import { Link } from "react-router-dom";
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
import { useVaccinationData } from "../components/vaccination-page/hooks/useVaccinationData";
import { VaccineInfo } from "../components/vaccination-page/VaccineInfo";
import { NeedLoginModal } from "../components/my-page/NeedLoginModal";
import VaccinationCenters from "./VaccinationCenters";
import VaccinationDetails from "./VaccinationDetails";
export default function Vaccination() {
  const [openCentersModal, setOpenCentersModal] = useState<boolean>(false);
  const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false);
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { babyInfo, nothingBaby } = useSelector(
    (state: RootState) => state.baby
  );
  const { vaccinationData, loading, error } = useSelector(
    (state: RootState) => state.vaccination
  );
  const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
  const { selectedBabyVaccinationData } = useVaccinationData(
    vaccinationData,
    selectedBabyId
  ); // selectedBabyVaccinationData = vaccinationData selectedBabyId에 따라 필터링 // selectedBabyId가 변경될 때 vaccinationData 업데이트
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const user = sessionStorage.getItem("user");
  console.log(":angel::angel::angel::angel::angel::angel:user", user);
  // 로그인 안된 경우 로그인 모달 띄우기
  useEffect(() => {
    if (!user) {
      setOpenLoginModal(true);
    } else {
      dispatch(fetchVaccinationData(5));
      console.log("Updated vaccinationData:", vaccinationData);
    }
  }, [dispatch]);
  useEffect(
    () =>
      console.log(
        "vaccinationData, selectedBabyVaccinationData",
        vaccinationData,
        selectedBabyVaccinationData
      ),
    [vaccinationData, selectedBabyVaccinationData]
  );
  return (
    <>
      <div className={layout.container}>
        {openLoginModal && (
          <NeedLoginModal modalState={() => setOpenLoginModal(false)} />
        )}
        <div className={`${layout.contentsArea} ${styles.contentsArea}`}>
          <div className={layout.titleArea}>
            <div className={layout.textWrap}>
              <div className={[layout.title, typography.text4xlBd].join(" ")}>
                예방접종 관리
              </div>
              <div
                className={[layout.pageGuide, typography.textXlMd].join(" ")}
              >
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
                {/* <Link to="/VaccinationCenters">위탁의료기관 :mag_right:</Link> */}
                {/* {openCentersModal && <VaccinationCenters />} */}
              </button>
              <button
                className={`${button.btnSmYw} ${typography.textBsBd}`}
                onClick={() => setOpenDetailsModal(true)}
              >
                감염병 정보
                {/* <Link to="/VaccinationDetails">감염병 정보</Link> */}
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
            <VaccinationTable
              selectedBabyVaccinationData={selectedBabyVaccinationData}
              selectedBabyId={selectedBabyId}
            />
          </div>
        </div>
      </div>
      {/* 모달 */}
      {openCentersModal && (
        <VaccinationCenters setOpenCentersModal={setOpenCentersModal} />
      )}
      {openDetailsModal && (
        <VaccinationDetails setOpenDetailsModal={setOpenDetailsModal} />
      )}
      {openInfoModal && <VaccineInfo setOpenInfoModal={setOpenInfoModal} />}
    </>
  );
}
