import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchBabyInfo } from '../../store/babySlice';
import { babyinfo, BabyListProps } from '../types';
import { BabyInputPlus } from '../my-page/BabyInputPlus';
import { BabyInfo } from '../my-page/BabyInfo';
import { NothingBaby } from '../my-page/NothingBaby';
// import styles from "../../styles/commons/BabyList.module.scss";



export const BabyList: React.FC<BabyListProps> = ({
    babyInfo,
    nothingBaby,
    handleSelectBaby,
    selectedBabyId,
}) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchBabyInfo());
    }, [dispatch, babyInfo.length]);

    return (
        <div>
        <div >
            {babyInfo.length === 0 ? (
                <p>등록된 아이가 없습니다!</p>
            ) : (
                babyInfo.map((baby: babyinfo) => (
                    <div
                        key={baby.babyid}
                        onClick={() => handleSelectBaby(baby.babyid)}
                        style={{
                            cursor: "pointer",
                            fontWeight: baby.babyid === selectedBabyId ? "bold" : "normal",
                        }}
                    >
                        {baby.babyid} - {baby.babyname}
                    </div>
                ))
            )}
        </div>
        <div >
       
        </div>
   
        </div>
    );
};
