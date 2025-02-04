import { useCallback, useMemo, useState } from 'react';

// 페이지네이션 (5개씩 페이지 숫자 표시)
export const usePagenation = (
    currentPage: number,
    setCurrentPage: (page: number) => void,
    totalPages: number,
    setTotalPages: (page: number) => void,
    searchCenters: (page: number, inputAddress: string) => void
) => {
    const [savedAddress, setSavedAddress] = useState<string>(''); // 검색 후 페이지 이동 시 저장된 주소 유지

    // 페이지 그룹의 범위 계산
    const { startPage, endPage } = useMemo(() => {
        const pageGroup = Math.ceil(currentPage / 5); // 현재 페이지가 속한 그룹
        const startPage = (pageGroup - 1) * 5 + 1; // 현재 그룹의 시작 페이지
        const endPage = Math.min(startPage + 4, totalPages); // 현재 그룹의 마지막 페이지
        return {
            startPage,
            endPage,
        };
    }, [currentPage, totalPages]);

    // 페이지 변경 핸들러
    const handlePageChange = useCallback(
        (newPage: number, inputAddress: string) => {
            if (newPage >= 1 && newPage <= totalPages) {
                setCurrentPage(newPage);
                setSavedAddress(inputAddress || savedAddress);
                searchCenters(newPage, inputAddress || savedAddress);
            }
        },
        [totalPages, searchCenters, savedAddress]
    );

    return {
        startPage,
        endPage,
        handlePageChange,
    };
};
