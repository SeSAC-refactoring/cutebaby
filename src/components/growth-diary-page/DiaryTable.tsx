import React, { useEffect, useState } from 'react';
import { newGrowData } from '../types';
import styles from '../../styles/GrowthDiary.module.scss';
import { GrowRewriteModal } from './GrowRewriteModal';
import { GrowDelModal } from './GrowDelModal';

interface DiaryTableProps {
    growData: newGrowData[];
}
export const DiaryTable: React.FC<DiaryTableProps> = ({ growData }) => {
    const [rewriteModal, setRewriteModal] = useState<boolean>(false);
    const [delModal , setdelModal] = useState<boolean>(false);

    const [data, setData] = useState<newGrowData[]>(growData);
    const [growId, setGrowId] = useState<number>(0);

    console.log('data>>>', data);

    const rewrite = (e: React.MouseEvent<HTMLButtonElement>) => {
        setGrowId(Number(e.currentTarget.value));
        setRewriteModal(true);
    };

    const delModalState = (e: React.MouseEvent<HTMLButtonElement>) => {
        setGrowId(Number(e.currentTarget.value));
        setdelModal(true);
    };
    return (
        <div className={styles.list_wrap}>
            {rewriteModal && (
                <GrowRewriteModal
                    growId={growId}
                    growData={data}
                    onClose={() => setRewriteModal(false)}
                />
            )}
            {delModal &&(
                <GrowDelModal 
                growId={growId}
                growData={data}
                onClose={() => setdelModal(false)}/>
            )}
            <div className={styles.row_title}>
                <div className={styles.list_title}>측정날짜</div>
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
                                    onClick={rewrite}
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
                                    onClick={delModalState}
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
        </div>
    );
};
