import React, { useCallback, useRef } from 'react';
import { SelectedLocation } from '../../types';
import { useRefs } from '../../../hooks/useRefs';

export const useHandleSearch = (
    selectedLocation: SelectedLocation,
    searchCenters: (pageNo?: number) => void
) => {
    // 검색을 한 적이 있는지 추적 (useRef 사용) // 검색한 적 없다면 병원을 찾아보세요 띄워줌
    const hasSearched = useRef(false);
    // 드롭다운에 대한 ref 생성 // 입력하지 않았을 시 focus
    const provinceRef = useRef<HTMLSelectElement>(null);
    const cityRef = useRef<HTMLSelectElement>(null);

    const handleSearch = useCallback(() => {
        hasSearched.current = true; // 검색 수행 여부를 true로 변경
        if (!selectedLocation.province) {
            provinceRef.current?.focus(); // 시/도를 선택하지 않았으면 focus
            return;
        }
        if (!selectedLocation.city) {
            cityRef.current?.focus(); // 시/군/구를 선택하지 않았으면 focus
            return;
        }
        searchCenters(1);
    }, [selectedLocation, searchCenters]);

    return { hasSearched, provinceRef, cityRef, handleSearch };
};
