import { useCallback, useState } from 'react';
import { useLoading } from '../../../hooks/useLoading';
import { Centers, SelectedLocation } from '../../types';
import { fetchVaccinationCenters } from '../../api-data/vaccinationCenters';

export const useSearchCenters = (
    selectedLocation: SelectedLocation,
    setShowVaccineList: React.Dispatch<
        React.SetStateAction<{ [key: number]: boolean }>
    >
) => {
    const { isLoading, startLoading, stopLoading } = useLoading(); // 로딩 상태관리
    const [centers, setCenters] = useState<Centers[]>([]); // 선택한 지역의 병원 목록 상태
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 상태관리
    const numOfRows = 10; // 한 페이지에 보여줄 병원 개수

    // 병원 검색 함수
    const searchCenters = useCallback(
        async (pageNo: number = 1) => {
            if (!selectedLocation.province || !selectedLocation.city) {
                alert('지역(시/도)과 도시(시/군/구)를 선택해주세요.');
                // focus로 바꿔보기
                return;
            }

            startLoading();
            try {
                const data = await fetchVaccinationCenters(
                    pageNo,
                    numOfRows,
                    Number(selectedLocation.province),
                    Number(selectedLocation.city)
                );

                if (data && data.items.item.length > 0) {
                    // 데이터가 있으면
                    setCenters(data.items.item);
                    setTotalPages(data.maxPage); // 전체 페이지 설정
                } else {
                    // 데이터가 없으면
                    setCenters([]);
                    setTotalPages(1);
                }

                setShowVaccineList({}); // 검색 시 병원의 백신 목록 토글 상태 초기화
            } catch (error) {
                console.error('병원 정보를 불러오는 중 오류 발생:', error);
                setCenters([]);
            }
            stopLoading();
        },
        [selectedLocation]
    );

    return { isLoading, centers, totalPages, setTotalPages, searchCenters };
};
