import { useEffect, useState } from "react";
import { fetchCity, fetchProvince } from "../../api-data/vaccinationCenters";
import { SelectedLocation, Location } from "../../types";

export const useFetchLocation = (selectedLocation: SelectedLocation) => {
  // 지역, 도시 선택 상태 관리
  const [provinces, setProvinces] = useState<Location[]>([]); // 지역(시/도) 목록
  const [cities, setCities] = useState<Location[]>([]); // 도시(시/군/구) 목록
  const [isFirstLoading, setIsFirstLoading] = useState(false); // 첫 화면에서 시/군/구 로딩 상태 확인

  // API 호출: 지역(시/군)
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        setIsFirstLoading(true);
        const list = await fetchProvince();
        setProvinces(list);
      } catch (error) {
        // console.error('지역 정보를 불러오는 중 오류 발생:', error);
      } finally {
        setIsFirstLoading(false);
      }
    };
    loadProvinces();
  }, []);

  // API 호출: 도시(시/군/구) - 지역(시/군) 선택 시 (selectedLocation.province 변경 시)
  useEffect(() => {
    if (!selectedLocation.province) {
      setCities([]); // 지역(시/도)이 선택되지 않았으면 도시 목록 초기화
      return;
    }

    // 지역(시/도)이 선택되면 데이터 가져오기
    const loadCities = async () => {
      try {
        const list = await fetchCity(Number(selectedLocation.province));
        setCities(list);
      } catch (error) {
        // console.error("도시 정보를 불러오는 중 오류 발생:", error);
      }
    };
    loadCities();
  }, [selectedLocation.province]);

  return { provinces, cities, isFirstLoading };
};
