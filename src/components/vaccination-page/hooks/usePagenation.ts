import { useCallback, useMemo, useState } from 'react';

// 페이지네이션 (5개씩 페이지 숫자 표시)
export const usePagenation = (
    currentPage: number,
    setCurrentPage: (page: number) => void,
    totalPages: number,
    setTotalPages: (page: number) => void,
    searchCenters: (page: number, inputAddress: string) => void,
    savedAddress: string
) => {
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
                searchCenters(newPage, savedAddress); // 항상 저장된 검색어 사용 // 페이지를 넘길때는 inputAdress가 바뀌어도 이전의 검색어로 사용
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
