import { Link } from "react-router-dom";
import styles from "../styles/Vaccination.module.scss";
import { VaccinationTable } from "../components/vaccination-page/hooks/vaccination-table/VaccinationTable";
import { VaccineInfo } from "../components/vaccination-page/VaccineInfo";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchVaccinationData } from "../store/vaccinationSlice";
import { log } from "console";
import { ChildrenTabs } from "../components/commons/ChildrenTabs";

export default function Vaccination() {
  const dispatch = useDispatch<AppDispatch>();
  const { vaccinationData, loading, error } = useSelector(
    (state: RootState) => state.vaccination
  );

  useEffect(() => {
    dispatch(fetchVaccinationData(5));
    console.log("Updated vaccinationData:", vaccinationData);
  }, [dispatch]);

  return (
    <>
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.title_wrap}>
            <span className={styles.title}>예방접종 관리</span>
            <span className={styles.text}>
              <strong>표준 예방접종 일정표</strong>를 기준으로 관리할 수
              있어요:)
            </span>
            <div className={styles.button_wrap}>
              <button
                style={{ width: "135px", height: "44px" }}
                className={` ${styles.detail}`}
              >
                <Link to="/VaccinationCenters">위탁의료기관 🔎</Link>
              </button>
              <button
                style={{ width: "115px", height: "44px" }}
                className={`${styles.detail}`}
              >
                <Link to="/VaccinationDetails">예방접종 상세</Link>
              </button>
              <button
                style={{ width: "111px", height: "44px" }}
                className={`${styles.detail}`}
              >
                국가예방접종
              </button>
            </div>
          </div>

          <ChildrenTabs />
          <VaccinationTable />
        </div>
      </div>

      {/* <VaccineInfo /> */}

      {/* vaccination 데이터 가져오기 확인 */}
      {loading && <p>로딩 중...</p>}
      {error && <p>오류 {error}</p>}
      {vaccinationData.length === 0 && !loading && !error && (
        <p>예방접종 데이터가 없음</p>
      )}
      {vaccinationData.length > 0 && (
        <ul>
          {vaccinationData.map((item, i) => {
            console.log(`Item ${i}:`, item); // item이 어떻게 생겼는지 확인
            console.log(
              `typeof babyid: ${typeof item.babyid}, typeof vaccinationid: ${typeof item.vaccinationid}, typeof dosenumber: ${typeof item.dosenumber}, typeof dosedate: ${typeof item.dosedate}`
            );
            console.log("dosenumber", item.dosenumber);

            return (
              <li key={item.vaccinationid}>
                <strong>babyid:</strong> {item.babyid}
                {typeof item.babyid} <br />
                <strong>vaccinationid:</strong> {item.vaccinationid}
                {typeof item.vaccinationid}
                <br />
                <strong>dosenumber:</strong> {item.dosenumber}
                {typeof item.dosenumber}
                <br />
                <strong>dosedate:</strong>
                {item.dosedate}
                {typeof item.dosedate}
                <br />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
