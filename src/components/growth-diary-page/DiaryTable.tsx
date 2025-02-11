import React, { useEffect, useState } from 'react';
import { newGrowData } from '../types';
import styles from '../../styles/GrowthDiary.module.scss';
import { useGrowData } from './hooks/useGrowData';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchBabyInfo } from '../../store/babySlice';
import { BabyInfo } from '../my-page/BabyInfo';
import { fetchgrowInfo } from '../../store/GrowthDiarySlice';
import { GrowRewriteModal } from './GrowRewriteModal';

interface DiaryTableProps {
    growData: newGrowData[];
}

export const DiaryTable: React.FC<DiaryTableProps> = ({ growData }) => {
    const babyInfo = useSelector((state: RootState) => state.baby.babyInfo);
    const [rewriteModal, setRewriteModal] = useState<boolean>(false);
    const [data, setData] = useState<newGrowData[]>(growData);
    const dispatch = useDispatch<AppDispatch>();
    const [growId, setGrowId] = useState<number>(0);

    console.log('data>>>', data);
    const onDelGrow = async (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.value);
        // const growId = Number(e.currentTarget.value)
        setGrowId(Number(e.currentTarget.value));

        //   Number(e.currentTarget.value)

        try {
            const response = await axios.post(
                'http://localhost:5001/api/delgrow',
                {
                    growId,
                }
            );
            dispatch(fetchgrowInfo(babyInfo));
        } catch (error) {
            alert('삭제에 실패하였습니다. 관리자에게 문의하세요');
        }
    };
    const Rewrite = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const growId = Number(e.currentTarget.value);
        try {
            const response = await axios.post(
                'http://localhost:5001/api/rewritegrow',
                { growId }
            );
            dispatch(fetchgrowInfo(babyInfo));
        } catch (error) {}
    };
    return (
        <div className={styles.list_wrap}>
            <div className={styles.row_title}>
                <div className={styles.list_title}>날짜</div>
                <div className={styles.list_title}>키(cm)</div>
                <div className={styles.list_title}>몸무게(kg)</div>
                <div className={styles.list_title}>머리둘레(cm)</div>
            </div>

            <div>
                {Array.isArray(growData) && growData.length > 0 ? (
                    <ul>
                        {growData.map((info, i) => (
                            <li key={i} className={styles.row_el}>
                                <div
                                    className={styles.list_el}
                                    style={{ paddingLeft: '0px' }}
                                >
                                    {info.inputData}
                                </div>
                                <div className={styles.list_el}>
                                    {info.height}
                                </div>
                                <div className={styles.list_el}>
                                    {info.weight}
                                </div>
                                <div className={styles.list_el}>
                                    {info.head}
                                </div>
                                <button
                                    className={`${styles.table_btn} ${styles.edit_btn}`}
                                    value={info.id}
                                    onClick={Rewrite}
                                >
                                    수정
                                    <img
                                        src="img/edit-02.png"
                                        alt="수정 아이콘"
                                        style={{ marginLeft: '4px' }}
                                    ></img>
                                </button>

                                <button
                                    className={`${styles.table_btn} ${styles.delete_btn}`}
                                    value={info.id}
                                    onClick={onDelGrow}
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul>
                        <li className={styles.row_el}>성장 기록이 없습니다.</li>
                    </ul>
                )}
            </div>
            {rewriteModal && (
                <GrowRewriteModal
                    growId={growId}
                    growData={data}
                    onClose={() => setRewriteModal(false)}
                />
            )}
        </div>
    );
};
