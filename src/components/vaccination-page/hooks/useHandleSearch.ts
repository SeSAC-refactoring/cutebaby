import { useCallback, useRef, useState } from 'react';
import { SelectedLocation } from '../../types';
import { RefsType } from '../../../hooks/useRefs';

export const useHandleSearch = (
    selectedLocation: SelectedLocation,
    setCurrentPage: (page: number) => void,
    searchCenters: (pageNo: number, inputAddress: string) => void,
    refs: RefsType
) => {
    const [hasSearched, setHasSearched] = useState<boolean>(false); // 검색을 한 적이 있는지 추적 // 검색한 적 없다면 병원을 찾아보세요 띄워줌
    const [inputAddress, setInputAddress] = useState<string>(''); // 주소 입력값 상태관리
    const [savedAddress, setSavedAddress] = useState<string>(''); // 검색 후 페이지 이동 시 저장된 주소 유지

    const handleSearch = useCallback(() => {
        setHasSearched(true); // 검색 수행 여부 true
        if (!selectedLocation.province) {
            setHasSearched(false);
            refs.province.current?.focus(); // 시/도를 선택하지 않았으면 focus
            return;
        }
        if (!selectedLocation.city) {
            setHasSearched(false);
            refs.city.current?.focus(); // 시/군/구를 선택하지 않았으면 focus
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
        inputAddress,
        setInputAddress,
        handleSearch,
        savedAddress,
        hasSearched,
    };
};
