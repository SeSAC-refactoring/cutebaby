import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchVaccinationData } from "../../store/vaccinationSlice";
import { VaccinationData } from "../types";
import { InputVac } from "./vaccination-table/InputVac";
import { DelVac } from "./vaccination-table/DelVac";
import { UpdateVac } from "./vaccination-table/UpdateVac";
import { Input } from "../commons/Input";

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
  // 데이터 중에 날짜만 나오게 필터링
  const filterDoseDate = specificVaccinationData
    .map((data) => data.dosedate)
    .filter((date): date is string => date !== null); // `null` 제외

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

  if (vaccinationid === 17)
    return (
      <div className="flex flex-col items-center gap-4">
        <h3>매년 접종 대상입니다.</h3>

        <img src="/img/Ggoggo-003.svg" className="w-[50%]" />

        <button
          className="button button-blue button-md"
          onClick={() => setIsOpen(false)}
        >
          확인
        </button>
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
    // console.log('등록할때',filterDoseDate[...prev , 1])
    console.log(doseDate);

    if (doseDate < filterDoseDate[filterDoseDate.length - 1]) {
      console.log("야야 전에꺼보다 더 적게 입력했다.");
    } else {
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

  const upDateVac = async (doseNum: number) => {
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

  // 기존 데이터 수정
  const handleupDate = async (doseNum: number, lastDose: number) => {
    console.log("dosenum", doseNum);
    console.log("lastDose", lastDose);
    console.log("doseDate", doseDate);
    console.log("filterDoseDate>>", filterDoseDate);

    filterDoseDate[doseNum - 1] = doseDate;

    const dateCheck = filterDoseDate.filter((data) => {
      return data < doseDate;
    });
    console.log("date Check", dateCheck);
    if (dateCheck.length == 0) {
      upDateVac(doseNum);
    } else {
      console.log("날짜를 확인하세요");
    }

    // if(doseDate.length-1 == lastDose) {// 마지막 인덱스인지 확인하기

    // }
  };

  // 접종일이 있는 차수 중 마지막 차수 찾기
  const existingDoses = specificVaccinationData
    .filter(
      (data) => data.vaccinationid === vaccinationid && data.dosenumber !== null
    )
    .map((data) => data.dosenumber as number)
    .sort((a, b) => a - b);

  const lastDose =
    existingDoses.length > 0 ? existingDoses[existingDoses.length - 1] : 0;

  console.log(lastDose);
  return (
    <div
      className="flex flex-col gap-6"
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   gap: "24px",
      // }}
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
          <div key={i} className="font-bd text-xs">
            {/* 왼쪽 날짜나 미접종을 보여주는 부분 // input 창 */}

            <p>
              {vaccinationid === 8
                ? "고위험군에 한하여 접종"
                : vaccinationid === 4
                ? "6차"
                : dosenumber === 1
                ? `${doseNum}회`
                : `${doseNum}차`}
            </p>

            <div className="flex justify-between items-center gap-2 h-[3.5rem]">
              {selectedDose === doseNum ? (
                // [입력하기]/[수정] 버튼을 눌렀을 때
                <Input
                  type="date"
                  id={String(doseNum)}
                  value={doseDate}
                  onChange={(e) => setDoseDate(e.target.value)}
                  className="pr-2"
                />
              ) : (
                // 첫 화면 // [입력하기]/[수정] 버튼 누르기 전

                <div
                  className={`w-full h-full flex pl-4 items-center py-1 rounded-[1rem] gap-1 ${
                    matchedDose
                      ? "bg-green-1 text-green-7"
                      : "bg-gray-1 text-gray-4"
                  }`}
                >
                  {matchedDose ? (
                    <img alt="a" src="/img/icons/i-check-broken-s24.svg" />
                  ) : null}

                  {matchedDose ? `${matchedDose.dosedate}  완료` : "미접종"}
                </div>
              )}

              {/* 버튼 */}
              {selectedDose === doseNum ? (
                // [입력하기] 버튼을 눌렀을 때
                <div className="flex gap-2">
                  <button
                    className="button button-md button-coral"
                    onClick={() => setSelectedDose(null)}
                  >
                    취소
                  </button>
                  <button
                    onClick={() =>
                      matchedDose
                        ? handleupDate(doseNum, lastDose)
                        : handleSaveData(doseNum)
                    }
                    className="button-md button-blue"
                  >
                    완료
                  </button>
                </div>
              ) : // 첫 화면
              matchedDose ? (
                <div className="gap-2 flex">
                  <button
                    onClick={() => handleDeleteData(doseNum)}
                    disabled={doseNum !== lastDose}
                    className="button button-md button-yellow"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() =>
                      handleOpenInput(doseNum, matchedDose.dosedate)
                    }
                    className="button button-md button-blue"
                  >
                    수정
                  </button>
                </div>
              ) : (
                <div className="">
                  <button
                    onClick={() => handleOpenInput(doseNum, null)}
                    disabled={isDisabled}
                    className="button-md button-blue w-full"
                  >
                    입력하기
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
