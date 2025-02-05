import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { babyinfo } from '../types';

export const BabyList = () => {
    const { babyInfo, nothingBaby } = useSelector(
        (state: RootState) => state.baby
    );

    return (
        <div>
            {!nothingBaby ? (
                <p>등록된 아이가 없습니다!</p>
            ) : (
                babyInfo.map((baby: babyinfo, i: number) => (
                    <div key={i}>{baby.babyname}</div>
                ))
            )}
        </div>
    );
};
