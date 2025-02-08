import { CalculateChart } from "./CalculateChart";
import { useFetchData } from "./hooks/useFetchData";
import { useChildData } from "../../hooks/useChildData";
import { useShow } from "../../hooks/useShow";
import { CalculateInputArea } from "./CalculateInputArea";
import { CalculateDefaultState } from "./CalculateDefaultState";
import { usePercentiles } from "./hooks/usePercentiles";
import { useFilteredLmsDataByMonths } from "./hooks/useFilteredLmsDataByMonths ";
import { useFilteredLmsDataByGender } from "./hooks/useFilteredLmsDataByGender ";
import { log } from "console";
import { useEffect } from "react";
import { calculateMonths } from "./calculateMonths";

export const GrowthCalculate = () => {
  // customHook 가져오기
  const { childData, setChildData } = useChildData();
  const { show, setShow } = useShow();
  const { lmsData, percentileData, isLoading } = useFetchData(childData, show);

  // useEffect(() => {
  //     if (childData.birthDate && childData.measurementDate) {
  //         const newMonths = calculateMonths(childData);
  //         setChildData((prev) => ({
  //             ...prev,
  //             months: newMonths,
  //         }));
  //     }
  // }, [childData.measurementDate, childData.birthDate]); // 의존성 배열 추가
  console.log("🙏🙏🙏🙏🙏🙏🙏childData", childData);

  // lmsData // 성별과 일치하는 데이터만 필터링
  const filteredLmsDataByGender = useFilteredLmsDataByGender(
    lmsData,
    childData
  );

  // lmsData // 성별+개월수까지 일치하는 데이터 필터링
  const filteredLmsDataByMonths = useFilteredLmsDataByMonths(
    filteredLmsDataByGender,
    childData
  );

  const { percentiles, setPercentiles } = usePercentiles(
    childData,
    percentileData,
    filteredLmsDataByMonths
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "1000px" }}>
      <div>
        <div style={{ fontSize: "40px", fontWeight: "bold" }}>
          성장상태 측정계산기
        </div>
        <p style={{ color: "#9999A5" }}>
          우리 아이의 성장 상태를 확인해보세요:)
        </p>
      </div>
      <div style={{ width: "1000px" }}>
        {/* 사용자 입력값 설정 */}
        <CalculateInputArea
          childData={childData}
          filteredLmsDataByMonths={filteredLmsDataByMonths}
          percentiles={percentiles}
          setChildData={setChildData}
          setShow={setShow}
          setPercentiles={setPercentiles}
        />

        {/* 차트 */}
        {/* 로딩 중일 경우 */}
        {isLoading && <p>로딩 중...</p>}

        {/* 차트 표시 여부에 따라 렌더링 */}
        {show && !isLoading && (
          <CalculateChart
            childData={childData}
            filteredLmsDataByGender={filteredLmsDataByGender}
            filteredLmsDataByMonths={filteredLmsDataByMonths}
            percentileData={percentileData}
            percentiles={percentiles}
          />
        )}

        {!show && <CalculateDefaultState />}
      </div>
    </div>
  );
};
