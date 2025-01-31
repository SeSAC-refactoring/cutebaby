import React from 'react';

const CalculateValue = (L: number, M: number, S: number, Z: number) => {
    if (L === 0) {
        return M * Math.exp(S * Z); // L이 0일 때는 자연로그 변환환
    } else {
        return M * Math.pow(1 + L * S * Z, 1 / L);
    }
};

export const CalculateP3 = (L: number, M: number, S: number) =>
    CalculateValue(L, M, S, -1.881);

export const CalculateP97 = (L: number, M: number, S: number) =>
    CalculateValue(L, M, S, 1.881);

// export const CalculateZscore = (L, M, S) => {
//     return;
// };

// export const CalculatePercentile = (Z) => {
//     return;
// };
