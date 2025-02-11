import React, { useState } from 'react';
import styles from '../../styles/Mypage.module.scss';
import { BabyInfo } from './BabyInfo';
import { BabyInputPlus } from './BabyInputPlus';
import { NothingBaby } from './NothingBaby';
import { babyinfo } from '../types';
import { BabyList } from '../commons/BabyList';
import { useSelectBaby } from '../../hooks/useSelectBaby';
import { useDelbaby } from './hooks/useDelbaby';
import { DelbabyModal } from './DelbabyModal';

interface BabyInputProps {
    babyInfo: babyinfo[]; // babyInfo는 배열 형식임
    nothingBaby: boolean;
}

export const MypageBabyList: React.FC<BabyInputProps> = ({
    babyInfo,
    nothingBaby,
}) => {
    const [babyPlus, setBabyPlus] = useState<boolean>(false);
    const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
    const [delModal , setDelModal] = useState<boolean>(false);


    console.log('=====', nothingBaby);

    console.log('babyinfo >>>>>>>', babyInfo);
    const Del = ()=>{
        setDelModal(true)
    }
    const Plus = () => {
        setBabyPlus(true)
        // if (!babyPlus) {
        //     setBabyPlus(true);
        //     console.log('baby boolean>>', babyPlus);
        //     console.log('nothing baby boolean>>', nothingBaby);
        // } else {
        //     setBabyPlus(false);
        //     console.log('baby boolean>>', babyPlus);
        //     console.log('nothing baby boolean>>', nothingBaby);
        // }
    };

    return (
        <>
            <div className={styles.user_list}>
                <BabyList
                    babyInfo={babyInfo}
                    handleSelectBaby={handleSelectBaby}
                    selectedBabyId={selectedBabyId}
                />
                <button onClick={Plus} className={styles.enroll}>
                    {!babyPlus?'아이등록':''}
                </button>
                <button className={styles.enroll} onClick={Del }>아이삭제</button>
                {delModal&&<DelbabyModal handleSelectBaby={selectedBabyId} babyInfo={babyInfo} onClose={() => setDelModal(false)}/>}
            </div>
            {babyPlus && <BabyInputPlus onClose={() => setBabyPlus(false)} babyInfo={babyInfo} nothingBaby={nothingBaby} />}
            {!babyPlus && <BabyInfo babyInfo={babyInfo} handleSelectBaby={selectedBabyId}/>}

            {/* {babyPlus ? (
                <BabyInputPlus babyInfo={babyInfo} nothingBaby={nothingBaby} />
            ) : nothingBaby ? (
                
            ) : ( 
                <NothingBaby /> 
            )} */}
        </>
    );
};
