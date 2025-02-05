import React, { useState } from 'react';
import styles from '../../styles/Mypage.module.scss';
import { BabyInfo } from './BabyInfo';
import { BabyInputPlus } from './BabyInputPlus';
import { NothingBaby } from './NothingBaby';
import { babyinfo } from '../types';
import { BabyList } from '../commons/BabyList';

interface BabyInputProps {
    babyInfo: babyinfo[]; // babyInfo는 배열 형식임
    nothingBaby: boolean;
}

export const MypageBabyList: React.FC<BabyInputProps> = ({
    babyInfo,
    nothingBaby,
}) => {
    const [babyPlus, setBabyPlus] = useState<boolean>(false);
    const [selectedBabyId, setSelectedBabyId] = useState<number | null>(null);
    console.log('=====', nothingBaby);

    console.log('babyinfo >>>>>>>', babyInfo);

    const Plus = () => {
        if (!babyPlus) {
            setBabyPlus(true);
            console.log('baby boolean>>', babyPlus);
            console.log('nothing baby boolean>>', nothingBaby);
        } else {
            setBabyPlus(false);
            console.log('baby boolean>>', babyPlus);
            console.log('nothing baby boolean>>', nothingBaby);
        }
    };

    return (
        <>
            <div className={styles.user_list}>
                <BabyList babyInfo={babyInfo} nothingBaby={nothingBaby} />
                <button onClick={Plus} className={styles.enroll}>
                    {!babyPlus ? '아기등록' : '아기정보'}
                </button>
            </div>
            {babyPlus ? (
                <BabyInputPlus babyInfo={babyInfo} nothingBaby={nothingBaby} />
            ) : nothingBaby ? (
                <BabyInfo babyInfo={babyInfo} />
            ) : (
                <NothingBaby />
            )}
        </>
    );
};
