import { useCallback, useRef, useState } from 'react';
import { SelectedLocation } from '../../types';
import { log } from 'console';

export const useHandleSearch = (
    selectedLocation: SelectedLocation,
    setCurrentPage: (page: number) => void,
    searchCenters: (pageNo: number, inputAddress: string) => void
) => {
    // 검색을 한 적이 있는지 추적 (useRef 사용) // 검색한 적 없다면 병원을 찾아보세요 띄워줌
    const hasSearched = useRef(false);
    // 드롭다운에 대한 ref 생성 // 입력하지 않았을 시 focus
    const provinceRef = useRef<HTMLSelectElement>(null);
    const cityRef = useRef<HTMLSelectElement>(null);

    const [inputAddress, setInputAddress] = useState<string>(''); // 주소 입력값 상태관리
    const [savedAddress, setSavedAddress] = useState<string>(''); // 검색 후 페이지 이동 시 저장된 주소 유지

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
        setCurrentPage(1);
        setSavedAddress(inputAddress.trim());
        searchCenters(1, inputAddress.trim());
    }, [
        selectedLocation.province,
        selectedLocation.city,
        searchCenters,
        inputAddress,
    ]);

    return {
        hasSearched,
        provinceRef,
        cityRef,
        inputAddress,
        setInputAddress,
        handleSearch,
        savedAddress,
    };
};
