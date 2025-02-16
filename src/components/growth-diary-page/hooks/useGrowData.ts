import { useEffect, useState } from "react";
import { newGrowData } from "../../types";

// growData useState
export const useGrowData = (
  growInfo: newGrowData[],
  selectedBabyId: number | null
) => {
  // 선택한 아이 정보 가져오기
  const [growData, setGrowData] = useState<newGrowData[]>([]);

  // selectedBabyId가 변경될 때 growData 업데이트
  useEffect(() => {
    if (!selectedBabyId) {
      // console.log('selectedBabyId 없습니다.');
      return;
    }

    if (Array.isArray(growInfo) && growInfo.length > 0) {
      const filteredGrowInfo = growInfo
        .flat() // 중첩 배열을 평탄화
        .filter((info) => info.babyid === selectedBabyId) // 선택한 아기 ID에 맞는 데이터만 필터링
        .sort(
          (a, b) =>
            new Date(b.inputData).getTime() - new Date(a.inputData).getTime()
        ); // 날짜기준 내림차순(최신 데이터가 배열 앞쪽)으로 정렬

      if (filteredGrowInfo) {
        // console.log("filteredGrowInfo >>>", filteredGrowInfo);

        setGrowData(filteredGrowInfo);
      }
    }
  }, [growInfo, selectedBabyId]); // selectedBabyInfo가 변경될 때 실행

  return { growData, setGrowData };
};
