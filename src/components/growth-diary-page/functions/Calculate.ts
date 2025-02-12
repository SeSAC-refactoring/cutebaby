import React from 'react';
import { PercentileData } from '../../types';

// Z-Score를 입력하면 해당 Z-Score에서의 성장 값(키, 몸무게, 머리둘레)을 계산하는 공식
const calculateValue = (L: number, M: number, S: number, Z: number) => {
    if (L === 0) {
        return M * Math.exp(S * Z); // L이 0일 때는 자연로그 변환환
    } else {
        return M * Math.pow(1 + L * S * Z, 1 / L);
    }
};

export const calculateP3 = (L: number, M: number, S: number) =>
    calculateValue(L, M, S, -1.881);

export const calculateP97 = (L: number, M: number, S: number) =>
    calculateValue(L, M, S, 1.881);

export const calculateZScore = (X: number, L: number, M: number, S: number) => {
    const Z = (Math.pow(X / M, L) - 1) / (L * S); // Z-Score 계산
    return Z;
};

export const calculatePercentile = (
    percentileData: PercentileData[],
    X: number | null,
    L: number,
    M: number,
    S: number
) => {
    if (!percentileData || percentileData.length === 0 || !X || !L || !M || !S)
        return null; // 입력값이 없을 경우 null

    const Z: number = calculateZScore(X, L, M, S);

    let closest = percentileData.reduce((prev, curr) => {
        // reduce: 배열을 순회하면서 최적의 값을 찾는 데 사용. prev(이전값)과 curr(현재값)을 비교하며 가장 가까운 값 찾기.
        const prevDiff = Math.abs(
            // Math.abs(...): 음수 값이 나와도 항상 양수로 변환
            parseFloat(prev['영유아성장도표시작Z값']) - Z
        );
        const currDiff = Math.abs(
            parseFloat(curr['영유아성장도표시작Z값']) - Z
        );
        return currDiff < prevDiff ? curr : prev; // 더 작은 값(가장 가까운 값) 반환
    });

    return closest['백분위수']; // 해당하는 백분위수 반환
};
