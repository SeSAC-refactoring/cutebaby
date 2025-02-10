import { Link } from "react-router-dom";
import styles from "../styles/Vaccination.module.scss";
import layout from "../styles/commons/Layout.module.scss";
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

  useEffect(() => {
    if (!user) {
      setOpenLoginModal(true);
    } else {
      dispatch(fetchVaccinationData(5));
      console.log("Updated vaccinationData:", vaccinationData);
    }
  }, [dispatch]);

  return (
    <>
      <div className={layout.background}>
        {/* {openLoginModal && (
                    <NeedLoginModal
                        modalState={() => setOpenLoginModal(false)}
                    />
                )} */}
        <div className={layout.container}>
          <div className={layout.title_wrap}>
            <span className={layout.title}>예방접종 관리</span>
            <span className={styles.text}>
              <strong>표준 예방접종 일정표</strong>를 기준으로 관리할 수
              있어요:)
            </span>
            <div className={styles.button_wrap}>
              <button
                style={{ width: "135px", height: "44px" }}
                className={` ${styles.detail}`}
                onClick={() => setOpenCentersModal(true)}
              >
                위탁의료기관
                {/* <Link to="/VaccinationCenters">위탁의료기관 🔎</Link> */}
                {/* {openCentersModal && <VaccinationCenters />} */}
              </button>
              <button
                style={{ width: "115px", height: "44px" }}
                className={`${styles.detail}`}
                onClick={() => setOpenDetailsModal(true)}
              >
                감염병 정보
                {/* <Link to="/VaccinationDetails">감염병 정보</Link> */}
              </button>
              <button
                style={{ width: "111px", height: "44px" }}
                className={`${styles.detail}`}
              >
                백신 정보
              </button>
            </div>
          </div>

          <BabyList
            babyInfo={babyInfo}
            handleSelectBaby={handleSelectBaby}
            selectedBabyId={selectedBabyId}
          />

          {openCentersModal && <VaccinationCenters />}
          {openDetailsModal && <VaccinationDetails />}
          <VaccinationTable
            selectedBabyVaccinationData={selectedBabyVaccinationData}
          />
        </div>
      </div>

      {/* 백신 정보 버튼 클릭 시 모달 예정 */}
      <VaccineInfo />
    </>
  );
}
