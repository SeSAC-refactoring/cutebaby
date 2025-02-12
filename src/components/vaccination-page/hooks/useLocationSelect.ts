import React, { useCallback, useState } from 'react';
import { SelectedLocation } from '../../types';

export const useLocationSelect = () => {
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태관리
    const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>({
        province: '', // 선택한 지역(시/도)
        city: '', // 선택한 도시(시/군/구)
    }); // 선택한 지역 상태관리

    // 지역(시/도) 선택 핸들러
    const handleProvinceSelect = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedLocation({
                province: e.target.value,
                city: '', // 지역(시/도) 변경 시 도시(시/군/구) 초기화
            });
            setCurrentPage(1); // 새로운 지역(시/도) 선택 시 페이지 초기화
        },
        [setCurrentPage] //
    );

    // 도시(시/군/구) 선택 핸들러
    const handleCitySelect = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedLocation((prev) => ({
                ...prev,
                city: e.target.value,
            }));
            setCurrentPage(1); // 새로운 도시(시/군/구) 선택 시 페이지 초기화
        },
        [setCurrentPage]
    );

    // 시/군/구 변경 시 검색 여부 초기화(false로로)

    return {
        currentPage,
        setCurrentPage,
        selectedLocation,
        handleProvinceSelect,
        handleCitySelect,
    };
};
