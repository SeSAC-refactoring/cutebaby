import { useMemo } from 'react';

// 마이페이지 아기의 개월 수 계산
export const useBabyMonths = (birthday: string) => {
    return useMemo(() => {
        if (!birthday) return '아이의 생일이 없습니다.';

        const birthDate = new Date(birthday);
        const today = new Date();

        const years = today.getFullYear() - birthDate.getFullYear();
        const months = today.getMonth() - birthDate.getMonth();
        const days = today.getDate() - birthDate.getDate();

        // 날짜 차이 보정 (일 단위)
        let totalMonths = years * 12 + months;
        if (days < 0) totalMonths -= 1; // 생일 이전일 경우 1개월 빼기

        if (totalMonths < 0) totalMonths = 0; // 음수 방지

        const displayYears = Math.floor(totalMonths / 12);
        const displayMonths = totalMonths % 12;

        // "00개월 (00년 00개월)" 포맷
        return `${totalMonths}개월 (${displayYears}년 ${displayMonths}개월)`;
    }, [birthday]);
};
