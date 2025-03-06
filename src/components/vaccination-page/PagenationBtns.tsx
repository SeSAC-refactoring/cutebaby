import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    handlePageChange: (page: number) => void;
}

export const PagenationBtns: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    startPage,
    endPage,
    handlePageChange,
}) => {
    return (
        <div className="pagenationBtns">
            <button
                className="noNumber"
                onClick={() => handlePageChange(startPage - 1)}
                disabled={startPage <= 1} // startPage가 1보다 작을 수 없음
            >
                {`<`}
            </button>

            {/* 5개씩 페이지 번호 표시  */}
            {/* Array(n): 길이가 n인 비어있는 배열을 생성 */}
            {[...Array(endPage - startPage + 1)].map((_, index) => {
                const pageNumber = startPage + index;
                return (
                    <button
                        className="number"
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={
                            // 현재 페이지는 클릭 안되게
                            currentPage === pageNumber
                        }
                    >
                        {pageNumber}
                    </button>
                );
            })}

            <button
                className="noNumber"
                onClick={() => handlePageChange(endPage + 1)}
                disabled={endPage >= totalPages} // 마지막 페이지 그룹이면 비활성화
            >
                {`>`}
            </button>
        </div>
    );
};
