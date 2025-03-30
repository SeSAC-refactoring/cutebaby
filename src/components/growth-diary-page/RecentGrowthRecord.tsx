import React from 'react';
import { newGrowData } from '../types';
import styles from '../../styles/GrowthDiary.module.scss';
import button from '../../styles/commons/Button.module.scss';
import typography from '../../styles/commons/Typography.module.scss';
import { DiaryInputArea } from './DiaryInputArea';
import { DiaryTable } from './DiaryTable';

interface RecentGrowthRecordProps {
    growData: newGrowData[];
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenAppendModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RecentGrowthRecord = ({
    growData,
    setOpenAddModal,
    setOpenAppendModal,
}: RecentGrowthRecordProps) => {
    return (
        <div className="recentGrowthRecord">
            <div className="valueArea">
                <div className="titleArea">
                    <h3>가장 최근 기록</h3>
                    <span className="recentDate">
                        {new Date(growData[0].inputData).toLocaleDateString(
                            'ko-KR',
                            {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }
                        )}
                    </span>
                </div>

                <div className="items">
                    <div className="item height">
                        <span>키</span>
                        <span className="item-value">
                            {growData[0].height} cm
                        </span>
                    </div>
                    <div className="item weight">
                        <span>몸무게</span>
                        <span className="item-value">
                            {growData[0].weight} kg
                        </span>
                    </div>
                    <div className="item head">
                        <span>머리둘레</span>
                        <span className="item-value">
                            {growData[0].head} cm
                        </span>
                    </div>
                </div>
            </div>

            <div className="buttons">
                <button
                    onClick={() => setOpenAppendModal(true)}
                    className="button-xs button-yellow"
                >
                    <p>성장기록 추가</p>
                    <img src="../img/icons/i-chevron-right-s28.svg" alt="*" />
                </button>

                <button
                    onClick={() => setOpenAddModal(true)}
                    className="button-xs button-black"
                >
                    <p>성장기록</p>
                    <img src="../img/icons/i-chevron-right-s28.svg" alt="*" />
                </button>
            </div>
        </div>
    );
};
