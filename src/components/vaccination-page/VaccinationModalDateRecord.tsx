import styles from "../../styles/Vaccination.module.scss";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchVaccinationData } from "../../store/vaccinationSlice";
import { VaccinationData } from "../types";
import { InputVac } from "./vaccination-table/InputVac";
import { DelVac } from "./vaccination-table/DelVac";
import { UpdateVac } from "./vaccination-table/UpdateVac";
// import { DateCompleteInput } from '../commons/Input';

interface VaccinationModalDateRecordProps {
  vaccinationid: number;
  dosenumber: number;
  selectedBabyId: number | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VaccinationModalDateRecord: React.FC<
  VaccinationModalDateRecordProps
> = ({ vaccinationid, dosenumber, selectedBabyId, setIsOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const babyId: number = selectedBabyId ?? 0;

  // Redux에서 예방접종 데이터 가져오기
  const vacinfo: VaccinationData[] = useSelector(
    (state: RootState) => state.vaccination.vaccinationData
  );

  // 특정 아기의 예방접종 데이터 필터링
  const selectedBabyVaccinationData = vacinfo.filter(
    (data) => data.babyid === babyId
  );

  // 선택된 `vaccinationid`에 해당하는 데이터만 필터링
  const specificVaccinationData = selectedBabyVaccinationData.filter(
    (data) => data.vaccinationid === vaccinationid
  );

  useEffect(() => {
    if (babyId > 0) {
      dispatch(fetchVaccinationData(babyId));
    }
  }, [dispatch, babyId]);

  const { requestVac } = InputVac();
  const { requestDelVac } = DelVac();
  const { requestupdateVac } = UpdateVac();

  const [selectedDose, setSelectedDose] = useState<number | null>(null);
  const [doseDate, setDoseDate] = useState<string>("");

  useEffect(() => {
    console.log(
      "🔍 클릭한 예방접종 ID에 해당하는 기록:",
      specificVaccinationData
    );
  }, [specificVaccinationData]);

  if (vaccinationid === 17)
    return (
      <div>
        <p>매년 접종하세요</p>
        <button onClick={() => setIsOpen(false)}>확인</button>
      </div>
    );

  const handleOpenInput = (doseNum: number, currentDate: string | null) => {
    setSelectedDose(selectedDose === doseNum ? null : doseNum);
    setDoseDate(
      currentDate !== null
        ? currentDate
        : new Date().toISOString().split("T")[0]
    );
  };

  // 신규 데이터 등록
  const handleSaveData = async (doseNum: number) => {
    try {
      await requestVac({
        babyid: babyId,
        vaccinationid: vaccinationid,
        dosenumber: doseNum,
        dosedate: doseDate,
      });

      setSelectedDose(null);
      dispatch(fetchVaccinationData(babyId));
    } catch (error) {
      console.error(error);
    }
  };

  // 데이터 삭제
  const handleDeleteData = async (doseNum: number) => {
    try {
      await requestDelVac({
        babyid: babyId,
        vaccinationid: vaccinationid,
        dosenumber: doseNum,
        dosedate: doseDate,
      });

      setSelectedDose(null);
      dispatch(fetchVaccinationData(babyId));
      setDoseDate("");
    } catch (error) {
      console.error(error);
    }
  };

  // 기존 데이터 수정
  const handleupDate = async (doseNum: number) => {
    try {
      await requestupdateVac({
        babyid: babyId,
        vaccinationid: vaccinationid,
        dosenumber: doseNum,
        dosedate: doseDate,
      });

      setSelectedDose(null);
      dispatch(fetchVaccinationData(babyId));
    } catch (error) {
      console.error(error);
    }
  };

  // 접종일이 있는 차수 중 마지막 차수 찾기
  const existingDoses = specificVaccinationData
    .filter(
      (data) => data.vaccinationid === vaccinationid && data.dosenumber !== null
    )
    .map((data) => data.dosenumber as number)
    .sort((a, b) => a - b);

  const lastDose =
    existingDoses.length > 0 ? existingDoses[existingDoses.length - 1] : null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {Array.from({ length: dosenumber }, (_, i) => {
        const doseNum = i + 1; // 1차, 2차 ... 보여줄 것

        // 현재 차수의 접종 기록 찾기
        const matchedDose = selectedBabyVaccinationData.find(
          (data) =>
            data.vaccinationid === vaccinationid && data.dosenumber === doseNum
        );

        // 앞 차수(doseNum - 1)에 접종 기록이 있는지 확인
        const prevDose = selectedBabyVaccinationData.find(
          (data) =>
            data.vaccinationid === vaccinationid &&
            data.dosenumber === doseNum - 1 &&
            data.dosedate !== null // 앞 차수가 접종된 경우만 유효
        );

        // 앞 차수가 접종되지 않았으면  입력버튼 비활성화
        const isDisabled = doseNum > 1 && !prevDose;

        return (
          <div className={styles.DateInputSet} key={i}>
            {/* 왼쪽 날짜나 미접종을 보여주는 부분 // input 창 */}
            <div>
              <p style={{ fontSize: "18px", fontWeight: "700" }}>
                {vaccinationid === 8
                  ? "고위험군에 한하여 접종"
                  : vaccinationid === 4
                  ? "6차"
                  : dosenumber === 1
                  ? `${doseNum}회`
                  : `${doseNum}차`}
              </p>
              {selectedDose === doseNum ? (
                // [입력하기]/[수정] 버튼을 눌렀을 때
                <input
                  className={styles.dateInput}
                  type="date"
                  value={doseDate}
                  onChange={(e) => setDoseDate(e.target.value)}
                />
              ) : (
                // 첫 화면 // [입력하기]/[수정] 버튼 누르기 전
                <div
                  className={
                    matchedDose ? styles.completeInput : styles.defaultInput
                  }
                >
                  {matchedDose ? `${matchedDose.dosedate} 완료` : "미접종"}
                </div>
              )}
            </div>

            {/* 버튼 */}
            {selectedDose === doseNum ? (
              // [입력하기] 버튼을 눌렀을 때
              <div className={styles.complete_btn_wrap}>
                <button
                  className={styles.date_cancel_btn}
                  onClick={() => setSelectedDose(null)}
                >
                  취소
                </button>
                <button
                  className={styles.date_edit_btn}
                  onClick={() =>
                    matchedDose
                      ? handleupDate(doseNum)
                      : handleSaveData(doseNum)
                  }
                >
                  완료
                </button>
              </div>
            ) : // 첫 화면
            matchedDose ? (
              <div className={styles.complete_btn_wrap}>
                <button
                  className={styles.date_del_btn}
                  onClick={() => handleDeleteData(doseNum)}
                  disabled={doseNum !== lastDose}
                >
                  삭제
                </button>
                <button
                  className={styles.date_edit_btn}
                  onClick={() => handleOpenInput(doseNum, matchedDose.dosedate)}
                >
                  수정
                </button>
              </div>
            ) : (
              <button
                className={styles.date_enter_btn}
                onClick={() => handleOpenInput(doseNum, null)}
                disabled={isDisabled}
              >
                입력하기
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
